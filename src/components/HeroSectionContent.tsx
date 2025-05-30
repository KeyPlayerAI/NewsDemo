import React from 'react';
import { Link } from 'react-router-dom';
import { SubscriptionButton } from './SubscriptionButton';
import { products } from '../stripe-config';

export const HeroSectionContent: React.FC = () => {
  return (
    <section className="overflow-hidden bg-transparent">
      <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl text-white mb-8">
            Modern News Platform Reimagined
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-white/90">
            Experience Carroll County's most comprehensive news coverage with our cutting-edge digital platform. Stay informed, connected, and ahead.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SubscriptionButton priceId={products['Carroll County News'].priceId} />
            <Link 
              to="/login"
              className="px-6 py-2 text-white border-2 border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              Already subscribed?
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-16 max-w-7xl [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
        <div className="[perspective:1200px] [mask-image:linear-gradient(to_right,black_50%,transparent_100%)] -mr-16 pl-16 lg:-mr-56 lg:pl-56">
          <div className="[transform:rotateX(20deg)]">
            <div className="lg:h-[44rem] relative skew-x-[.36rad]">
              <img
                className="rounded-[--radius] z-[2] relative border border-white/10"
                src="https://plpupiqllkbomfomhwyt.supabase.co/storage/v1/object/sign/logo/Screenshot_30-5-2025_11320_bolt.new.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzJlYjI5ZmIxLTM4M2QtNDU5YS1hMWNlLTNmZmI5Y2Q3NTRiOCJ9.eyJ1cmwiOiJsb2dvL1NjcmVlbnNob3RfMzAtNS0yMDI1XzExMzIwX2JvbHQubmV3LmpwZWciLCJpYXQiOjE3NDg1ODU2MTYsImV4cCI6MTc4MDEyMTYxNn0.Nh3cV_9EG-YMJFTad8opaX5Pglw1Dyc8Ms2pdqnrK94"
                alt="News Platform Preview"
                width={2880}
                height={2074}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};