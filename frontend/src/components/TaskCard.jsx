import React from 'react';
import { Calendar, Clock, User, MoreVertical, MessageSquare, Paperclip } from 'lucide-react';

const TaskCard = ({ task, theme }) => {
  const priorityColors = {
    HIGH: 'bg-red-500/10 text-red-500 border-red-500/20',
    MEDIUM: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    LOW: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  };

  return (
    <div className={`border rounded-2xl p-4 transition-all cursor-grab active:cursor-grabbing group shadow-sm hover:shadow-xl ${
      theme === 'light' 
        ? 'bg-white border-slate-200 hover:border-[#8B4513]/30 hover:shadow-amber-900/5' 
        : 'bg-white/5 border-white/10 hover:border-white/20 hover:shadow-black/20'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityColors[task.priority] || 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
          {task.priority}
        </span>
        <button className={`transition-colors ${theme === 'light' ? 'text-slate-400 hover:text-slate-600' : 'text-slate-500 hover:text-white'}`}>
          <MoreVertical size={16} />
        </button>
      </div>

      <h4 className={`font-semibold mb-2 transition-colors line-clamp-2 ${
        theme === 'light' ? 'text-[#2D1E15] group-hover:text-[#8B4513]' : 'text-[#D7CCC8] group-hover:text-[#8B4513]'
      }`}>
        {task.title}
      </h4>
      
      <p className={`text-xs mb-4 line-clamp-2 leading-relaxed ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
        {task.description || "No description provided."}
      </p>

      <div className={`flex items-center justify-between pt-4 border-t ${theme === 'light' ? 'border-slate-100' : 'border-white/5'}`}>
        <div className="flex -space-x-2">
          <div className={`w-6 h-6 rounded-full bg-[#8B4513] flex items-center justify-center border-2 ${theme === 'light' ? 'border-white' : 'border-[#1e293b]'}`}>
            <span className="text-[10px] font-bold text-white uppercase">{task.assigneeName?.charAt(0) || <User size={10} />}</span>
          </div>
        </div>

        <div className={`flex items-center gap-3 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>
          <div className="flex items-center gap-1">
            <MessageSquare size={12} />
            <span className="text-[10px]">2</span>
          </div>
          <div className="flex items-center gap-1">
            <Paperclip size={12} />
            <span className="text-[10px]">1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
