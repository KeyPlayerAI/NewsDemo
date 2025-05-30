import React from 'react';
import { Link } from 'react-router-dom';
import { NewspaperIcon } from 'lucide-react';
import { HeroSectionContent } from '../components/HeroSectionContent';
import { Typewriter } from '../components/ui/typewriter';
import './Landing.css';

export const Landing: React.FC = () => {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="logo">
            <NewspaperIcon size={24} />
            <span>Carroll County News</span>
          </div>
          <div className="nav-buttons">
            <Link to="/login" className="login-btn">Log In</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero" style={{
          background: `linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('https://plpupiqllkbomfomhwyt.supabase.co/storage/v1/object/sign/logo/Screenshot_30-5-2025_11320_bolt.new.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzJlYjI5ZmIxLTM4M2QtNDU5YS1hMWNlLTNmZmI5Y2Q3NTRiOCJ9.eyJ1cmwiOiJsb2dvL1NjcmVlbnNob3RfMzAtNS0yMDI1XzExMzIwX2JvbHQubmV3LmpwZWciLCJpYXQiOjE3NDg1ODU2MTYsImV4cCI6MTc4MDEyMTYxNn0.Nh3cV_9EG-YMJFTad8opaX5Pglw1Dyc8Ms2pdqnrK94')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <HeroSectionContent />
          <div className="typewriter-container">
            <p className="whitespace-pre-wrap text-2xl md:text-3xl lg:text-4xl font-normal text-white">
              <span>{"We're here to "}</span>
              <Typewriter
                text={[
                  "inform",
                  "inspire",
                  "connect",
                  "empower",
                  "serve our community",
                ]}
                speed={70}
                className="text-blue-300"
                waitTime={1500}
                deleteSpeed={40}
                cursorChar={"_"}
              />
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};