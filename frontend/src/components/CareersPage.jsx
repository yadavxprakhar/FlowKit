import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Briefcase, MapPin, Clock, ArrowUpRight, Sparkles, Coffee, Laptop, Heart } from 'lucide-react';

const CareersPage = () => {
  const jobs = []; // Roles are coming soon

  const perks = [
    { title: "Work Anywhere", icon: Laptop, description: "We are a remote-first team. Work from wherever you feel most creative." },
    { title: "Unlimited Fuel", icon: Coffee, description: "Monthly stipend for coffee, healthy snacks, and your home office setup." },
    { title: "Full Health", icon: Heart, description: "Comprehensive health, dental, and vision insurance for you and your family." },
    { title: "Growth Fund", icon: Sparkles, description: "$2,500 annual budget for books, courses, and conferences." },
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
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Briefcase size={14} className="text-[#8B4513]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#8B4513]">Join the team</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
            Help us build the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7CCC8] via-amber-200 to-[#20B2AA]">operating system for work.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            We're a small, high-velocity team of designers and engineers on a mission to reclaim human focus. Join us in building the next generation of productivity tools.
          </p>
        </section>

        {/* Perks Section */}
        <section className="max-w-7xl mx-auto mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div key={idx} className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.04] transition-colors">
                  <div className="w-12 h-12 bg-[#8B4513]/10 rounded-xl flex items-center justify-center text-[#8B4513] mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{perk.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{perk.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Open Roles */}
        <section className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Open Positions</h2>
              <p className="text-slate-500">Currently hiring across all departments.</p>
            </div>
            <div className="hidden md:block text-xs font-bold tracking-[0.2em] text-[#20B2AA] uppercase">
              {jobs.length} roles available
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-12 md:p-20 bg-white/[0.02] border border-dashed border-white/10 rounded-[48px] flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#8B4513]/10 rounded-2xl flex items-center justify-center text-[#8B4513] mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Roles Coming Soon</h3>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                We're currently scaling our internal teams. New positions in Engineering, Design, and Marketing will be posted here soon.
              </p>
              <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-[#8B4513]/5 border border-[#8B4513]/20 rounded-full">
                <span className="flex h-2 w-2 rounded-full bg-[#8B4513] animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513]">Stay Tuned</span>
              </div>
            </div>
          </div>

          {/* Spontaneous Application */}
          <div className="mt-12 p-8 rounded-[32px] border border-dashed border-white/10 text-center">
            <p className="text-slate-400 mb-4">Don't see a role that fits?</p>
            <button className="text-white font-bold hover:text-[#20B2AA] transition-colors underline underline-offset-8">
              Send us a spontaneous application
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;
