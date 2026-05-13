import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark pt-16 pb-8 px-12 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Logo & Brand */}
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="FlowKit Logo" className="w-6 h-6 object-contain rounded shadow-sm" />
            <span className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">Flowkit</span>
          </Link>
          <p className="text-sm text-text-muted-light dark:text-text-secondary-dark">
            Built for teams who want to move fast without breaking things.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">Product</h4>
          <a href="#" className="text-sm hover:text-primary transition-colors">Features</a>
          <a href="#" className="text-sm hover:text-primary transition-colors">Pricing</a>
          <Link to="/integrations" className="text-sm hover:text-primary transition-colors">Integrations</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">Company</h4>
          <Link to="/about" className="text-sm hover:text-primary transition-colors">About</Link>
          <a href="#" className="text-sm hover:text-primary transition-colors">Careers</a>
          <a href="#" className="text-sm hover:text-primary transition-colors">Contact</a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">Resources</h4>
          <a href="#" className="text-sm hover:text-primary transition-colors">Blog</a>
          <a href="#" className="text-sm hover:text-primary transition-colors">Docs</a>
          <a href="#" className="text-sm hover:text-primary transition-colors">Support</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto pt-8 border-t border-border-light dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-text-muted-light dark:text-text-secondary-dark">
          © 2024 Flowkit. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          <Link to="/security" className="hover:text-primary transition-colors">Security</Link>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-text-muted-light hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary transition-colors">
            Twitter
          </a>
          <a href="#" className="text-text-muted-light hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-text-muted-light hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
