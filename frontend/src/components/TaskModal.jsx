import React, { useState } from 'react';
import { X, Calendar, AlignLeft, AlertCircle, User, ArrowRight } from 'lucide-react';
import axios from 'axios';

const TaskModal = ({ isOpen, onClose, projectId, onTaskCreated }) => {
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
      <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-[#1e293b] border border-white/10 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">Create New Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Task Title</label>
            <input
              type="text"
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-semibold"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
            <div className="relative">
              <textarea
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none text-sm leading-relaxed"
                placeholder="Add some context..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Priority</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm appearance-none cursor-pointer"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="LOW" className="bg-[#1e293b]">Low Priority</option>
                <option value="MEDIUM" className="bg-[#1e293b]">Medium Priority</option>
                <option value="HIGH" className="bg-[#1e293b]">High Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Assignee</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-slate-500 text-sm flex items-center gap-2 italic">
                <User size={16} />
                Assigning to me
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-white/10 rounded-xl text-sm font-bold text-slate-400 hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group"
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
