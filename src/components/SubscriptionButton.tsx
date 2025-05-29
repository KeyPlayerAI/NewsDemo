import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Sparkles } from 'lucide-react';
import './SubscriptionButton.css';

interface SubscriptionButtonProps {
  priceId: string;
}

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ priceId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.access_token) {
        window.location.href = '/signup';
        return;
      }

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
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
        className="subscription-button"
      >
        {loading ? (
          <span className="subscription-button-loading">Processing...</span>
        ) : (
          <>
            <Sparkles size={20} />
            <span>Subscribe Now</span>
          </>
        )}
      </button>
      {error && (
        <div className="subscription-error">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 14A6 6 0 108 2a6 6 0 000 12zM8 5v3M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};