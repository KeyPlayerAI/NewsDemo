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
    storage: {
      getItem: (key) => {
        try {
          return sessionStorage.getItem(key);
        } catch (error) {
          console.warn('Error accessing sessionStorage:', error);
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          sessionStorage.setItem(key, value);
        } catch (error) {
          console.warn('Error setting sessionStorage:', error);
        }
      },
      removeItem: (key) => {
        try {
          sessionStorage.removeItem(key);
        } catch (error) {
          console.warn('Error removing from sessionStorage:', error);
        }
      },
    },
  },
});

// Test storage access
try {
  sessionStorage.setItem('supabase-storage-test', 'test');
  sessionStorage.removeItem('supabase-storage-test');
  console.log('Session storage is accessible');
} catch (error) {
  console.warn('Session storage is not accessible:', error);
}