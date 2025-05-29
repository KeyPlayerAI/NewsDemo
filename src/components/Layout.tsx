import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { 
  NewspaperIcon, ActivityIcon, CloudIcon, CalendarIcon, 
  BellIcon, UserIcon, LogOut, Home, Menu, X
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle pull-to-refresh
  useEffect(() => {
    if (!isMobile) return;

    let startY = 0;
    let currentY = 0;
    let refreshing = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].pageY;
      currentY = startY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (refreshing) return;
      
      currentY = e.touches[0].pageY;
      const pull = currentY - startY;
      
      if (window.scrollY === 0 && pull > 0) {
        e.preventDefault();
        document.body.style.transform = `translateY(${Math.min(pull / 2, 75)}px)`;
      }
    };
    
    const handleTouchEnd = async () => {
      if (refreshing) return;
      
      const pull = currentY - startY;
      
      if (pull > 75) {
        refreshing = true;
        setIsRefreshing(true);
        document.body.style.transform = 'translateY(0)';
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          window.location.reload();
        } catch (error) {
          console.error('Error refreshing:', error);
          setIsRefreshing(false);
          refreshing = false;
        }
      } else {
        document.body.style.transform = 'translateY(0)';
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavLinkClick = (e: React.MouseEvent) => {
    if (isRefreshing) {
      e.preventDefault();
    }
  };

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
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`} 
                  end
                  onClick={handleNavLinkClick}
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/news" 
                  className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleNavLinkClick}
                >
                  News
                </NavLink>
                <NavLink 
                  to="/sports" 
                  className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleNavLinkClick}
                >
                  Sports
                </NavLink>
                <NavLink 
                  to="/weather" 
                  className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleNavLinkClick}
                >
                  Weather
                </NavLink>
                <NavLink 
                  to="/community" 
                  className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleNavLinkClick}
                >
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
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          </div>
        )}
        {children}
      </main>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-menu-content" onClick={e => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <Logo />
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="mobile-menu-nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`} 
              end
              onClick={handleNavLinkClick}
            >
              <Home size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/news" 
              className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
              onClick={handleNavLinkClick}
            >
              <NewspaperIcon size={20} />
              <span>News</span>
            </NavLink>
            <NavLink 
              to="/sports" 
              className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
              onClick={handleNavLinkClick}
            >
              <ActivityIcon size={20} />
              <span>Sports</span>
            </NavLink>
            <NavLink 
              to="/weather" 
              className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
              onClick={handleNavLinkClick}
            >
              <CloudIcon size={20} />
              <span>Weather</span>
            </NavLink>
            <NavLink 
              to="/community" 
              className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
              onClick={handleNavLinkClick}
            >
              <CalendarIcon size={20} />
              <span>Community</span>
            </NavLink>
          </nav>
        </div>
      </div>
      
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Carroll County News | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
        </div>
      </footer>
    </div>
  );
};