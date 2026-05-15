import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { motion } from 'framer-motion';

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

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', formData.email);
      navigate('/', { replace: true });
    } catch (err) {
      setError('Registration failed. This email might already be in use.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform) => {
    if (platform === 'facebook') {
      window.FB.login((response) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          setIsLoading(true);
          axios.post('http://localhost:8080/api/v1/auth/facebook', { accessToken })
            .then(res => {
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('userEmail', 'Facebook User');
              navigate('/', { replace: true });
            })
            .catch(err => {
              setError('Facebook authentication failed. Please try again.');
            })
            .finally(() => setIsLoading(false));
        } else {
          setError('Facebook registration cancelled.');
        }
      }, { scope: 'email,public_profile' });
    }
  };

  // Initialize Facebook SDK
  React.useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : import.meta.env.VITE_FACEBOOK_APP_ID, 
        cookie     : true,
        xfbml      : true,
        version    : 'v18.0'
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join thousands of teams using Flowkit"
    >
      {/* Social Register Section */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <button
          onClick={() => handleSocialLogin('facebook')}
          className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-2xl transition-all duration-300 group"
        >
          <div className="bg-[#1877F2] p-1.5 rounded-lg">
            <FacebookIcon size={18} fill="white" />
          </div>
          <span>Sign up with Facebook</span>
        </button>
      </div>

      <div className="relative flex items-center mb-8">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="flex-shrink mx-4 text-slate-500 text-sm font-medium uppercase tracking-wider">or register with</span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="name">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <User size={20} />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
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
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <Lock size={20} />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
              placeholder="Min. 8 characters"
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
          className="w-full bg-gradient-to-r from-[#8B4513] to-amber-700 hover:from-[#5D2E0A] hover:to-amber-600 text-white font-bold py-4 px-4 rounded-2xl shadow-xl shadow-amber-900/20 flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-slate-400 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;

