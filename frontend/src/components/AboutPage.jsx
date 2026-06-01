import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AboutBackground from './AboutBackground';
import { Target, Heart, Zap, Shield, Users, Sparkles } from 'lucide-react';

const AboutPage = () => {
  const values = [
    { title: "Simplicity First", description: "We believe software should get out of your way. We remove clutter so you can focus on the work itself.", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Built for Flow", description: "Every interaction is designed to minimize context switching and keep your team in a state of deep work.", icon: Target, color: "text-[#8B4513]", bg: "bg-[#8B4513]/10" },
    { title: "Radical Transparency", description: "No hidden pricing, no dark patterns. We build trust by being open about our roadmap and decisions.", icon: Shield, color: "text-[#20B2AA]", bg: "bg-[#20B2AA]/10" },
    { title: "Human Centric", description: "We design for people, not robots. Our tools adapt to how humans actually think and collaborate.", icon: Heart, color: "text-rose-500", bg: "bg-rose-500/10" }
  ];

  return (
    <div className="min-h-screen bg-[#0F0906] text-[#D7CCC8] font-sans selection:bg-[#8B4513]/30 overflow-x-hidden relative">
      {/* Dynamic Animated Concentric Orbits Background */}
      <AboutBackground />

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
            <Zap size={14} className="text-[#8B4513]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#8B4513]">Our Mission</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            We are building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7CCC8] via-amber-200 to-[#20B2AA]">future of focus.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Flowkit started with a simple observation: modern teams use so many tools to stay productive that they end up losing hours a day just managing the tools themselves. We decided to fix that.
          </p>
        </section>

        {/* The Story */}
        <section className="max-w-6xl mx-auto mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#8B4513]/20 to-[#20B2AA]/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative h-[450px] rounded-[32px] bg-[#1A120E] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-slate-500">
                  <Users size={64} className="opacity-20" />
                  <span className="text-xs font-bold tracking-[0.3em] uppercase">The Team</span>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white tracking-tight">Our Story</h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Back in 2023, our founding team was struggling. We were paying for a task manager, a project board, a team chat app, and a time tracker. Not only was it expensive, but the constant context switching was destroying our ability to do deep, meaningful work.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                We built Flowkit as an internal tool to solve our own problem. When other teams saw how fast we were moving, they asked for access. Today, Flowkit powers thousands of teams who want to stop managing work and start doing it.
              </p>
              <div className="pt-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl">
                  <div className="w-12 h-12 rounded-xl bg-[#8B4513] flex items-center justify-center text-white font-bold">P</div>
                  <div>
                    <p className="text-white font-bold">Prakhar</p>
                    <p className="text-xs text-slate-500">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Our Core Values</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">These are the principles that guide every decision we make, from product design to customer support.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <div key={idx} className="group p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
                  <div className={`w-14 h-14 ${value.bg} ${value.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{value.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-40 text-center relative overflow-hidden rounded-[48px] bg-gradient-to-br from-amber-900/40 to-[#8B4513]/40 border border-white/10 p-20 backdrop-blur-xl">
          <Sparkles className="absolute top-10 right-10 text-[#8B4513]/20" size={120} />
          <h2 className="text-4xl font-black text-white mb-6">Join the movement.</h2>
          <p className="text-lg text-[#D7CCC8] mb-10 max-w-xl mx-auto">We're always looking for brilliant minds to help us redefine productivity.</p>
          <button className="px-10 py-4 bg-white text-[#2D1E15] rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl">
            See Open Roles
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

