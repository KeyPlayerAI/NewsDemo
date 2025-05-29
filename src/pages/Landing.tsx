import React from 'react';
import { Link } from 'react-router-dom';
import { NewspaperIcon, ActivityIcon, CloudIcon, CalendarIcon, CheckCircle, Users, Bell } from 'lucide-react';
import { SubscriptionButton } from '../components/SubscriptionButton';
import { products } from '../stripe-config';
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
        <section className="hero">
          <div className="hero-content">
            <h1>Your Trusted Source for Local News</h1>
            <p>Stay connected with Carroll County's most comprehensive news coverage, featuring in-depth reporting, real-time updates, and community insights that matter to you.</p>
            <div className="hero-features">
              <div className="hero-feature">
                <CheckCircle size={20} />
                <span>Exclusive Local Coverage</span>
              </div>
              <div className="hero-feature">
                <CheckCircle size={20} />
                <span>Real-time Updates</span>
              </div>
              <div className="hero-feature">
                <CheckCircle size={20} />
                <span>Community Focused</span>
              </div>
            </div>
            <SubscriptionButton priceId={products['Carroll County News'].priceId} />
          </div>
        </section>

        <section className="why-subscribe">
          <div className="section-container">
            <h2>Why Subscribe to Carroll County News?</h2>
            <p className="section-subtitle">Join thousands of informed residents who trust us for their daily news</p>
            
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <NewspaperIcon size={32} />
                </div>
                <h3>Comprehensive Coverage</h3>
                <p>Get access to exclusive stories, investigative reporting, and in-depth analysis of local issues that impact your community.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <Bell size={32} />
                </div>
                <h3>Breaking News Alerts</h3>
                <p>Stay informed with instant notifications about important events, weather alerts, and breaking news in Carroll County.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <Users size={32} />
                </div>
                <h3>Community Connection</h3>
                <p>Engage with fellow community members, share perspectives, and stay connected to what matters in your neighborhood.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <h2>Everything You Need to Stay Informed</h2>
          <div className="features-grid">
            <div className="feature-card">
              <NewspaperIcon size={32} />
              <h3>Local News</h3>
              <p>From city council meetings to school board decisions, stay updated on the issues that affect your daily life.</p>
              <ul className="feature-list">
                <li>City Government Coverage</li>
                <li>Education Updates</li>
                <li>Business Development</li>
              </ul>
            </div>
            <div className="feature-card">
              <ActivityIcon size={32} />
              <h3>Sports Coverage</h3>
              <p>Comprehensive coverage of local sports, from high school athletics to community leagues.</p>
              <ul className="feature-list">
                <li>Live Game Updates</li>
                <li>Player Profiles</li>
                <li>Season Statistics</li>
              </ul>
            </div>
            <div className="feature-card">
              <CloudIcon size={32} />
              <h3>Weather Updates</h3>
              <p>Accurate, localized weather forecasts and alerts to help you plan your day.</p>
              <ul className="feature-list">
                <li>Real-time Forecasts</li>
                <li>Severe Weather Alerts</li>
                <li>Interactive Radar</li>
              </ul>
            </div>
            <div className="feature-card">
              <CalendarIcon size={32} />
              <h3>Community Events</h3>
              <p>Your complete guide to local events, festivals, and community gatherings.</p>
              <ul className="feature-list">
                <li>Event Calendar</li>
                <li>Local Festivals</li>
                <li>Community Meetups</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="section-container">
            <h2>What Our Readers Say</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p>"Carroll County News has become my go-to source for staying informed about our community. The coverage is thorough and unbiased."</p>
                <div className="testimonial-author">
                  <span className="author-name">Sarah Johnson</span>
                  <span className="author-title">Local Business Owner</span>
                </div>
              </div>
              <div className="testimonial-card">
                <p>"The weather alerts and community updates have been invaluable. It's like having a neighbor who always knows what's happening."</p>
                <div className="testimonial-author">
                  <span className="author-name">Michael Thompson</span>
                  <span className="author-title">Resident Since 1990</span>
                </div>
              </div>
              <div className="testimonial-card">
                <p>"I appreciate the detailed coverage of our local sports teams. It's great to see our young athletes getting the recognition they deserve."</p>
                <div className="testimonial-author">
                  <span className="author-name">David Wilson</span>
                  <span className="author-title">High School Coach</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="cta-content">
            <h2>Join Our Community Today</h2>
            <p>Get unlimited access to Carroll County's most trusted news source. Stay informed, stay connected.</p>
            <div className="cta-buttons">
              <SubscriptionButton priceId={products['Carroll County News'].priceId} />
              <Link to="/login" className="cta-button secondary">Already have an account?</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>About Us</h4>
              <p>Carroll County News is your trusted source for local news, serving the community since 1925.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Subscribe</a></li>
                <li><a href="#">Advertise</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Carroll County News. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};