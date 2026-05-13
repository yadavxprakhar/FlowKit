import React from 'react';
import { Calendar, Clock, User, MoreVertical, MessageSquare, Paperclip } from 'lucide-react';

const TaskCard = ({ task }) => {
  const priorityColors = {
    HIGH: 'bg-red-500/10 text-red-500 border-red-500/20',
    MEDIUM: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    LOW: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all cursor-grab active:cursor-grabbing group shadow-sm hover:shadow-xl hover:shadow-black/20">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityColors[task.priority] || 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
          {task.priority}
        </span>
        <button className="text-slate-500 hover:text-white transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>

      <h4 className="text-slate-100 font-semibold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
        {task.title}
      </h4>
      
      <p className="text-slate-400 text-xs mb-4 line-clamp-2 leading-relaxed">
        {task.description || "No description provided."}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center border-2 border-[#1e293b]">
            <span className="text-[10px] font-bold text-white uppercase">{task.assigneeName?.charAt(0) || <User size={10} />}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
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
