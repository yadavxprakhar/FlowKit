import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, LayoutDashboard, List, MessageCircle, Shield, Zap, Globe, MousePointer2, Sparkles, CheckCircle2 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-blue-400">Flowkit 2.0 is live</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Work at the speed <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">of thought.</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Flowkit is the unified workspace for high-velocity teams. Combine tasks, docs, and team chat into one seamless experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Link to="/register" className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-lg font-bold shadow-2xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="flex items-center gap-2">
                Get Started Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-lg font-bold backdrop-blur-xl transition-all hover:border-white/20">
              <Play size={20} className="fill-blue-500 text-blue-500" />
              Watch Demo
            </button>
          </div>

          {/* Premium Mockup */}
          <div className="mt-24 w-full relative group animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[32px] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70"></div>
            <div className="relative bg-[#0f172a] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden aspect-[16/10] md:aspect-[16/8]">
              {/* Fake UI Header */}
              <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-6 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
                <div className="w-1/3 h-6 bg-white/5 rounded-lg border border-white/5"></div>
                <div className="w-12"></div>
              </div>
              {/* Fake UI Body */}
              <div className="p-8 grid grid-cols-12 gap-8 h-full">
                <div className="col-span-3 space-y-4">
                  <div className="h-8 w-full bg-white/5 rounded-xl"></div>
                  <div className="h-40 w-full bg-blue-600/10 border border-blue-500/20 rounded-2xl"></div>
                  <div className="h-24 w-full bg-white/5 rounded-2xl"></div>
                </div>
                <div className="col-span-9 space-y-6">
                  <div className="h-12 w-1/2 bg-white/5 rounded-2xl"></div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="h-64 bg-white/5 border border-white/5 rounded-3xl p-6">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl mb-4"></div>
                      <div className="h-4 w-full bg-white/10 rounded-lg mb-2"></div>
                      <div className="h-4 w-2/3 bg-white/10 rounded-lg"></div>
                    </div>
                    <div className="h-64 bg-white/5 border border-white/5 rounded-3xl p-6">
                      <div className="w-12 h-12 bg-indigo-600 rounded-2xl mb-4"></div>
                      <div className="h-4 w-full bg-white/10 rounded-lg mb-2"></div>
                      <div className="h-4 w-2/3 bg-white/10 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Built for elite performance.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Every pixel designed to help you move faster and stay focused on what matters most.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant Velocity</h3>
              <p className="text-slate-500 leading-relaxed">No loading spinners. No friction. Flowkit is built on a high-performance engine for sub-millisecond response times.</p>
            </div>

            <div className="group p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
              <div className="w-14 h-14 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500 mb-8 group-hover:scale-110 transition-transform">
                <Shield size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Bank-Level Security</h3>
              <p className="text-slate-500 leading-relaxed">End-to-end encryption for all your tasks and team communication. Your data stays yours, always.</p>
            </div>

            <div className="group p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
              <div className="w-14 h-14 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Sync</h3>
              <p className="text-slate-500 leading-relaxed">Sync across all devices in real-time. Whether you're on mobile or desktop, your flow is never interrupted.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-16 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20 items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="text-sm font-bold tracking-[0.3em]">APPLE</div>
          <div className="text-sm font-bold tracking-[0.3em]">DISNEY</div>
          <div className="text-sm font-bold tracking-[0.3em]">NOTION</div>
          <div className="text-sm font-bold tracking-[0.3em]">VERCEL</div>
          <div className="text-sm font-bold tracking-[0.3em]">STRIPE</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[48px] bg-gradient-to-br from-blue-600 to-indigo-700 p-12 md:p-20 text-center">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles size={200} className="text-white" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to enter flow?</h2>
          <p className="text-blue-100 text-xl mb-12 max-w-xl mx-auto">Join 10,000+ teams who have reclaimed their productivity with Flowkit.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-10 py-5 bg-white text-blue-600 rounded-2xl text-xl font-black shadow-2xl transition-all hover:scale-105 active:scale-95">
              Start Free Trial
            </Link>
            <button className="px-10 py-5 bg-blue-500/20 border border-white/20 text-white rounded-2xl text-xl font-black backdrop-blur-md transition-all hover:bg-blue-500/30">
              Contact Sales
            </button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-blue-200 text-sm font-bold">
            <div className="flex items-center gap-2"><CheckCircle2 size={16} /> No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} /> 14-day free trial</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

