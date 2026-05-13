import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Briefcase, MapPin, Clock, ArrowUpRight, Sparkles, Coffee, Laptop, Heart } from 'lucide-react';

const CareersPage = () => {
  const jobs = [
    { title: "Senior Product Designer", department: "Design", location: "Remote / London", type: "Full-time", salary: "$120k - $160k" },
    { title: "Full Stack Engineer (React/Spring)", department: "Engineering", location: "Remote / NY", type: "Full-time", salary: "$130k - $180k" },
    { title: "Growth Marketing Manager", department: "Marketing", location: "Remote", type: "Full-time", salary: "$90k - $130k" },
    { title: "Customer Success Lead", department: "Operations", location: "London", type: "Full-time", salary: "$80k - $110k" },
  ];

  const perks = [
    { title: "Work Anywhere", icon: Laptop, description: "We are a remote-first team. Work from wherever you feel most creative." },
    { title: "Unlimited Fuel", icon: Coffee, description: "Monthly stipend for coffee, healthy snacks, and your home office setup." },
    { title: "Full Health", icon: Heart, description: "Comprehensive health, dental, and vision insurance for you and your family." },
    { title: "Growth Fund", icon: Sparkles, description: "$2,500 annual budget for books, courses, and conferences." },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      <main className="relative pt-40 pb-24 px-6">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Briefcase size={14} className="text-blue-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-blue-400">Join the team</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
            Help us build the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">operating system for work.</span>
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
                  <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
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
            <div className="hidden md:block text-xs font-bold tracking-[0.2em] text-blue-400 uppercase">
              {jobs.length} roles available
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div key={idx} className="group p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.05] hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 items-center text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.department}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right hidden sm:block">
                    <p className="text-white font-bold">{job.salary}</p>
                    <p className="text-xs text-slate-600">Annual base + equity</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                    <ArrowUpRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Spontaneous Application */}
          <div className="mt-12 p-8 rounded-[32px] border border-dashed border-white/10 text-center">
            <p className="text-slate-400 mb-4">Don't see a role that fits?</p>
            <button className="text-white font-bold hover:text-blue-400 transition-colors underline underline-offset-8">
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
