import { useEffect, useState } from 'react';
import { useSubscription } from './useSubscription';

export function useSubscriptionCheck() {
  const { subscription, loading: subscriptionLoading, error } = useSubscription();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subscriptionLoading) {
      setIsSubscribed(subscription?.subscription_status === 'active');
      setLoading(false);
    }
  }, [subscription, subscriptionLoading]);

  return { isSubscribed, loading: loading || subscriptionLoading, error };
}