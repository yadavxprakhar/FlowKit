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
  ArrowRight
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const FeaturesPage = () => {
  const features = [
    { name: "Task list", flowkitName: "Flow List", shortLabel: "List", icon: List, color: "text-primary", bg: "bg-primary/10" },
    { name: "Project board", flowkitName: "Stack Board", shortLabel: "Board", icon: LayoutDashboard, color: "text-secondary", bg: "bg-secondary/10" },
    { name: "Team chat", flowkitName: "Huddle", shortLabel: "Chat", icon: MessageCircle, color: "text-success", bg: "bg-success/10" },
    { name: "Overdue reminder", flowkitName: "Nudge", shortLabel: "Nudge", icon: Bell, color: "text-warning", bg: "bg-warning/10" },
    { name: "Time tracking", flowkitName: "Timer", shortLabel: "Time", icon: Timer, color: "text-info", bg: "bg-info/10" },
    { name: "File attach", flowkitName: "Clip", shortLabel: "Clip", icon: Paperclip, color: "text-text-secondary-light dark:text-text-secondary-dark", bg: "bg-gray-100 dark:bg-gray-800" },
    { name: "Calendar view", flowkitName: "Schedule", shortLabel: "Calendar", icon: Calendar, color: "text-primary", bg: "bg-primary/10" },
    { name: "Settings", flowkitName: "Kit Settings", shortLabel: "Settings", icon: Settings, color: "text-text-secondary-light dark:text-text-secondary-dark", bg: "bg-gray-100 dark:bg-gray-800" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-secondary-light dark:text-text-secondary-dark font-sans transition-colors duration-200">
      
      <Navbar />

      {/* Header */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            Everything you need. <br className="hidden md:block"/> Nothing you don't.
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            Flowkit brings the best tools together using a simple, unified design language we call the Kit. 
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 hover:shadow-md transition-all group flex flex-col items-start">
                <div className={`w-12 h-12 rounded-lg ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent size={24} />
                </div>
                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark block mb-1">
                    {feature.name}
                  </span>
                  <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    {feature.flowkitName}
                  </h3>
                </div>
                <div className="mt-auto pt-4 border-t border-border-light dark:border-border-dark w-full flex justify-between items-center text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                  <span>Label: {feature.shortLabel}</span>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
