import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Target, Heart, Zap, Shield } from 'lucide-react';

const AboutPage = () => {
  const values = [
    { title: "Simplicity First", description: "We believe software should get out of your way. We remove clutter so you can focus on the work itself.", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Built for Flow", description: "Every interaction is designed to minimize context switching and keep your team in a state of deep work.", icon: Target, color: "text-primary", bg: "bg-primary/10" },
    { title: "Radical Transparency", description: "No hidden pricing, no dark patterns. We build trust by being open about our roadmap and decisions.", icon: Shield, color: "text-success", bg: "bg-success/10" },
    { title: "Human Centric", description: "We design for people, not robots. Our tools adapt to how humans actually think and collaborate.", icon: Heart, color: "text-red-500", bg: "bg-red-500/10" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-text-secondary-light dark:text-text-secondary-dark font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
            We are building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">future of focus.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
            Flowkit started with a simple observation: modern teams use so many tools to stay productive that they end up losing hours a day just managing the tools themselves. We decided to fix that.
          </p>
        </section>

        {/* The Story */}
        <section className="bg-surface-light dark:bg-surface-dark border-y border-border-light dark:border-border-dark py-24 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">Our Story</h2>
              <p className="mb-4 leading-relaxed">
                Back in 2023, our founding team was struggling. We were paying for a task manager, a project board, a team chat app, and a time tracker. Not only was it expensive, but the constant context switching was destroying our ability to do deep, meaningful work.
              </p>
              <p className="leading-relaxed">
                We built Flowkit as an internal tool to solve our own problem. When other teams saw how fast we were moving, they asked for access. Today, Flowkit powers thousands of teams who want to stop managing work and start doing it.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl bg-gray-200 dark:bg-gray-800 overflow-hidden shadow-lg border border-border-light dark:border-border-dark flex items-center justify-center">
               <span className="text-gray-400 dark:text-gray-600 font-medium tracking-widest uppercase">Office Photo Placeholder</span>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">Our Core Values</h2>
            <p className="text-lg max-w-2xl mx-auto">These are the principles that guide every decision we make, from product design to customer support.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl ${value.bg} ${value.color} flex items-center justify-center mb-6`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">{value.title}</h3>
                  <p className="text-sm">{value.description}</p>
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

export default AboutPage;
