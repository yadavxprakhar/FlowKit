import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, CheckCircle } from 'lucide-react';
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
      buttonClass: "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark hover:border-primary dark:hover:border-primary"
    },
    {
      name: "Pro Kit",
      description: "Everything you need to get your team in flow.",
      price: annual ? "12" : "15",
      features: ["Stack Board access", "Unlimited projects", "Timer & Time tracking", "Nudge reminders", "Priority email support"],
      cta: "Get Pro",
      highlighted: true,
      buttonClass: "bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg"
    },
    {
      name: "Scale Kit",
      description: "Advanced controls for growing organizations.",
      price: annual ? "29" : "39",
      features: ["Everything in Pro", "Advanced Kit Settings", "Unlimited file attachments", "Custom workflows", "24/7 dedicated support"],
      cta: "Contact Sales",
      highlighted: false,
      buttonClass: "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark hover:border-primary dark:hover:border-primary"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-secondary-light dark:text-text-secondary-dark font-sans transition-colors duration-200">
      
      <Navbar />

      {/* Header */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto mb-10">
            No hidden fees. No surprise charges. Just the tools you need to do your best work.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!annual ? 'text-text-primary-light dark:text-text-primary-dark' : 'text-text-muted-light dark:text-text-muted-dark'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${annual ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium flex items-center gap-2 ${annual ? 'text-text-primary-light dark:text-text-primary-dark' : 'text-text-muted-light dark:text-text-muted-dark'}`}>
              Annually <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div key={index} className={`relative flex flex-col p-8 rounded-2xl bg-surface-light dark:bg-surface-dark border ${tier.highlighted ? 'border-primary shadow-xl ring-1 ring-primary/50 scale-105 z-10' : 'border-border-light dark:border-border-dark shadow-md'}`}>
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">{tier.name}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark h-10">{tier.description}</p>
              </div>

              <div className="mb-8 flex items-baseline text-text-primary-light dark:text-text-primary-dark">
                <span className="text-5xl font-bold tracking-tight">${tier.price}</span>
                {tier.price !== "0" && <span className="text-text-muted-light ml-1 font-medium">/mo</span>}
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    <CheckCircle size={18} className="text-success shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register" className={`w-full py-3 px-4 rounded-lg text-center font-medium transition-all ${tier.buttonClass}`}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
