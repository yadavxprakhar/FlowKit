import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LegalBackground from './LegalBackground';

const LegalPageLayout = ({ title, lastUpdated, children }) => {
  return (
    <div className="min-h-screen bg-[#0F0906] text-[#D7CCC8] font-sans selection:bg-[#8B4513]/30 overflow-x-hidden relative">
      {/* Legal Custom Motion Background */}
      <LegalBackground />

      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8B4513]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#20B2AA]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      <main className="relative z-10 flex-grow max-w-4xl mx-auto px-6 pt-48 pb-24 w-full">
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-[#8D6E63] font-medium">
            Last updated: {lastUpdated}
          </p>
        </div>
        
        <div className="flex flex-col gap-8 text-lg leading-relaxed">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPageLayout;
