import React from 'react';
import { Clock, AlertCircle, CheckCircle2, User } from 'lucide-react';

const ListView = ({ tasks, isLoading }) => {
  if (isLoading) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#8B4513]/20 border-t-[#8B4513] rounded-full animate-spin"></div>
    </div>
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'text-red-400 bg-red-400/10';
      case 'MEDIUM': return 'text-amber-400 bg-amber-400/10';
      case 'LOW': return 'text-emerald-400 bg-emerald-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'DONE': return <CheckCircle2 size={16} className="text-[#20B2AA]" />;
      case 'IN_PROGRESS': return <Clock size={16} className="text-[#8B4513]" />;
      default: return <AlertCircle size={16} className="text-[#8D6E63]" />;
    }
  };

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Task Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Priority</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Assignee</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-[#8B4513] transition-colors">{task.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-slate-400 uppercase tracking-wider">
                    {task.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#8B4513]/20 flex items-center justify-center text-[10px] text-white">
                      <User size={12} className="text-[#8B4513]" />
                    </div>
                    <span className="text-xs text-slate-400">{task.assigneeName || 'Unassigned'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-xs text-slate-500">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-slate-500 italic text-sm">
                  No tasks found in this project.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
