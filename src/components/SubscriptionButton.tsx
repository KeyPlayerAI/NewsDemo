import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface SubscriptionButtonProps {
  priceId: string;
}

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ priceId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    try {
      console.log('🚀 Starting subscription process...');
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      console.log('🔑 Auth session check:', {
        hasSession: !!session,
        hasAccessToken: !!session?.access_token
      });

      if (!session?.access_token) {
        console.log('⚠️ No session, redirecting to signup...');
        window.location.href = '/signup';
        return;
      }

      console.log('📤 Preparing checkout request...', {
        url: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
        priceId,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: priceId,
          mode: 'subscription',
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/cancel`,
        }),
      });

      console.log('📥 Checkout response:', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
      });

      const data = await response.json();
      console.log('📦 Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        console.log('🔄 Redirecting to Stripe checkout:', data.url);
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      console.error('❌ Subscription error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Subscribe Now'}
      </button>
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  );
};