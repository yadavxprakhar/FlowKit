import React from 'react';
import { User, LogOut, UserPlus, Settings, ExternalLink, Shield } from 'lucide-react';

const UserMenu = ({ isOpen, onClose, onLogout, onProfileClick, onAddAccountClick, onSecurityClick, theme }) => {
  const [avatarUrl, setAvatarUrl] = React.useState(localStorage.getItem('userAvatar'));

  React.useEffect(() => {
    const updateAvatar = () => setAvatarUrl(localStorage.getItem('userAvatar'));
    window.addEventListener('avatarUpdate', updateAvatar);
    return () => window.removeEventListener('avatarUpdate', updateAvatar);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-4 w-72 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
      <div className={`backdrop-blur-3xl border rounded-[28px] shadow-2xl overflow-hidden ${
        theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-[#1A120E]/90 border-white/10'
      }`}>
        {/* Header */}
        <div className={`p-5 border-b flex items-center gap-4 ${theme === 'light' ? 'border-slate-100 bg-slate-50/50' : 'border-white/5 bg-white/5'}`}>
          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-tr from-[#8B4513] to-amber-900 flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {avatarUrl ? (
              <img src={`http://localhost:8080${avatarUrl}`} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              "P"
            )}
          </div>
          <div className="overflow-hidden">
            <h4 className={`text-sm font-bold truncate ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Prakhar</h4>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest truncate">Pro Member</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-3 space-y-1">
          <button 
            onClick={() => {
              onProfileClick();
              onClose();
            }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
            theme === 'light' ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/5'
          }`}>
            <div className="flex items-center gap-3">
              <User size={18} className="text-[#8B4513]" />
              <span className="text-sm font-bold">My Profile</span>
            </div>
            <ExternalLink size={14} className="text-slate-500" />
          </button>

          <button 
            onClick={() => {
              onAddAccountClick();
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            theme === 'light' ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/5'
          }`}>
            <UserPlus size={18} className="text-[#20B2AA]" />
            <span className="text-sm font-bold">Add Account</span>
          </button>

          <button 
            onClick={() => {
              onSecurityClick();
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            theme === 'light' ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/5'
          }`}>
            <Shield size={18} className="text-amber-600" />
            <span className="text-sm font-bold">Account Security</span>
          </button>
        </div>

        {/* Logout Section */}
        <div className={`p-3 border-t ${theme === 'light' ? 'border-slate-100' : 'border-white/5'}`}>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            <span className="text-sm font-bold">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
