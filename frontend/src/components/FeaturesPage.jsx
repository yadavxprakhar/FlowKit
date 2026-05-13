import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  List, 
  MessageCircle, 
  Bell, 
  Timer, 
  Paperclip, 
  Calendar, 
  Settings,
  ArrowRight,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const FeaturesPage = () => {
  const features = [
    { name: "Task list", flowkitName: "Flow List", description: "Minimalist task management designed for high focus.", icon: List, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Project board", flowkitName: "Stack Board", description: "Visual kanban boards that make progress obvious.", icon: LayoutDashboard, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { name: "Team chat", flowkitName: "Huddle", description: "Contextual team communication built into your tasks.", icon: MessageCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "Overdue reminder", flowkitName: "Nudge", description: "Smart notifications that help you stay on track.", icon: Bell, color: "text-amber-500", bg: "bg-amber-500/10" },
    { name: "Time tracking", flowkitName: "Timer", description: "Sub-millisecond time tracking for accurate billing.", icon: Timer, color: "text-rose-500", bg: "bg-rose-500/10" },
    { name: "File attach", flowkitName: "Clip", description: "Secure file sharing and versioning for every project.", icon: Paperclip, color: "text-slate-400", bg: "bg-slate-400/10" },
    { name: "Calendar view", flowkitName: "Schedule", description: "Visual timeline of your team's velocity and goals.", icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Settings", flowkitName: "Kit Settings", description: "Powerful customization to make Flowkit truly yours.", icon: Settings, color: "text-slate-400", bg: "bg-slate-400/10" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      <main className="relative pt-40 pb-24 px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Layers size={14} className="text-blue-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-blue-400">The Power of Kit</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Everything you need. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Nothing you don't.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Flowkit brings the best tools together using a simple, unified design language. Stop fighting your tools and start building.
          </p>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="group p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col items-start">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-2xl`}>
                  <IconComponent size={28} />
                </div>
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 block mb-2">
                    {feature.name}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
                    {feature.flowkitName}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5 w-full flex justify-between items-center group/btn">
                  <span className="text-xs font-bold text-slate-600 group-hover:text-blue-400 transition-colors">Learn more</span>
                  <ArrowRight size={16} className="text-slate-700 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Callout */}
        <section className="mt-40 max-w-5xl mx-auto relative overflow-hidden rounded-[48px] bg-gradient-to-br from-blue-600/20 to-indigo-700/20 border border-white/10 p-12 md:p-20 text-center backdrop-blur-xl">
          <Sparkles className="absolute top-10 right-10 text-blue-500/10" size={120} />
          <Zap className="text-blue-500 mb-8 mx-auto" size={48} />
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Need even more power?</h2>
          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">Flowkit integrates with all your favorite tools—Slack, GitHub, Figma, and more.</p>
          <Link to="/integrations" className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/20">
            Explore Integrations
            <ArrowRight size={20} />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;

