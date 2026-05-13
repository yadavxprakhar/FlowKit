import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, LayoutDashboard, List, MessageCircle, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-secondary-light dark:text-text-secondary-dark font-sans transition-colors duration-200">

      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-24">
        {/* Subtle badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary-hover dark:bg-primary/20 dark:text-primary-light text-sm font-semibold mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary"></span>
          Flowkit 2.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark max-w-4xl mb-6">
          Work in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">flow.</span>
        </h1>

        <p className="text-lg md:text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mb-12">
          Flowkit turns tasks, projects, and team chat into one smooth kit. Stop switching contexts and start building momentum.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/register" className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-md shadow-md hover:shadow-lg transition-all text-lg font-medium group">
            Start Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex items-center justify-center gap-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-primary text-text-primary-light dark:text-text-primary-dark px-8 py-4 rounded-md shadow-sm hover:shadow-md transition-all text-lg font-medium">
            <Play size={20} className="text-primary" />
            See Demo (2 min)
          </button>
        </div>

        {/* Feature showcase mockup graphic placeholder */}
        <div className="mt-20 w-full max-w-5xl aspect-video rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-xl overflow-hidden relative group">
          <div className="absolute top-0 w-full h-12 bg-gray-100 dark:bg-gray-800 border-b border-border-light dark:border-border-dark flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="pt-12 p-8 grid grid-cols-3 gap-6 h-full bg-bg-light dark:bg-bg-dark opacity-80">
            <div className="col-span-1 rounded-md border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 flex flex-col gap-3">
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-16 w-full bg-primary-light dark:bg-primary/20 rounded border border-primary/30"></div>
              <div className="h-16 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
              <div className="h-16 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
            </div>
            <div className="col-span-2 rounded-md border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6">
              <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-100 dark:bg-gray-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Problem Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20 border-t border-border-light dark:border-border-dark">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
              The Problem with Work Today
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-warning/20 text-warning p-1 rounded-full"><AlertTriangle size={16} /></div>
                <span className="text-lg text-text-secondary-light dark:text-text-secondary-dark">Too many tools → context switching</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-warning/20 text-warning p-1 rounded-full"><AlertTriangle size={16} /></div>
                <span className="text-lg text-text-secondary-light dark:text-text-secondary-dark">Tasks live in 3 different places</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-warning/20 text-warning p-1 rounded-full"><AlertTriangle size={16} /></div>
                <span className="text-lg text-text-secondary-light dark:text-text-secondary-dark">No single place for the team to sync</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-8 shadow-sm">
            {/* Mockup of a messy desktop */}
            <div className="space-y-4 opacity-50">
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-24 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="w-full bg-surface-light dark:bg-surface-dark py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
              Enter Flowkit
            </h2>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
              We built one unified workspace so you can stop looking for work and start doing it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-success/10 text-success flex items-center justify-center mb-6">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">One Unified App</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">Tasks, projects, chat, and time tracking all in a single source of truth.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <LayoutDashboard size={32} />
              </div>
              <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">Drag-to-move Flow</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">Intuitive interfaces designed to get out of your way and let you work.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <RefreshCw size={32} />
              </div>
              <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">Real-time Sync</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">Everything updates instantly across all your devices and team members.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features (3 cards) */}
      <section className="w-full max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-8 hover:shadow-md transition-shadow group">
            <List size={28} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">Flow List</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Organize tasks that actually move. Keep your personal to-dos focused and actionable.</p>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-8 hover:shadow-md transition-shadow group">
            <LayoutDashboard size={28} className="text-secondary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">Stack Board</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Visual project progress. See exactly where every piece of work stands.</p>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-8 hover:shadow-md transition-shadow group">
            <MessageCircle size={28} className="text-success mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">Huddle</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Quick team updates inside the app. Contextual chat right where the work happens.</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="w-full bg-primary/5 py-24 border-y border-border-light dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-8">
            Used by 12 early teams
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-8 shadow-sm relative overflow-hidden">
              <span className="text-8xl text-primary/10 absolute -top-4 -left-2 font-serif leading-none">"</span>
              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark relative z-10 mb-6 italic pt-4">
                Flowkit completely changed how our remote team operates. We dropped three other subscriptions.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div>
                  <p className="font-bold text-text-primary-light dark:text-text-primary-dark text-sm">Sarah Jenkins</p>
                  <p className="text-xs text-text-muted-light dark:text-text-secondary-dark">Product Lead</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-8 shadow-sm relative overflow-hidden">
              <span className="text-8xl text-primary/10 absolute -top-4 -left-2 font-serif leading-none">"</span>
              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark relative z-10 mb-6 italic pt-4">
                The Stack Board is incredibly fast. Drag-to-move actually feels like native software.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div>
                  <p className="font-bold text-text-primary-light dark:text-text-primary-dark text-sm">David Chen</p>
                  <p className="text-xs text-text-muted-light dark:text-text-secondary-dark">Engineering Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
