import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

console.log('Initializing Supabase client...');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
    storage: localStorage,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.39.7',
    },
  },
  db: {
    schema: 'public',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Test storage access and Supabase connection
try {
  localStorage.setItem('supabase-storage-test', 'test');
  localStorage.removeItem('supabase-storage-test');
  console.log('Local storage is accessible');
  
  // Test Supabase connection
  supabase.from('stripe_customers').select('count').limit(1)
    .then(() => console.log('Successfully connected to Supabase'))
    .catch(error => console.error('Supabase connection error:', error));
} catch (error) {
  console.warn('Local storage is not accessible:', error);
}