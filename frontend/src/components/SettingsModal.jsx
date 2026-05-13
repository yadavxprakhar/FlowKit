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
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-[#1e293b]/90 backdrop-blur-3xl border border-white/10 w-full max-w-4xl h-[600px] rounded-[32px] shadow-2xl flex overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/5 p-6 flex flex-col gap-2">
          <h2 className="text-xl font-bold text-white mb-6 px-2">Settings</h2>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          <div className="mt-auto">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Workspace Plan</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Flowkit Pro</span>
                <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h3 className="text-lg font-bold text-white capitalize">{activeTab} Settings</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-slate-400">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-white/5 bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl flex items-center justify-center">
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
                      className="absolute -bottom-1 -right-1 p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/30 hover:scale-110 transition-all active:scale-95">
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
                    <h4 className="text-lg font-bold text-white mb-1">Your Avatar</h4>
                    <p className="text-xs text-slate-500 font-medium">Click the camera to upload a new profile picture</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" defaultValue="Prakhar" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" defaultValue="prakhar@example.com" disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bio</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-24 resize-none" placeholder="Tell us about yourself..."></textarea>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Theme Preference</h4>
                    <p className="text-xs text-slate-500 font-medium">Select how Flowkit looks to you</p>
                  </div>
                  <div className="flex bg-black/20 p-1 rounded-xl">
                    <button 
                      onClick={() => setLocalTheme('dark')}
                      className={`p-2 rounded-lg transition-all ${localTheme === 'dark' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                      <Moon size={16} />
                    </button>
                    <button 
                      onClick={() => setLocalTheme('light')}
                      className={`p-2 rounded-lg transition-all ${localTheme === 'light' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                      <Sun size={16} />
                    </button>
                    <button 
                      onClick={() => setLocalTheme('system')}
                      className={`p-2 rounded-lg transition-all ${localTheme === 'system' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                      <Monitor size={16} />
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Language</h4>
                    <p className="text-xs text-slate-500 font-medium">System default language</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white">
                    <Globe size={14} />
                    English (US)
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Email Notifications</h4>
                      <p className="text-xs text-slate-500 font-medium">Receive daily summaries and task updates</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-px bg-white/5 w-full"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Desktop Alerts</h4>
                      <p className="text-xs text-slate-500 font-medium">Real-time push notifications for mentions</p>
                    </div>
                    <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-px bg-white/5 w-full"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Huddle Mentions</h4>
                      <p className="text-xs text-slate-500 font-medium">Notify when someone tags you in a chat</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest text-[10px] mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/5 w-full"></div>

                <div className="bg-blue-600/5 border border-blue-600/20 rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/10 rounded-xl text-blue-400">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-500 font-medium">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all">Enable</button>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/5 flex justify-end gap-4 bg-white/[0.01]">
            <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
            <button 
              onClick={() => {
                setTheme(localTheme);
                onClose();
              }}
              className="px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
