import React from 'react';
import { Link } from 'react-router-dom';
import { SubscriptionButton } from './SubscriptionButton';
import { products } from '../stripe-config';

export const HeroSectionContent: React.FC = () => {
  return (
    <section className="overflow-hidden bg-white dark:bg-transparent">
      <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl text-white">
            Your Trusted Source for Local News
          </h1>
          <p className="mx-auto my-8 max-w-2xl text-xl text-white/90">
            Stay connected with Carroll County's most comprehensive news coverage, featuring in-depth reporting, real-time updates, and community insights that matter to you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <SubscriptionButton priceId={products['Carroll County News'].priceId} />
            <Link 
              to="/login"
              className="px-6 py-2 text-white border-2 border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="text-center text-lg font-medium text-white/80 mb-12">
          Trusted by the Community
        </h2>
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 grayscale">
          <img
            className="h-5 w-auto brightness-0 invert"
            src="https://html.tailus.io/blocks/customers/nvidia.svg"
            alt="Local Business Partner"
            height="20"
          />
          <img
            className="h-5 w-auto brightness-0 invert"
            src="https://html.tailus.io/blocks/customers/nike.svg"
            alt="Local Business Partner"
            height="20"
          />
          <img
            className="h-5 w-auto brightness-0 invert"
            src="https://html.tailus.io/blocks/customers/laravel.svg"
            alt="Local Business Partner"
            height="20"
          />
          <img
            className="h-7 w-auto brightness-0 invert"
            src="https://html.tailus.io/blocks/customers/lilly.svg"
            alt="Local Business Partner"
            height="28"
          />
          <img
            className="h-5 w-auto brightness-0 invert"
            src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
            alt="Local Business Partner"
            height="20"
          />
        </div>
      </div>
    </section>
  );
};