import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = 10;
    const retryInterval = 2000; // 2 seconds

    const checkSubscriptionStatus = async () => {
      try {
        const { data: subscription } = await supabase
          .from('stripe_user_subscriptions')
          .select('subscription_status')
          .maybeSingle();

        if (subscription?.subscription_status === 'active') {
          if (mounted) {
            navigate('/', { replace: true });
          }
          return true;
        }

        return false;
      } catch (err) {
        console.error('Error checking subscription status:', err);
        return false;
      }
    };

    const handleAuth = async () => {
      try {
        const email = searchParams.get('email');
        const password = searchParams.get('password');

        console.log('Processing success page:', { hasEmail: !!email, hasPassword: !!password });

        // Check if we're already authenticated
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('User already authenticated');
          
          // Start polling for subscription status
          const pollSubscription = async () => {
            const isActive = await checkSubscriptionStatus();
            
            if (!isActive && retryCount < maxRetries) {
              retryCount++;
              setTimeout(pollSubscription, retryInterval);
            } else if (!isActive) {
              if (mounted) {
                setError('Subscription activation timed out. Please contact support.');
                setLoading(false);
              }
            }
          };

          pollSubscription();
          return;
        }

        if (!email || !password) {
          console.log('No credentials in URL, redirecting to login...');
          navigate('/login', { replace: true });
          return;
        }

        console.log('Attempting to sign in user...');
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          throw signInError;
        }

        // Start polling for subscription status after sign in
        const pollSubscription = async () => {
          const isActive = await checkSubscriptionStatus();
          
          if (!isActive && retryCount < maxRetries) {
            retryCount++;
            setTimeout(pollSubscription, retryInterval);
          } else if (!isActive) {
            if (mounted) {
              setError('Subscription activation timed out. Please contact support.');
              setLoading(false);
            }
          }
        };

        pollSubscription();
      } catch (err: any) {
        console.error('Authentication error:', err);
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    handleAuth();

    return () => {
      mounted = false;
    };
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600">Activating your subscription...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-red-600">{error}</p>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              We encountered an error while setting up your subscription. Please try again or contact support if the problem persists.
            </p>
            <Link
              to="/signup"
              className="block w-full bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark transition-colors"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Carroll County News!</h2>
          <p className="text-gray-600">Your subscription has been confirmed.</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            You now have full access to all our content. We're excited to have you as a subscriber!
          </p>
          <Link
            to="/"
            className="block w-full bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark transition-colors"
          >
            Start Reading
          </Link>
        </div>
      </div>
    </div>
  );
};