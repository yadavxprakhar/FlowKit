import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Mail, MessageSquare, Phone, Globe, Send, Sparkles } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#0F0906] text-[#D7CCC8] font-sans selection:bg-[#8B4513]/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8B4513]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#20B2AA]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      <main className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left Side: Info */}
            <div className="space-y-12">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                  <MessageSquare size={14} className="text-[#8B4513]" />
                  <span className="text-xs font-bold tracking-widest uppercase text-[#8B4513]">Get in touch</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
                  Let's start a <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7CCC8] via-amber-200 to-[#20B2AA]">conversation.</span>
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                  Have a question about Flowkit? We're here to help. Send us a message and we'll respond as soon as we can.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-6 rounded-[28px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <Mail className="text-[#8B4513] mb-4" size={24} />
                  <h3 className="text-white font-bold mb-1">Email Support</h3>
                  <p className="text-sm text-[#8D6E63]">work.prakharyadav@gmail.com</p>
                </div>
                <div className="p-6 rounded-[28px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <Globe className="text-[#20B2AA] mb-4" size={24} />
                  <h3 className="text-white font-bold mb-1">Community</h3>
                  <p className="text-sm text-[#8D6E63]">Join our forum</p>
                </div>
                <div className="p-6 rounded-[28px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <Phone className="text-amber-600 mb-4" size={24} />
                  <h3 className="text-white font-bold mb-1">Phone</h3>
                  <p className="text-sm text-[#8D6E63]">+1 (555) 000-0000</p>
                </div>
                <div className="p-6 rounded-[28px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <Globe className="text-[#20B2AA] mb-4" size={24} />
                  <h3 className="text-white font-bold mb-1">Office</h3>
                  <p className="text-sm text-[#8D6E63]">Delhi, India</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  Twitter
                </button>
                <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  GitHub
                </button>
                <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8B4513]/20 to-[#20B2AA]/20 rounded-[48px] blur-2xl opacity-50"></div>
              <div className="relative bg-[#1A120E] border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                    <select className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none">
                      <option>General Inquiry</option>
                      <option>Sales</option>
                      <option>Support</option>
                      <option>Press</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                    <textarea 
                      rows="5"
                      placeholder="How can we help you?"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button className="w-full group relative py-5 bg-[#8B4513] hover:bg-[#5D2E0A] text-white rounded-2xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-amber-900/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  <p className="text-center text-xs text-slate-600">
                    By submitting this form, you agree to our <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
