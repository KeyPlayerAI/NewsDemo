import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

console.log('🔥 Stripe checkout function starting...');

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

console.log('Environment check:', {
  hasSupabaseUrl: !!supabaseUrl,
  hasSupabaseKey: !!supabaseServiceKey,
  hasStripeKey: !!stripeSecretKey
});

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
const stripe = new Stripe(stripeSecretKey!, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

console.log('✅ Stripe and Supabase clients initialized');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

function createResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  console.log(`📥 Incoming ${req.method} request`);
  
  try {
    if (req.method === 'OPTIONS') {
      console.log('Handling OPTIONS request');
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (req.method !== 'POST') {
      console.log(`Invalid method: ${req.method}`);
      return createResponse({ error: 'Method not allowed' }, 405);
    }

    const body = await req.text();
    console.log('Request body:', body);

    const { price_id, success_url, cancel_url, email, password } = JSON.parse(body);
    console.log('Parsed request:', { 
      price_id, 
      success_url, 
      cancel_url, 
      hasEmail: !!email,
      hasPassword: !!password 
    });

    if (!price_id || !success_url || !cancel_url) {
      console.log('Missing required parameters');
      return createResponse({ error: 'Missing required parameters' }, 400);
    }

    // For non-authenticated users (signup flow)
    if (email && password) {
      console.log('📝 Starting signup flow...');
      
      // Create the user first
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.error('Failed to create user:', signUpError);
        return createResponse({ error: signUpError.message }, 400);
      }

      const user = authData.user;
      if (!user) {
        console.error('No user returned from signUp');
        return createResponse({ error: 'Failed to create user account' }, 500);
      }

      console.log('✅ User created:', user.id);

      // Create Stripe customer
      console.log('Creating Stripe customer...');
      const customer = await stripe.customers.create({
        email,
        metadata: { user_id: user.id },
      });
      console.log('✅ Stripe customer created:', customer.id);

      // Save customer mapping
      console.log('Saving customer mapping...');
      const { error: customerError } = await supabase.from('stripe_customers').insert({
        user_id: user.id,
        customer_id: customer.id,
      });

      if (customerError) {
        console.error('Failed to save customer mapping:', customerError);
        // Clean up
        console.log('Rolling back user and customer creation...');
        await supabase.auth.admin.deleteUser(user.id);
        await stripe.customers.del(customer.id);
        return createResponse({ error: 'Failed to create customer mapping' }, 500);
      }

      console.log('✅ Customer mapping saved');

      // Create initial subscription record with active status
      console.log('Creating subscription record...');
      const { error: subscriptionError } = await supabase.from('stripe_subscriptions').insert({
        customer_id: customer.id,
        status: 'active', // Changed from 'not_started' to 'active'
      });

      if (subscriptionError) {
        console.error('Failed to create subscription record:', subscriptionError);
        // Clean up
        console.log('Rolling back all changes...');
        await supabase.auth.admin.deleteUser(user.id);
        await stripe.customers.del(customer.id);
        return createResponse({ error: 'Failed to initialize subscription' }, 500);
      }

      console.log('✅ Subscription record created');

      // Create checkout session
      console.log('Creating Stripe checkout session...');
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ['card'],
        line_items: [{ price: price_id, quantity: 1 }],
        mode: 'subscription',
        success_url,
        cancel_url,
      });

      console.log('✅ Checkout session created:', session.id);
      return createResponse({ url: session.url });
    }

    // For authenticated users
    console.log('👤 Processing authenticated user flow...');
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.log('No Authorization header found');
      return createResponse({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Verifying user token...');
    const { data: { user }, error: getUserError } = await supabase.auth.getUser(token);

    if (getUserError || !user) {
      console.error('Auth error:', getUserError);
      return createResponse({ error: 'Unauthorized' }, 401);
    }

    console.log('✅ User verified:', user.id);

    // Check if user already has a Stripe customer ID
    console.log('Checking for existing Stripe customer...');
    let { data: customerData } = await supabase
      .from('stripe_customers')
      .select('customer_id')
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .single();

    if (!customerData) {
      console.log('Creating new Stripe customer...');
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id },
      });

      const { error: customerError } = await supabase.from('stripe_customers').insert({
        user_id: user.id,
        customer_id: customer.id,
      });

      if (customerError) {
        console.error('Failed to save customer mapping:', customerError);
        await stripe.customers.del(customer.id);
        return createResponse({ error: 'Failed to create customer' }, 500);
      }

      customerData = { customer_id: customer.id };
      console.log('✅ New customer created:', customer.id);
    } else {
      console.log('Using existing customer:', customerData.customer_id);
    }

    // Create subscription record with active status
    console.log('Creating/updating subscription record...');
    const { error: subscriptionError } = await supabase.from('stripe_subscriptions').upsert({
      customer_id: customerData.customer_id,
      status: 'active', // Changed from 'not_started' to 'active'
    });

    if (subscriptionError) {
      console.error('Failed to create subscription record:', subscriptionError);
      return createResponse({ error: 'Failed to initialize subscription' }, 500);
    }

    console.log('✅ Subscription record created/updated');

    // Create checkout session
    console.log('Creating Stripe checkout session...');
    const session = await stripe.checkout.sessions.create({
      customer: customerData.customer_id,
      payment_method_types: ['card'],
      line_items: [{ price: price_id, quantity: 1 }],
      mode: 'subscription',
      success_url,
      cancel_url,
    });

    console.log('✅ Checkout session created:', session.id);
    return createResponse({ url: session.url });
  } catch (error: any) {
    console.error('❌ Error:', error);
    return createResponse({ error: error.message }, 500);
  }
});