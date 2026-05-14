import React from 'react';
import TaskCard from './TaskCard';
import { Plus, MoreHorizontal } from 'lucide-react';

const StackBoard = ({ tasks, isLoading, onTaskSelect, theme }) => {
  const columns = [
    { title: 'Todo', status: 'TODO', color: 'bg-[#8D6E63]' },
    { title: 'In Progress', status: 'IN_PROGRESS', color: 'bg-[#8B4513]' },
    { title: 'Done', status: 'DONE', color: 'bg-[#20B2AA]' },
  ];

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#8B4513]/20 border-t-[#8B4513] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-x-auto p-8 flex gap-6">
      {columns.map((column) => (
        <div key={column.status} className="flex-shrink-0 w-[350px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${column.color}`}></div>
              <h3 className={`font-bold tracking-tight ${theme === 'light' ? 'text-[#2D1E15]' : 'text-white'}`}>{column.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                theme === 'light' ? 'bg-slate-100 text-slate-500 border border-slate-200' : 'bg-white/5 text-slate-500 border border-white/5'
              }`}>
                {tasks.filter(t => t.status === column.status).length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className={`p-1.5 rounded transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-white/5 text-slate-500'}`}>
                <Plus size={18} />
              </button>
              <button className={`p-1.5 rounded transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-white/5 text-slate-500'}`}>
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 min-h-[500px]">
            {tasks
              .filter((task) => task.status === column.status)
              .map((task) => (
                <div key={task.id} onClick={() => onTaskSelect(task)}>
                  <TaskCard task={task} theme={theme} />
                </div>
              ))}
            
            {/* Drop Zone / Empty Column State */}
            {tasks.filter(t => t.status === column.status).length === 0 && (
              <div className={`h-32 border-2 border-dashed rounded-2xl flex items-center justify-center text-sm italic font-medium ${
                theme === 'light' ? 'border-slate-200 text-slate-400' : 'border-white/5 text-slate-600'
              }`}>
                No tasks yet
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StackBoard;
