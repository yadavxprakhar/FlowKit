import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const LegalPageLayout = ({ title, lastUpdated, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-secondary-light dark:text-text-secondary-dark font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-24 w-full">
        <div className="mb-12 border-b border-border-light dark:border-border-dark pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            {title}
          </h1>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            Last updated: {lastUpdated}
          </p>
        </div>
        
        <div className="flex flex-col gap-6 text-lg">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPageLayout;
