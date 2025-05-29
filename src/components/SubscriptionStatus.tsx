import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { products } from '../stripe-config';
import './SubscriptionStatus.css';

export const SubscriptionStatus: React.FC = () => {
  const { subscription, loading } = useSubscription();

  if (loading) {
    return (
      <div className="subscription-status">
        <span>Loading...</span>
      </div>
    );
  }

  if (!subscription || subscription.subscription_status !== 'active') {
    return null;
  }

  const product = Object.values(products).find(p => p.priceId === subscription.price_id);
  
  return (
    <div className="subscription-status">
      <CheckCircle size={16} className="subscription-status-icon" />
      <span className="subscription-label">Active:</span>
      <span className="subscription-name">{product?.name || 'Carroll County News'}</span>
    </div>
  );
};