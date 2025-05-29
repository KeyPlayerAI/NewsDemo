import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { News } from './pages/News';
import { Sports } from './pages/Sports';
import { Weather } from './pages/Weather';
import { Community } from './pages/Community';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Success } from './pages/Success';
import { Cancel } from './pages/Cancel';
import { useAuth } from './hooks/useAuth';
import { SubscriptionCheck } from './components/SubscriptionCheck';
import './App.css';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/landing" 
          element={
            session ? (
              <Navigate to="/\" replace />
            ) : (
              <PageTransition>
                <Landing />
              </PageTransition>
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            session ? (
              <Navigate to="/\" replace />
            ) : (
              <PageTransition>
                <Login />
              </PageTransition>
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            session ? (
              <Navigate to="/\" replace />
            ) : (
              <PageTransition>
                <SignUp />
              </PageTransition>
            )
          } 
        />
        
        {/* Stripe callback routes */}
        <Route 
          path="/success" 
          element={
            <PageTransition>
              <Success />
            </PageTransition>
          }
        />
        <Route 
          path="/cancel" 
          element={
            session ? (
              <PageTransition>
                <Cancel />
              </PageTransition>
            ) : (
              <Navigate to="/landing" replace />
            )
          } 
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            session ? (
              <SubscriptionCheck>
                <Layout>
                  <PageTransition>
                    <Home />
                  </PageTransition>
                </Layout>
              </SubscriptionCheck>
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        />
        <Route
          path="/news"
          element={
            session ? (
              <SubscriptionCheck>
                <Layout>
                  <PageTransition>
                    <News />
                  </PageTransition>
                </Layout>
              </SubscriptionCheck>
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        />
        <Route
          path="/sports"
          element={
            session ? (
              <SubscriptionCheck>
                <Layout>
                  <PageTransition>
                    <Sports />
                  </PageTransition>
                </Layout>
              </SubscriptionCheck>
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        />
        <Route
          path="/weather"
          element={
            session ? (
              <SubscriptionCheck>
                <Layout>
                  <PageTransition>
                    <Weather />
                  </PageTransition>
                </Layout>
              </SubscriptionCheck>
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        />
        <Route
          path="/community"
          element={
            session ? (
              <SubscriptionCheck>
                <Layout>
                  <PageTransition>
                    <Community />
                  </PageTransition>
                </Layout>
              </SubscriptionCheck>
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        />

        {/* Catch all route */}
        <Route 
          path="*" 
          element={<Navigate to={session ? "/" : "/landing"} replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;