import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FeaturesPage from './components/FeaturesPage';
import IntegrationsPage from './components/IntegrationsPage';
import AboutPage from './components/AboutPage';
import CareersPage from './components/CareersPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import SecurityPage from './components/SecurityPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AppIntegrationsPage from './components/AppIntegrationsPage';
import ApiDocsPage from './components/ApiDocsPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/dashboard/integrations" 
          element={isAuthenticated ? <AppIntegrationsPage /> : <Navigate to="/login" />} 
        />
        <Route path="/api-docs" element={<ApiDocsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
