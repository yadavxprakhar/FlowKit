import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Phone, ArrowRight, Loader2 } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { motion, AnimatePresence } from 'framer-motion';

const FacebookIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Login = () => {

  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      // In a real app, you'd send either email or phone depending on loginMethod
      const identifier = loginMethod === 'email' ? formData.email : formData.phone;
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
        email: identifier, // Assuming backend handles both or adjust accordingly
        password: formData.password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', identifier);
      navigate('/', { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please check your information and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform) => {
    console.log(`Logging in with ${platform}`);
    // Implement social login logic here
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your Flowkit workspace"
    >
      {/* Social Login Section */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <button
          onClick={() => handleSocialLogin('facebook')}
          className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-2xl transition-all duration-300 group"
        >
          <div className="bg-[#1877F2] p-1.5 rounded-lg">
            <FacebookIcon size={18} fill="white" />
          </div>
          <span>Continue with Facebook</span>
        </button>
      </div>

      <div className="relative flex items-center mb-8">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="flex-shrink mx-4 text-slate-500 text-sm font-medium uppercase tracking-wider">or sign in with</span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>

      {/* Login Method Toggle */}
      <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl mb-8">
        <button
          onClick={() => setLoginMethod('email')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            loginMethod === 'email' 
              ? 'bg-gradient-to-r from-[#8B4513] to-amber-700 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Email
        </button>
        <button
          onClick={() => setLoginMethod('phone')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            loginMethod === 'phone' 
              ? 'bg-gradient-to-r from-[#8B4513] to-amber-700 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Phone
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <AnimatePresence mode="wait">
          {loginMethod === 'email' ? (
            <motion.div
              key="email-input"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required={loginMethod === 'email'}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="phone-input"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="phone">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Phone size={20} />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required={loginMethod === 'phone'}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="password">
              Password
            </label>
            <a href="#" className="text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium">
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <Lock size={20} />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-2xl flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            {error}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#8B4513] to-amber-700 hover:from-[#5D2E0A] hover:to-amber-600 text-white font-bold py-4 px-4 rounded-2xl shadow-xl shadow-amber-900/20 flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-slate-400 font-medium">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
            Get Started
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;


