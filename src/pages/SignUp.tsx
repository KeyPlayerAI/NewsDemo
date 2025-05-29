import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NewspaperIcon } from 'lucide-react';
import { products } from '../stripe-config';
import './Auth.css';

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Starting signup process...');
    setError('');
    setLoading(true);

    try {
      console.log('📤 Sending checkout request...', {
        url: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
        email,
        hasPassword: !!password,
        priceId: products['Carroll County News'].priceId,
      });

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          price_id: products['Carroll County News'].priceId,
          email,
          password,
          mode: 'subscription',
          success_url: `${window.location.origin}/success?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
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
      console.error('❌ Signup error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <NewspaperIcon size={32} className="auth-logo" />
          <h1>Create Account</h1>
          <p>Join Carroll County News today</p>
        </div>

        <form onSubmit={handleSignUp} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Processing...' : 'Continue to Payment'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
          <Link to="/landing" className="back-link">Back to home</Link>
        </div>
      </div>
    </div>
  );
};