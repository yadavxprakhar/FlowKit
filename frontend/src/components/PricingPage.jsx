import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, Sparkles } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const PricingPage = () => {
  const [annual, setAnnual] = useState(true);

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
      features: ["Stack Board access", "Unlimited projects", "Timer & Time tracking", "Nudge reminders", "Priority support"],
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

      <main className="relative pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Sparkles size={14} className="text-[#8B4513]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#8B4513]">Flexible Plans</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Simple, transparent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7CCC8] via-amber-200 to-[#20B2AA]">pricing.</span>
          </h1>
          
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

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
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

        {/* FAQ Section Placeholder */}
        <div className="mt-40 text-center">
          <Shield className="text-[#8B4513]/20 mx-auto mb-6" size={48} />
          <p className="text-slate-500 font-bold mb-2">Secure Payments</p>
          <p className="text-xs text-slate-600">Encrypted by Stripe. Cancel anytime.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;

