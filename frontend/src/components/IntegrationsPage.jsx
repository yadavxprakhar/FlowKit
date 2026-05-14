import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { MessageSquare, Code, Cloud, Video, Mail, Calendar, Database, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const IntegrationsPage = () => {
  const integrations = [
    { name: "Slack", description: "Send Nudges and receive Huddle updates directly in your Slack channels.", icon: MessageSquare, color: "text-[#E01E5A]", bg: "bg-[#E01E5A]/10" },
    { name: "GitHub", description: "Sync commits and pull requests with your Stack Board tasks automatically.", icon: Code, color: "text-white", bg: "bg-white/10" },
    { name: "Google Drive", description: "Attach documents and sheets directly to Flow List items using Clip.", icon: Cloud, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Figma", description: "Embed live design files in tasks for immediate team feedback.", icon: Code, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Zoom", description: "Start instant video meetings from any Huddle conversation.", icon: Video, color: "text-blue-600", bg: "bg-blue-600/10" },
    { name: "Gmail", description: "Turn emails into tasks with one click using our browser extension.", icon: Mail, color: "text-rose-500", bg: "bg-rose-500/10" },
    { name: "Google Calendar", description: "Two-way sync your Schedule with Google Calendar events.", icon: Calendar, color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "Notion", description: "Link Notion pages as project documentation references.", icon: Database, color: "text-white", bg: "bg-white/10" },
  ];

  return (
    <div className="min-h-screen bg-[#0F0906] text-[#D7CCC8] font-sans selection:bg-[#8B4513]/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8B4513]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#20B2AA]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      <main className="relative pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Zap size={14} className="text-[#8B4513]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#8B4513]">Power up your flow</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Connect your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7CCC8] via-amber-200 to-[#20B2AA]">favorite tools.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Flowkit plays nice with the software your team already uses. Sync data, automate workflows, and keep everything in one place.
          </p>
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {['All', 'Communication', 'Development', 'Design', 'Productivity'].map((cat) => (
            <button key={cat} className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#8B4513]/50 hover:bg-white/10 text-sm font-bold transition-all text-slate-400 hover:text-white">
              {cat}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <div key={index} className="group p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col items-start cursor-pointer">
                <div className="flex items-center gap-4 mb-8 w-full">
                  <div className={`w-14 h-14 rounded-2xl ${integration.bg} ${integration.color} flex items-center justify-center group-hover:rotate-6 transition-transform shadow-2xl`}>
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {integration.name}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">
                  {integration.description}
                </p>
                <div className="w-full pt-6 border-t border-white/5 flex justify-between items-center group/btn">
                  <span className="text-xs font-bold text-slate-600 group-hover:text-[#20B2AA] transition-colors">Connect</span>
                  <ArrowRight size={16} className="text-slate-700 group-hover:text-[#20B2AA] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* API CTA Section */}
        <section className="mt-40 max-w-5xl mx-auto relative overflow-hidden rounded-[48px] bg-[#1A120E] border border-white/10 p-12 md:p-20 text-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/10 to-transparent"></div>
          <Sparkles className="absolute top-10 right-10 text-[#8B4513]/10" size={120} />
          <div className="relative">
            <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Build your own connection.</h2>
            <p className="text-lg text-[#D7CCC8] mb-10 max-w-xl mx-auto">Use our robust REST API to build custom connections for your internal tools. The possibilities are endless.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-10 py-4 bg-[#8B4513] hover:bg-[#5D2E0A] text-white rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-amber-900/20 flex items-center justify-center gap-2">
                <Zap size={18} />
                Request Custom Integration
              </button>
              <button className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black transition-all hover:bg-white/10 flex items-center justify-center gap-2">
                <Code size={18} />
                View API Docs
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IntegrationsPage;

