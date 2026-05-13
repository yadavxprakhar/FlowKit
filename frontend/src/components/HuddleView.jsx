import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, User, Hash, Search, MoreVertical, Paperclip, Smile } from 'lucide-react';

const HuddleView = ({ projectId, projectName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (projectId) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000); // Polling for "real-time"
      return () => clearInterval(interval);
    }
  }, [projectId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/messages/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await axios.post('http://localhost:8080/api/v1/messages', {
        content: newMessage,
        projectId: projectId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0f172a]">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] overflow-hidden">
      {/* Huddle Header */}
      <div className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-[#0f172a]/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-400">
            <Hash size={18} />
          </div>
          <div>
            <h3 className="text-white font-bold tracking-tight">{projectName} Huddle</h3>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Team Discussion</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <Search size={18} className="cursor-pointer hover:text-white transition-colors" />
          <MoreVertical size={18} className="cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.map((msg, idx) => {
          const isMe = msg.sender?.email === localStorage.getItem('userEmail'); // Note: we should store userEmail on login
          return (
            <div key={msg.id} className={`flex gap-4 ${isMe ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold border border-white/5 shadow-lg flex-shrink-0">
                {msg.sender?.name?.charAt(0) || <User size={18} />}
              </div>
              <div className={`max-w-[70%] ${isMe ? 'items-end' : ''} flex flex-col`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-slate-200">{msg.sender?.name}</span>
                  <span className="text-[10px] text-slate-500">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  isMe 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-8">
        <form onSubmit={handleSendMessage} className="bg-white/5 border border-white/10 rounded-2xl p-2 flex items-center gap-2 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
          <button type="button" className="p-2 text-slate-500 hover:text-slate-300 transition-colors">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-600 text-sm py-2 px-2"
            placeholder={`Message # ${projectName} huddle...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="button" className="p-2 text-slate-500 hover:text-slate-300 transition-colors">
            <Smile size={20} />
          </button>
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HuddleView;
