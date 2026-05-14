import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { X, User, Bell, Lock, Globe, Shield, Moon, Sun, Monitor, Camera, Loader2 } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, theme, setTheme, initialTab = 'profile' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [localTheme, setLocalTheme] = useState(theme);
  const [isUploading, setIsUploading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('token');

  const handleUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/profile-picture', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfilePic(response.data);
      localStorage.setItem('userAvatar', response.data);
      // Trigger a window event to update other components
      window.dispatchEvent(new Event('avatarUpdate'));
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) setProfilePic(savedAvatar);
  }, []);

  if (!isOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <Monitor size={18} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className={`absolute inset-0 backdrop-blur-md ${theme === 'light' ? 'bg-slate-900/20' : 'bg-[#0F0906]/80'}`} onClick={onClose}></div>
      
      <div className={`relative border w-full max-w-4xl h-[600px] rounded-[32px] shadow-2xl flex overflow-hidden animate-in fade-in zoom-in duration-200 ${
        theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#1A120E]/90 border-white/10 backdrop-blur-3xl'
      }`}>
        {/* Sidebar */}
        <div className={`w-64 border-r p-6 flex flex-col gap-2 ${theme === 'light' ? 'border-slate-100 bg-slate-50/50' : 'border-white/5'}`}>
          <h2 className={`text-xl font-bold mb-6 px-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Settings</h2>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#8B4513] text-white shadow-lg shadow-amber-900/20' 
                  : theme === 'light' 
                    ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          <div className="mt-auto">
            <div className={`rounded-2xl p-4 border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-white/5 border-white/5'}`}>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Workspace Plan</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Flowkit Pro</span>
                <span className="text-[10px] bg-[#8B4513] text-white px-2 py-0.5 rounded-full">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className={`p-6 border-b flex items-center justify-between ${theme === 'light' ? 'border-slate-100 bg-white' : 'border-white/5 bg-white/[0.02]'}`}>
            <h3 className={`text-lg font-bold capitalize ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{activeTab} Settings</h3>
            <button onClick={onClose} className={`p-2 rounded-xl transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-white/5 text-slate-400'}`}>
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-white/5 bg-gradient-to-tr from-[#8B4513] to-amber-900 shadow-xl flex items-center justify-center">
                      {profilePic ? (
                        <img src={`http://localhost:8080${profilePic}`} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-3xl font-bold">P</span>
                      )}
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <Loader2 className="text-white animate-spin" size={24} />
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 p-2 bg-[#8B4513] rounded-xl text-white shadow-lg shadow-amber-900/30 hover:scale-110 transition-all active:scale-95">
                      <Camera size={14} />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleUpload(e.target.files[0])}
                    />
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold mb-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Your Avatar</h4>
                    <p className="text-xs text-slate-500 font-medium">Click the camera to upload a new profile picture</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input type="text" className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 ${
                      theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'
                    }`} defaultValue="Prakhar" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                    <input type="email" className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                      theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-400' : 'bg-white/5 border-white/10 text-slate-400'
                    }`} defaultValue="prakhar@example.com" disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bio</label>
                  <textarea className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 h-24 resize-none ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'
                  }`} placeholder="Tell us about yourself..."></textarea>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className={`rounded-2xl p-6 border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'} flex items-center justify-between`}>
                  <div>
                    <h4 className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Theme Preference</h4>
                    <p className="text-xs text-slate-500 font-medium">Select how Flowkit looks to you</p>
                  </div>
                  <div className={`p-1 rounded-xl ${theme === 'light' ? 'bg-slate-200/50' : 'bg-black/20'}`}>
                    <button 
                      onClick={() => setLocalTheme('dark')}
                      className={`p-2 rounded-lg transition-all ${localTheme === 'dark' ? 'bg-[#8B4513] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                      <Moon size={16} />
                    </button>
                    <button 
                      onClick={() => setLocalTheme('light')}
                      className={`p-2 rounded-lg transition-all ${localTheme === 'light' ? 'bg-[#8B4513] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                      <Sun size={16} />
                    </button>
                    <button 
                      onClick={() => setLocalTheme('system')}
                      className={`p-2 rounded-lg transition-all ${localTheme === 'system' ? 'bg-[#8B4513] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                      <Monitor size={16} />
                    </button>
                  </div>
                </div>

                <div className={`rounded-2xl p-6 border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'} flex items-center justify-between`}>
                  <div>
                    <h4 className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Language</h4>
                    <p className="text-xs text-slate-500 font-medium">System default language</p>
                  </div>
                  <button className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold ${
                    theme === 'light' ? 'bg-white border-slate-200 text-slate-700' : 'bg-white/5 border-white/10 text-white'
                  }`}>
                    <Globe size={14} />
                    English (US)
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className={`rounded-2xl p-6 border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'} space-y-4`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Email Notifications</h4>
                      <p className="text-xs text-slate-500 font-medium">Receive daily summaries and task updates</p>
                    </div>
                    <div className="w-12 h-6 bg-[#8B4513] rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className={`h-px w-full ${theme === 'light' ? 'bg-slate-200' : 'bg-white/5'}`}></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Desktop Alerts</h4>
                      <p className="text-xs text-slate-500 font-medium">Real-time push notifications for mentions</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative cursor-pointer ${theme === 'light' ? 'bg-slate-200' : 'bg-white/10'}`}>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className={`h-px w-full ${theme === 'light' ? 'bg-slate-200' : 'bg-white/5'}`}></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Huddle Mentions</h4>
                      <p className="text-xs text-slate-500 font-medium">Notify when someone tags you in a chat</p>
                    </div>
                    <div className="w-12 h-6 bg-[#8B4513] rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[10px] mb-4 text-slate-500">Change Password</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Password</label>
                      <input type="password" placeholder="••••••••" className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 ${
                        theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'
                      }`} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">New Password</label>
                        <input type="password" placeholder="••••••••" className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 ${
                          theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'
                        }`} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 ${
                          theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`h-px w-full ${theme === 'light' ? 'bg-slate-200' : 'bg-white/5'}`}></div>

                <div className={`border rounded-2xl p-6 flex items-center justify-between ${theme === 'light' ? 'bg-amber-50 border-amber-100' : 'bg-[#8B4513]/5 border border-[#8B4513]/20'}`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#8B4513]/10 rounded-xl text-[#8B4513]">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-500 font-medium">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#8B4513] hover:bg-[#5D2E0A] text-white rounded-lg text-xs font-bold transition-all shadow-md">Enable</button>
                </div>
              </div>
            )}
          </div>

          <div className={`p-6 border-t flex justify-end gap-4 ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'border-white/5 bg-white/[0.01]'}`}>
            <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-[#8B4513] transition-colors">Cancel</button>
            <button 
              onClick={() => {
                setTheme(localTheme);
                onClose();
              }}
              className="px-8 py-2.5 bg-[#8B4513] hover:bg-[#5D2E0A] text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-900/20 transition-all active:scale-[0.98]">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
