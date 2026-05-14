import React, { useState } from 'react';
import { X, Calendar, AlignLeft, AlertCircle, User, ArrowRight } from 'lucide-react';
import axios from 'axios';

const TaskModal = ({ isOpen, onClose, projectId, onTaskCreated, theme }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8080/api/v1/tasks', {
        title,
        description,
        priority,
        projectId,
        status: 'TODO'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onTaskCreated();
      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
    } catch (err) {
      console.error('Failed to create task', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className={`absolute inset-0 backdrop-blur-sm ${theme === 'light' ? 'bg-slate-900/20' : 'bg-[#0F0906]/80'}`} onClick={onClose}></div>
      
      <div className={`relative border w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 ${
        theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#1A120E] border-white/10'
      }`}>
        <div className={`px-8 py-6 border-b flex items-center justify-between ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'border-white/5'}`}>
          <h2 className={`text-xl font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Create New Task</h2>
          <button onClick={onClose} className={`p-2 rounded-xl transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-white/5 text-slate-400'}`}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">Task Title</label>
            <input
              type="text"
              autoFocus
              className={`w-full border rounded-xl py-3 px-4 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 ${
                theme === 'light' 
                  ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400' 
                  : 'bg-white/5 border-white/10 text-white placeholder-slate-600'
              }`}
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">Description</label>
            <div className="relative">
              <textarea
                rows="4"
                className={`w-full border rounded-xl py-3 px-4 transition-all resize-none text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 ${
                  theme === 'light' 
                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400' 
                    : 'bg-white/5 border-white/10 text-white placeholder-slate-600'
                }`}
                placeholder="Add some context..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">Priority</label>
              <select
                className={`w-full border rounded-xl py-3 px-4 transition-all text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 ${
                  theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'
                }`}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="LOW" className={theme === 'light' ? 'bg-white' : 'bg-[#1A120E]'}>Low Priority</option>
                <option value="MEDIUM" className={theme === 'light' ? 'bg-white' : 'bg-[#1A120E]'}>Medium Priority</option>
                <option value="HIGH" className={theme === 'light' ? 'bg-white' : 'bg-[#1A120E]'}>High Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">Assignee</label>
              <div className={`w-full border rounded-xl py-3 px-4 text-sm flex items-center gap-2 italic ${
                theme === 'light' ? 'bg-slate-50 border-slate-100 text-slate-400' : 'bg-white/5 border-white/10 text-slate-500'
              }`}>
                <User size={16} />
                Assigning to me
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-6 py-3 border rounded-xl text-sm font-bold transition-all ${
                theme === 'light' ? 'border-slate-200 text-slate-500 hover:bg-slate-50' : 'border-white/10 text-slate-400 hover:bg-white/5'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] px-6 py-3 bg-[#8B4513] hover:bg-[#5D2E0A] text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-900/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Task
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
