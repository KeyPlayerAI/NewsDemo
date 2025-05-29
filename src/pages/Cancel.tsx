import React from 'react';
import { Link } from 'react-router-dom';

export const Cancel: React.FC = () => {
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h2>
          <p className="text-gray-600">Your subscription was not completed.</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            If you have any questions or concerns, please don't hesitate to contact our support team.
          </p>
          <Link
            to="/"
            className="block w-full bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};