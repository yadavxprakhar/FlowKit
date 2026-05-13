import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] px-8 py-4 flex justify-between items-center shadow-2xl">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">Flowkit</span>
        </Link>

        <div className="hidden md:flex gap-10 items-center">
          <Link to="/" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Home</Link>
          <Link to="/features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Features</Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Dashboard
            </Link>
          )}
          <Link to="/pricing" className="text-sm font-bold text-slate-400 hover:text-sm font-bold text-slate-400 hover:text-white transition-colors">Pricing</Link>
          <div className="h-4 w-px bg-white/10"></div>
          {isLoggedIn ? (
            <Link to="/dashboard" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-2xl text-sm font-black transition-all">
              Go to App
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl text-sm font-black transition-all shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95">
                Start Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

