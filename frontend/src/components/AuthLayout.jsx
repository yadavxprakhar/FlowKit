import React from 'react';
import { motion } from 'framer-motion';
import authBg from '../assets/auth-bg.png';
import logo from '../assets/logo.png';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex bg-[#0F0906] overflow-hidden font-sans relative">
      {/* Background with Image and Overlay */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src={authBg} 
          alt="Premium Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F0906]"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 max-w-lg"
          >
            <div className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-2xl overflow-hidden p-4">
              <img src={logo} alt="Flowkit" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Manage your team like <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#8B4513]">never before.</span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              Experience the next generation of task management. Elegant, fast, and built for modern teams.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Animated Orbs for Mobile Background */}
        <div className="lg:hidden absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8B4513]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="lg:hidden absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#20B2AA]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>


        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[450px] z-10"
        >
          <div className="lg:hidden mb-8 flex justify-center">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden p-3">
              <img src={logo} alt="Flowkit" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">{title}</h1>
            <p className="text-slate-400 text-lg">{subtitle}</p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
