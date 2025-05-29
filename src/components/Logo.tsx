import React from 'react';
import { NewspaperIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="logo-link">
      <div className="logo">
        <NewspaperIcon size={24} color="#ffffff" />
        <span className="logo-text" style={{ 
          fontFamily: 'var(--heading-font)',
          fontSize: '1.25rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #4299E1, #2B6CB0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'white',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
          letterSpacing: '0.025em'
        }}>
          Carroll County News
        </span>
      </div>
      <style jsx>{`
        .logo-link {
          text-decoration: none;
          color: white;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @media (max-width: 640px) {
          .logo-text {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </Link>
  );
};