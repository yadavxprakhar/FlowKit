import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Twitter, GitHub, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#020617] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
        {/* Logo & Brand */}
        <div className="md:col-span-4 space-y-6">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <LayoutDashboard className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">Flowkit</span>
          </Link>
          <p className="text-slate-500 text-lg leading-relaxed max-w-xs">
            The unified workspace for high-velocity teams. Reclaim your focus.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-2 space-y-6">
          <h4 className="text-white font-bold tracking-tight">Product</h4>
          <div className="flex flex-col gap-4">
            <Link to="/features" className="text-slate-500 hover:text-white transition-colors">Features</Link>
            <Link to="/pricing" className="text-slate-500 hover:text-white transition-colors">Pricing</Link>
            <Link to="/integrations" className="text-slate-500 hover:text-white transition-colors">Integrations</Link>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h4 className="text-white font-bold tracking-tight">Company</h4>
          <div className="flex flex-col gap-4">
            <Link to="/about" className="text-slate-500 hover:text-white transition-colors">About</Link>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Careers</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h4 className="text-white font-bold tracking-tight">Resources</h4>
          <div className="flex flex-col gap-4">
            <Link to="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-slate-500 hover:text-white transition-colors">Terms</Link>
            <Link to="/security" className="text-slate-500 hover:text-white transition-colors">Security</Link>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h4 className="text-white font-bold tracking-tight">Social</h4>
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"><Twitter size={16} /> Twitter</a>
            <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"><Linkedin size={16} /> LinkedIn</a>
            <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"><GitHub size={16} /> GitHub</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-slate-600 font-medium">
          © 2024 Flowkit Labs Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-slate-700 text-xs font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          All Systems Operational
        </div>
      </div>
    </footer>
  );
};

export default Footer;

