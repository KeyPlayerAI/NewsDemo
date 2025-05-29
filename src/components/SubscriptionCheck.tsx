import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSubscriptionCheck } from '../hooks/useSubscriptionCheck';

interface SubscriptionCheckProps {
  children: React.ReactNode;
}

export const SubscriptionCheck: React.FC<SubscriptionCheckProps> = ({ children }) => {
  const { isSubscribed, loading, error } = useSubscriptionCheck();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error loading subscription status</div>
          <button 
            onClick={() => window.location.reload()} 
            className="text-primary hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!isSubscribed) {
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
};