import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, ArrowRight, LayoutDashboard, List, MessageCircle, Shield, Zap, Globe, Sparkles, CheckCircle, Timer } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPage = () => {
  const [annual, setAnnual] = useState(true);
  const navigate = useNavigate();

  const tiers = [
    {
      name: "Starter Kit",
      description: "Perfect for individuals and small side projects.",
      price: "0",
      features: ["Flow List access", "Basic Huddle chat", "Up to 3 active projects", "Community support"],
      cta: "Start for free",
      highlighted: false,
      buttonClass: "bg-white/5 hover:bg-white/10 text-white border border-white/10"
    },
    {
      name: "Pro Kit",
      description: "Everything you need to get your team in flow.",
      price: annual ? "12" : "15",
      features: ["Stack Board access", "Unlimited projects", "Timesheet & Billing", "Nudge reminders", "Priority support"],
      cta: "Get Pro Now",
      highlighted: true,
      buttonClass: "bg-[#8B4513] hover:bg-[#5D2E0A] text-white shadow-2xl shadow-amber-900/20"
    },
    {
      name: "Scale Kit",
      description: "Advanced controls for growing organizations.",
      price: annual ? "29" : "39",
      features: ["Everything in Pro", "Advanced Kit Settings", "Unlimited attachments", "Custom workflows", "24/7 support"],
      cta: "Contact Sales",
      highlighted: false,
      buttonClass: "bg-white/5 hover:bg-white/10 text-white border border-white/10"
    }
  ];

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
        {/* Core Features Section */}
        <div className="mt-40 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">The tools you need to <span className="text-[#8B4513]">master your flow.</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Click any feature to jump right into the action. We'll handle the rest.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Stack Board", 
                view: "BOARD", 
                desc: "Visual task management for high-performance teams.", 
                icon: LayoutDashboard, 
                color: "text-amber-500", 
                bg: "bg-amber-500/10" 
              },
              { 
                title: "Flow List", 
                view: "LIST", 
                desc: "The fastest way to capture and organize your daily todos.", 
                icon: List, 
                color: "text-[#8B4513]", 
                bg: "bg-[#8B4513]/10" 
              },
              { 
                title: "Huddle Sync", 
                view: "HUDDLE", 
                desc: "Real-time team collaboration without leaving your workspace.", 
                icon: MessageCircle, 
                color: "text-[#20B2AA]", 
                bg: "bg-[#20B2AA]/10" 
              },
              { 
                title: "Timesheet", 
                view: "TIMER", 
                desc: "Professional hours tracking and automated invoicing for teams.", 
                icon: Timer, 
                color: "text-rose-400", 
                bg: "bg-rose-400/10" 
              },
            ].map((feature, i) => (
              <button
                key={i}
                onClick={() => {
                  const isLoggedIn = !!localStorage.getItem('token');
                  if (isLoggedIn) {
                    navigate('/dashboard', { state: { view: feature.view } });
                  } else {
                    navigate('/login', { state: { from: '/dashboard', view: feature.view } });
                  }
                }}
                className="group p-8 bg-white/[0.02] border border-white/5 rounded-[40px] hover:bg-white/[0.05] hover:border-[#8B4513]/30 transition-all duration-500 text-left flex flex-col items-start"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-2xl`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#8B4513] transition-colors">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 flex-grow">{feature.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 group-hover:text-[#20B2AA] transition-colors">
                  Try it now
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Section Integration */}
        <div id="pricing" className="mt-40 max-w-7xl mx-auto px-6 scroll-mt-24">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Sparkles size={14} className="text-[#8B4513]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#8B4513]">Flexible Plans</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
              Simple, transparent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7CCC8] via-amber-200 to-[#20B2AA]">pricing.</span>
            </h2>
            
            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <span className={`text-sm font-bold ${!annual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
              <button 
                onClick={() => setAnnual(!annual)}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-white/5 border border-white/10 transition-colors focus:outline-none"
              >
                <div className={`h-6 w-6 rounded-full bg-[#8B4513] shadow-lg transform transition-transform ${annual ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
              <span className={`text-sm font-bold flex items-center gap-2 ${annual ? 'text-white' : 'text-[#8D6E63]'}`}>
                Annually <span className="text-[10px] text-[#20B2AA] bg-[#20B2AA]/10 px-2 py-0.5 rounded-full border border-[#20B2AA]/20">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {tiers.map((tier, index) => (
              <div key={index} className={`group relative flex flex-col p-10 rounded-[40px] border transition-all duration-500 ${
                tier.highlighted 
                  ? 'bg-[#1A120E] border-[#8B4513]/50 shadow-2xl scale-105 z-10' 
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
              }`}>
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8B4513] text-white text-[10px] font-black uppercase tracking-[0.2em] py-1.5 px-4 rounded-full shadow-xl">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-10 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-sm text-slate-500 h-10 leading-relaxed">{tier.description}</p>
                </div>

                <div className="mb-10 flex flex-col items-center">
                  <div className="flex items-baseline text-white">
                    <span className="text-6xl font-black tracking-tighter">${tier.price}</span>
                    {tier.price !== "0" && <span className="text-slate-500 ml-2 font-bold">/mo</span>}
                  </div>
                </div>

                <div className="space-y-5 mb-10">
                  {tier.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3 text-sm font-medium text-[#D7CCC8]">
                      <CheckCircle size={18} className="text-[#20B2AA] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/register" className={`w-full py-5 px-6 rounded-2xl text-center font-black transition-all active:scale-95 ${tier.buttonClass}`}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>


        </div>

        {/* FAQ Section */}
        <section className="mt-40 mb-32 max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Got questions? <br/><span className="text-[#8B4513]">We've got answers.</span></h2>
            <p className="text-slate-500">Everything you need to know about Flowkit and how it can help your team.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What exactly is Flowkit?",
                a: "Flowkit is an all-in-one productivity workspace designed for high-velocity teams. It combines project management (Stack Board), daily task tracking (Flow List), and real-time collaboration (Huddle) into a single, seamless experience inspired by coffee-shop focus and minimalist design."
              },
              {
                q: "How do I get started with my team?",
                a: "Getting started is easy! Simply sign up for a free account, create your first project, and invite your teammates. You can start using the Flow List immediately for your personal tasks or set up a Stack Board for team projects."
              },
              {
                q: "Is my data safe with Flowkit?",
                a: "Security is our top priority. We use enterprise-grade JWT authentication, industry-standard encryption for all data at rest and in transit, and secure cloud infrastructure to ensure your team's information remains private and protected."
              },
              {
                q: "Can I use Flowkit on multiple devices?",
                a: "Absolutely! Flowkit is built as a fully responsive web application. Whether you're on a desktop, tablet, or smartphone, the interface adapts perfectly to your screen size so you can keep your flow going anywhere."
              },
              {
                q: "What happens if I need more features?",
                a: "We offer flexible plans that grow with your team. Our Pro Kit includes advanced tools like the Timer and Nudge reminders, while the Scale Kit provides enterprise-level controls. You can upgrade or downgrade at any time."
              }
            ].map((faq, i) => {
              const [isOpen, setIsOpen] = React.useState(false);
              return (
                <div key={i} className={`group rounded-[24px] border transition-all duration-500 ${isOpen ? 'bg-[#1A120E] border-[#8B4513]/40 shadow-2xl' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}>
                  <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                  >
                    <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{faq.q}</span>
                    <div className={`p-2 rounded-lg transition-all ${isOpen ? 'bg-[#8B4513] text-white rotate-180' : 'bg-white/5 text-slate-500 group-hover:text-slate-300'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-8 pb-8 text-slate-500 leading-relaxed text-sm">
                      <div className="pt-4 border-t border-white/5">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;

