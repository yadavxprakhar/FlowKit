import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, LayoutDashboard, List, MessageCircle, Shield, Zap, Globe, Sparkles, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0F0906] text-[#D7CCC8] font-sans selection:bg-[#8B4513]/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8B4513]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#20B2AA]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-[#8B4513] animate-ping"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#8B4513]">Flowkit 2.0 is live</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Work at the speed <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7CCC8] via-amber-200 to-[#20B2AA]">of thought.</span>
          </h1>

          <p className="text-xl text-[#8D6E63] max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Flowkit is the unified workspace for high-velocity teams. Combine tasks, docs, and team chat into one seamless experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Link to="/register" className="group relative px-8 py-4 bg-[#8B4513] hover:bg-[#5D2E0A] text-white rounded-2xl text-lg font-bold shadow-2xl shadow-amber-900/20 transition-all hover:scale-105 active:scale-95 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="flex items-center gap-2">
                Get Started Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-lg font-bold backdrop-blur-xl transition-all hover:border-white/20">
              <Play size={20} className="fill-[#8B4513] text-[#8B4513]" />
              Watch Demo
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;

