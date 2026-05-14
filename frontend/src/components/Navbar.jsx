import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  // Re-check auth state on every route change (covers login/logout navigation)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  // Also listen to storage events (covers token removal in other tabs)
  useEffect(() => {
    const handleStorage = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] px-8 py-4 flex justify-between items-center shadow-2xl">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div className="w-10 h-10 bg-[#8B4513] rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20 group-hover:rotate-6 transition-all overflow-hidden p-1.5">
            <img src={logo} alt="Flowkit" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">Flowkit</span>
        </Link>

        <div className="hidden md:flex gap-10 items-center">
          <Link to="/" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Home</Link>
          <Link to="/features" className="text-sm font-bold text-[#D7CCC8] hover:text-white transition-colors">Features</Link>
          <Link
            to={isLoggedIn ? '/dashboard' : '/login'}
            className={`text-sm font-bold transition-colors flex items-center gap-2 ${
              isLoggedIn
                ? 'text-[#20B2AA] hover:text-[#7CC0D8]'
                : 'text-[#D7CCC8] hover:text-white'
            }`}
          >
            {isLoggedIn && <span className="w-1.5 h-1.5 rounded-full bg-[#20B2AA] animate-pulse" />}
            Dashboard
          </Link>
          <a href="/#pricing" className="text-sm font-bold text-[#D7CCC8] hover:text-white transition-colors">Pricing</a>
          <div className="h-4 w-px bg-white/10"></div>
          {isLoggedIn ? (
            <Link to="/dashboard" className="bg-[#8B4513] hover:bg-[#5D2E0A] text-white px-6 py-3 rounded-2xl text-sm font-black transition-all shadow-lg shadow-amber-900/20 hover:scale-105 active:scale-95">
              Go to App
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-[#D7CCC8] hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="bg-[#8B4513] hover:bg-[#5D2E0A] text-white px-6 py-3 rounded-2xl text-sm font-black transition-all shadow-lg shadow-amber-900/20 hover:scale-105 active:scale-95">
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
