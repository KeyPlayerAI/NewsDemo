import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { 
  NewspaperIcon, ActivityIcon, CloudIcon, CalendarIcon, 
  BellIcon, UserIcon, LogOut, Home, Menu
} from 'lucide-react';
import { Logo } from './Logo';
import { SubscriptionStatus } from './SubscriptionStatus';
import { supabase } from '../lib/supabase';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleProfileMenu = () => {
    setProfileMenuOpen(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/landing');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Handle pull-to-refresh
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].pageY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      currentY = e.touches[0].pageY;
      const pull = currentY - startY;
      
      if (window.scrollY === 0 && pull > 0) {
        e.preventDefault();
        document.body.style.transform = `translateY(${Math.min(pull / 2, 75)}px)`;
      }
    };
    
    const handleTouchEnd = async () => {
      const pull = currentY - startY;
      
      if (pull > 75) {
        setIsRefreshing(true);
        document.body.style.transform = 'translateY(0)';
        window.location.reload();
      } else {
        document.body.style.transform = 'translateY(0)';
      }
    };

    if (isMobile) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (isMobile) {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMobile]);

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <button className="menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={24} />
            </button>
            <Logo />
            <nav className="desktop-nav">
              <div className="desktop-nav-links">
                <NavLink to="/" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`} end>
                  Home
                </NavLink>
                <NavLink to="/news" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
                  News
                </NavLink>
                <NavLink to="/sports" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
                  Sports
                </NavLink>
                <NavLink to="/weather" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
                  Weather
                </NavLink>
                <NavLink to="/community" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
                  Community
                </NavLink>
              </div>
            </nav>
          </div>
          
          <div className="header-right">
            <button className="icon-button">
              <BellIcon size={20} />
            </button>
            <div className="profile-menu-container">
              <button className="icon-button user-button" onClick={toggleProfileMenu}>
                <UserIcon size={20} />
              </button>
              {profileMenuOpen && (
                <div className="profile-menu">
                  <div className="profile-menu-subscription">
                    <SubscriptionStatus />
                  </div>
                  <button className="profile-menu-item" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        {isRefreshing && (
          <div className="ptr-element">
            <div className="ptr-icon">
              <svg className="animate-spin" viewBox="0 0 24 24" width="24" height="24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          </div>
        )}
        {children}
      </main>
      
      <nav className="mobile-nav">
        <div className="mobile-nav-links">
          <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} end>
            <Home size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/news" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <NewspaperIcon size={20} />
            <span>News</span>
          </NavLink>
          <NavLink to="/sports" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <ActivityIcon size={20} />
            <span>Sports</span>
          </NavLink>
          <NavLink to="/weather" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <CloudIcon size={20} />
            <span>Weather</span>
          </NavLink>
          <NavLink to="/community" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <CalendarIcon size={20} />
            <span>Events</span>
          </NavLink>
        </div>
      </nav>
      
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Carroll County News | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
        </div>
      </footer>
    </div>
  );
};