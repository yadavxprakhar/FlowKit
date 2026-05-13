import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-12 py-6 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <img src="/logo.png" alt="FlowKit Logo" className="w-8 h-8 object-contain rounded-lg shadow-sm" />
        <span className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">Flowkit</span>
      </Link>
      <div className="hidden md:flex gap-8 items-center font-medium">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <Link to="/features" className="hover:text-primary transition-colors">Features</Link>
        <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
        <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
        <Link to="/register" className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-md transition-colors shadow-sm font-medium">
          Start Free
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
