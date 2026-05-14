import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, User, Hash, Search, MoreVertical, Paperclip, Smile, Users, Info, Circle } from 'lucide-react';

const HuddleView = ({ projectId, projectName, theme }) => {
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      fetchInitialData();
      const interval = setInterval(fetchMessages, 3000); 
      return () => clearInterval(interval);
    }
  }, [projectId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchInitialData = async () => {
    try {
      const [msgRes, memRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/v1/messages/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`http://localhost:8080/api/v1/projects/${projectId}/members`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setMessages(msgRes.data);
      setMembers(memRes.data);
    } catch (err) {
      console.error('Failed to fetch initial huddle data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/messages/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Only update if length changed or first load
      if (response.data.length !== messages.length) {
        setMessages(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const response = await axios.post('http://localhost:8080/api/v1/messages', {
        content: newMessage,
        projectId: projectId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    } finally {
      setIsSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-transparent">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#8B4513]/10 border-t-[#8B4513] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Hash size={24} className="text-[#8B4513]/40" />
          </div>
        </div>
        <p className="mt-6 text-sm font-bold text-slate-500 uppercase tracking-widest animate-pulse">Entering Huddle...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex bg-transparent overflow-hidden">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Huddle Header */}
        <div className={`h-16 border-b px-8 flex items-center justify-between backdrop-blur-xl ${
          theme === 'light' ? 'bg-white/40 border-slate-200' : 'bg-white/[0.01] border-white/5'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#8B4513] to-amber-900 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20">
              <Hash size={20} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{projectName} Huddle</h3>
                <span className="w-2 h-2 rounded-full bg-[#20B2AA] shadow-[0_0_10px_#20B2AA]"></span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Live Discussion • {members.length} Members</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2 mr-4">
              {members.slice(0, 3).map((m, i) => (
                <div key={i} className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold text-white shadow-lg ${
                  theme === 'light' ? 'border-white bg-slate-200 text-slate-700' : 'border-[#0F0906] bg-slate-800'
                }`}>
                  {m.name.charAt(0)}
                </div>
              ))}
              {members.length > 3 && (
                <div className={`w-7 h-7 rounded-full border-2 bg-[#8B4513] flex items-center justify-center text-[10px] font-bold text-white shadow-lg ${
                  theme === 'light' ? 'border-white' : 'border-[#0F0906]'
                }`}>
                  +{members.length - 3}
                </div>
              )}
            </div>
            <button className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-400 hover:text-slate-600' : 'hover:bg-white/5 text-slate-500'}`}>
              <Search size={18} />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-400 hover:text-slate-600' : 'hover:bg-white/5 text-slate-500'}`}>
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-hide">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-40">
              <MessageCircle size={64} className="text-slate-700 mb-4" />
              <p className="text-slate-500 font-medium">No messages yet. Start the huddle!</p>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isMe = msg.sender?.email === userEmail;
              return (
                <div key={msg.id || idx} className={`flex gap-4 ${isMe ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-black text-xs shadow-xl border border-white/10 ${
                    isMe ? 'bg-gradient-to-br from-[#8B4513] to-amber-900' : (theme === 'light' ? 'bg-slate-200 text-slate-600' : 'bg-slate-800')
                  }`}>
                    {msg.sender?.name?.charAt(0) || "U"}
                  </div>
                  <div className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : ''}`}>
                    <div className="flex items-center gap-2 mb-1.5 px-1">
                      <span className={`text-xs font-black ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>{msg.sender?.name}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`relative px-5 py-3.5 rounded-[24px] text-sm leading-relaxed shadow-lg ${
                      isMe 
                        ? 'bg-[#8B4513] text-white rounded-tr-none' 
                        : theme === 'light'
                          ? 'bg-[#F5F1EB] border border-slate-200 text-slate-700 rounded-tl-none'
                          : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-8 pb-8 pt-2">
          <form 
            onSubmit={handleSendMessage} 
            className={`group relative backdrop-blur-xl border rounded-3xl p-3 flex items-center gap-3 transition-all focus-within:border-[#8B4513]/50 focus-within:shadow-[0_0_30px_rgba(139,69,19,0.1)] shadow-2xl ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#1A120E]/50 border-white/5'
            }`}
          >
            <div className="flex items-center gap-1 pl-2">
              <button type="button" className={`p-2 transition-colors rounded-xl ${theme === 'light' ? 'text-slate-400 hover:text-[#8B4513] hover:bg-slate-50' : 'text-slate-500 hover:text-[#8B4513] hover:bg-white/5'}`}>
                <Paperclip size={20} />
              </button>
            </div>
            <input
              type="text"
              className={`flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 ${theme === 'light' ? 'text-slate-900 placeholder-slate-400' : 'text-white placeholder-slate-600'}`}
              placeholder={`Send a message to ${projectName}...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="flex items-center gap-2 pr-1">
              <button type="button" className={`p-2 transition-colors rounded-xl ${theme === 'light' ? 'text-slate-400 hover:text-amber-600 hover:bg-slate-50' : 'text-slate-500 hover:text-amber-500 hover:bg-white/5'}`}>
                <Smile size={20} />
              </button>
              <button
                type="submit"
                disabled={!newMessage.trim() || isSending}
                className={`p-3 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center ${
                  newMessage.trim() 
                    ? 'bg-[#8B4513] text-white shadow-amber-900/40 hover:bg-[#5D2E0A] hover:-translate-y-0.5' 
                    : (theme === 'light' ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-white/5 text-slate-600 cursor-not-allowed')
                }`}
              >
                {isSending ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Sidebar - Info & Members */}
      <div className={`hidden xl:flex w-72 border-l flex-col backdrop-blur-xl ${
        theme === 'light' ? 'bg-white/40 border-slate-200' : 'bg-white/[0.01] border-white/5'
      }`}>
        <div className={`p-6 border-b ${theme === 'light' ? 'border-slate-200' : 'border-white/5'}`}>
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 px-1">Active Members</h4>
          <div className="space-y-4">
            {members.map((member, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 rounded-xl transition-all group cursor-default ${
                theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-white/5'
              }`}>
                <div className="relative">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs border transition-colors shadow-lg ${
                    theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-800 border-white/10 text-white'
                  }`}>
                    {member.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#20B2AA] rounded-full border-2 border-[#0F0906] shadow-[0_0_5px_#20B2AA]"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate transition-colors ${
                    theme === 'light' ? 'text-slate-800 group-hover:text-[#8B4513]' : 'text-slate-300 group-hover:text-white'
                  }`}>{member.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Online</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 px-1">About Huddle</h4>
          <div className={`border rounded-[24px] p-6 space-y-4 ${
            theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
          }`}>
            <div className="flex items-center gap-3 text-slate-500">
              <Info size={16} className="text-[#8B4513]" />
              <p className="text-xs leading-relaxed">This is a private huddle for the <span className={`font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{projectName}</span> team. Messages are encrypted and real-time.</p>
            </div>
            <div className={`pt-4 border-t flex items-center justify-between ${theme === 'light' ? 'border-slate-200' : 'border-white/5'}`}>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Retention</span>
              <span className="text-[10px] font-bold text-[#8B4513]">Forever</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuddleView;
