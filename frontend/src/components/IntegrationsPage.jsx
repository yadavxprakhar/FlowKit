import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { MessageSquare, Code, Cloud, PenTool, Video, Mail, Calendar, Database, ArrowRight } from 'lucide-react';

const IntegrationsPage = () => {
  const integrations = [
    { name: "Slack", description: "Send Nudges and receive Huddle updates directly in your Slack channels.", icon: MessageSquare, color: "text-[#E01E5A]", bg: "bg-[#E01E5A]/10" },
    { name: "GitHub", description: "Sync commits and pull requests with your Stack Board tasks automatically.", icon: Code, color: "text-gray-800 dark:text-white", bg: "bg-gray-200 dark:bg-gray-800" },
    { name: "Google Drive", description: "Attach documents and sheets directly to Flow List items using Clip.", icon: Cloud, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Figma", description: "Embed live design files in tasks for immediate team feedback.", icon: PenTool, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Zoom", description: "Start instant video meetings from any Huddle conversation.", icon: Video, color: "text-blue-600", bg: "bg-blue-600/10" },
    { name: "Gmail", description: "Turn emails into tasks with one click using our browser extension.", icon: Mail, color: "text-red-500", bg: "bg-red-500/10" },
    { name: "Google Calendar", description: "Two-way sync your Schedule with Google Calendar events.", icon: Calendar, color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "Notion", description: "Link Notion pages as project documentation references.", icon: Database, color: "text-gray-900 dark:text-gray-100", bg: "bg-gray-200 dark:bg-gray-800" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-secondary-light dark:text-text-secondary-dark font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
            Connect your favorite tools
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            Flowkit plays nice with the software your team already uses. Sync data, automate workflows, and keep everything in one place.
          </p>
        </div>

        {/* Categories / Filters (Mockup) */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium">All Integrations</button>
          <button className="px-4 py-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary text-sm font-medium transition-colors">Communication</button>
          <button className="px-4 py-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary text-sm font-medium transition-colors">Development</button>
          <button className="px-4 py-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary text-sm font-medium transition-colors">Design</button>
          <button className="px-4 py-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary text-sm font-medium transition-colors">Productivity</button>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <div key={index} className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 hover:shadow-md transition-all group flex flex-col h-full cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg ${integration.bg} ${integration.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    {integration.name}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark flex-grow mb-6">
                  {integration.description}
                </p>
                <div className="mt-auto flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-primary/5 border border-primary/20 rounded-2xl p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            Don't see your tool?
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-xl mx-auto">
            We're constantly adding new integrations. You can also use our robust REST API to build custom connections for your internal tools.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm">
              Request Integration
            </button>
            <button className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark hover:border-primary dark:hover:border-primary px-6 py-3 rounded-lg font-medium transition-colors shadow-sm">
              View API Docs
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IntegrationsPage;
