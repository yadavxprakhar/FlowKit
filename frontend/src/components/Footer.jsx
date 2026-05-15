import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Phone, Globe } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F0906] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
        {/* Logo & Brand */}
        <div className="md:col-span-4 space-y-6">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div className="w-10 h-10 bg-[#8B4513] rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20 group-hover:rotate-6 transition-all overflow-hidden p-1.5">
            <img src={logo} alt="Flowkit" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">Flowkit</span>
        </Link>
          <p className="text-[#D7CCC8] max-w-xs leading-relaxed font-medium">
            The high-velocity workspace for teams that refuse to be slowed down by their tools.
          </p>
        </div>

        {/* Links Sections */}
        <div className="md:col-span-2 space-y-6">
          <h4 className="text-white font-bold tracking-tight">Product</h4>
          <div className="flex flex-col gap-4">
            <Link to="/features" className="text-[#D7CCC8] hover:text-white transition-colors">Features</Link>
            <Link to="/#pricing" className="text-[#D7CCC8] hover:text-white transition-colors">Pricing</Link>
            <Link to="/integrations" className="text-[#D7CCC8] hover:text-white transition-colors">Integrations</Link>

          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h4 className="text-white font-bold tracking-tight">Company</h4>
          <div className="flex flex-col gap-4">
            <Link to="/about" className="text-[#D7CCC8] hover:text-white transition-colors">About</Link>
            <Link to="/careers" className="text-[#D7CCC8] hover:text-white transition-colors">Careers</Link>
            <Link to="/contact" className="text-[#D7CCC8] hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h4 className="text-white font-bold tracking-tight">Legal</h4>
          <div className="flex flex-col gap-4">
            <Link to="/privacy" className="text-[#D7CCC8] hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[#D7CCC8] hover:text-white transition-colors">Terms</Link>
            <Link to="/security" className="text-[#D7CCC8] hover:text-white transition-colors">Security</Link>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h4 className="text-white font-bold tracking-tight">Community</h4>
          <div className="flex flex-col gap-4">
            <a href="#" className="text-[#D7CCC8] hover:text-white transition-colors flex items-center gap-2"><Mail size={16} className="text-[#20B2AA]" /> Newsletter</a>
            <a href="#" className="text-[#D7CCC8] hover:text-white transition-colors flex items-center gap-2"><MessageSquare size={16} className="text-[#20B2AA]" /> Forum</a>
            <a href="#" className="text-[#D7CCC8] hover:text-white transition-colors flex items-center gap-2"><Globe size={16} className="text-[#20B2AA]" /> Blog</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-[#8D6E63] font-medium">
          © 2024 Flowkit Labs Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-[#8D6E63] text-xs font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#20B2AA]"></span>
          All Systems Operational
        </div>
      </div>
    </footer>
  );
};

export default Footer;

