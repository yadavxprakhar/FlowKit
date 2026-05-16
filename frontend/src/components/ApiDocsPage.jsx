import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { 
  Code, 
  Terminal, 
  Cpu, 
  Globe, 
  Lock, 
  Zap, 
  Copy, 
  ChevronRight,
  Database,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ApiDocsPage = () => {
  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/integrations",
      description: "List all available integration providers and their connection status for the current user.",
      params: "None",
      response: `{
  "providers": [
    { "name": "SLACK", "connected": true, "connectedAt": "2024-05-14T..." },
    { "name": "GITHUB", "connected": false }
  ]
}`
    },
    {
      method: "POST",
      path: "/api/v1/integrations/{provider}/connect",
      description: "Initialize a connection with a specific provider (Slack, GitHub, etc).",
      params: "provider: string (path)",
      response: `{ "status": "success", "message": "Connected to SLACK" }`
    },
    {
      method: "DELETE",
      path: "/api/v1/integrations/{provider}/disconnect",
      description: "Revoke access and disconnect an integration provider.",
      params: "provider: string (path)",
      response: `{ "status": "success", "message": "Disconnected from GITHUB" }`
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0F0906] text-[#D7CCC8] font-sans selection:bg-[#8B4513]/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8B4513]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#20B2AA]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      <main className="relative pt-40 pb-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-40 space-y-8">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#8B4513] mb-4">Introduction</h3>
                <nav className="space-y-2">
                  <a href="#overview" className="block text-sm text-white hover:text-[#20B2AA] transition-colors">Overview</a>
                  <a href="#authentication" className="block text-sm text-slate-400 hover:text-[#20B2AA] transition-colors">Authentication</a>
                </nav>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-[#8B4513] mb-4">Integrations API</h3>
                <nav className="space-y-2">
                  {endpoints.map((ep, i) => (
                    <a key={i} href={`#${ep.method}-${i}`} className="block text-sm text-slate-400 hover:text-[#20B2AA] transition-colors truncate">
                      {ep.method} {ep.path}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Documentation Content */}
          <div className="flex-1 space-y-24">
            
            {/* Header */}
            <section id="overview" className="space-y-6">
              <Link to="/integrations" className="inline-flex items-center gap-2 text-sm text-[#8B4513] hover:text-amber-400 transition-colors mb-4">
                <ArrowLeft size={16} />
                Back to Integrations
              </Link>
              <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                REST API <span className="text-[#8B4513]">Documentation</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                The Flowkit API is organized around REST. Our API has predictable resource-oriented URLs, 
                accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes.
              </p>
            </section>

            {/* Authentication Section */}
            <section id="authentication" className="space-y-8 p-8 bg-white/[0.02] border border-white/5 rounded-[32px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#8B4513]/10 rounded-xl text-[#8B4513]">
                    <Lock size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">Authentication</h2>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Authenticate your requests by including your secret JWT token in the <code className="px-2 py-1 bg-white/10 rounded text-[#20B2AA]">Authorization</code> header.
                </p>
                <div className="bg-[#1A120E] border border-white/10 rounded-2xl p-6 font-mono text-sm group/code relative">
                  <button 
                    onClick={() => copyToClipboard("Authorization: Bearer YOUR_TOKEN")}
                    className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg opacity-0 group-hover/code:opacity-100 transition-opacity hover:bg-white/10"
                  >
                    <Copy size={16} />
                  </button>
                  <span className="text-amber-500">Authorization:</span> <span className="text-emerald-400">Bearer YOUR_JWT_TOKEN</span>
                </div>
              </div>
            </section>

            {/* Endpoints */}
            <div className="space-y-16">
              <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                <Cpu size={32} className="text-[#20B2AA]" />
                Integrations Endpoints
              </h2>
              
              {endpoints.map((ep, i) => (
                <section key={i} id={`${ep.method}-${i}`} className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black tracking-widest ${
                      ep.method === 'GET' ? 'bg-blue-500/10 text-blue-400' :
                      ep.method === 'POST' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-rose-500/10 text-rose-400'
                    }`}>
                      {ep.method}
                    </span>
                    <code className="text-xl font-bold text-white tracking-tight">{ep.path}</code>
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed">{ep.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Parameters */}
                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <h4 className="text-xs font-black uppercase text-[#8B4513] mb-4 tracking-widest">Parameters</h4>
                      <p className="text-sm font-mono text-slate-300">{ep.params}</p>
                    </div>
                    
                    {/* Response */}
                    <div className="p-6 bg-[#1A120E] border border-white/5 rounded-2xl group/resp relative">
                      <h4 className="text-xs font-black uppercase text-[#20B2AA] mb-4 tracking-widest">Response Body</h4>
                      <button 
                        onClick={() => copyToClipboard(ep.response)}
                        className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg opacity-0 group-hover/resp:opacity-100 transition-opacity hover:bg-white/10"
                      >
                        <Copy size={14} />
                      </button>
                      <pre className="text-[13px] font-mono text-emerald-400/90 leading-relaxed overflow-x-auto">
                        {ep.response}
                      </pre>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* Help CTA */}
            <section className="bg-gradient-to-br from-[#8B4513]/20 to-amber-900/10 border border-[#8B4513]/20 p-12 rounded-[48px] text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Can't find what you're looking for? Reach out to our developer support team at <span className="text-[#8B4513] font-bold">work.prakharyadav@gmail.com</span>
              </p>
              <a 
                href="mailto:work.prakharyadav@gmail.com"
                className="inline-block px-8 py-3 bg-[#8B4513] hover:bg-[#5D2E0A] text-white rounded-xl font-black transition-all shadow-xl shadow-amber-900/20"
              >
                Contact Developer Support
              </a>

            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApiDocsPage;
