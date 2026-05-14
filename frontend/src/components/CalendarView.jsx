import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, MoreHorizontal } from 'lucide-react';

const CalendarView = ({ tasks, theme }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = "May";
  const currentYear = 2026;

  // Enhance Task Ribbon Styling
  const getTaskStyle = (priority) => {
    switch (priority) {
      case 'HIGH': return theme === 'light' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'MEDIUM': return theme === 'light' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return theme === 'light' ? 'bg-[#F5F1EB] text-[#8B4513] border-[#8B4513]/10' : 'bg-[#8B4513]/10 text-[#8B4513] border-[#8B4513]/20';
    }
  };

  const renderCalendar = () => {
    const cells = [];
    // Mocking a month that starts on a Friday (May 1st, 2026 is a Friday)
    const emptyDays = 5; 
    
    // Empty prefix cells
    for (let i = 0; i < emptyDays; i++) {
      cells.push(<div key={`empty-${i}`} className={`min-h-[140px] border ${theme === 'light' ? 'bg-slate-50/50 border-slate-100' : 'bg-white/[0.01] border-white/[0.03]'}`}></div>);
    }

    for (let i = 1; i <= 31; i++) {
      const isToday = i === currentDay;
      const dayTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate).getDate() === i);
      
      cells.push(
        <div key={i} className={`min-h-[140px] relative border p-3 transition-all duration-300 group ${
          theme === 'light' 
            ? `border-slate-100 hover:bg-slate-50 ${isToday ? 'bg-amber-50/30' : ''}` 
            : `border-white/[0.05] hover:bg-white/[0.04] ${isToday ? 'bg-[#8B4513]/[0.03]' : ''}`
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
              isToday 
                ? 'bg-[#8B4513] text-white shadow-lg shadow-amber-900/30' 
                : theme === 'light'
                  ? 'text-slate-400 group-hover:text-slate-900'
                  : 'text-slate-500 group-hover:text-slate-300'
            }`}>
              {i}
            </span>
            {dayTasks.length > 0 && (
              <div className="w-1.5 h-1.5 rounded-full bg-[#8B4513] animate-pulse"></div>
            )}
          </div>
          
          <div className="space-y-1.5">
            {dayTasks.slice(0, 3).map(t => (
              <div 
                key={t.id} 
                className={`text-[10px] px-2 py-1.5 rounded-lg border font-bold truncate transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${getTaskStyle(t.priority)}`}
              >
                {t.title}
              </div>
            ))}
            {dayTasks.length > 3 && (
              <p className="text-[9px] text-slate-400 font-bold pl-1">
                + {dayTasks.length - 3} more
              </p>
            )}
          </div>

          {/* Hover Action Overlay */}
          <button className={`absolute bottom-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 ${
            theme === 'light' ? 'bg-slate-100 hover:bg-slate-200' : 'bg-white/5 hover:bg-white/10'
          }`}>
            <MoreHorizontal size={14} />
          </button>
        </div>
      );
    }
    return cells;
  };

  return (
    <div className={`flex-1 flex flex-col p-8 overflow-hidden ${theme === 'light' ? 'bg-[#FCFAF8]' : 'bg-[#0F0906]'}`}>
      {/* Premium Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl border ${theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#8B4513]/10 border-[#8B4513]/20'}`}>
            <CalendarIcon size={24} className="text-[#8B4513]" />
          </div>
          <div>
            <h3 className={`text-2xl font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{currentMonth} {currentYear}</h3>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mt-0.5">Scheduling Overview</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex p-1 rounded-xl border ${theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'}`}>
            <button className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'text-slate-400 hover:bg-slate-50 hover:text-slate-900' : 'text-slate-400 hover:bg-white/10'}`}>
              <ChevronLeft size={20} />
            </button>
            <button className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${theme === 'light' ? 'text-slate-900 hover:bg-slate-50' : 'text-white hover:bg-white/10'}`}>
              Today
            </button>
            <button className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'text-slate-400 hover:bg-slate-50 hover:text-slate-900' : 'text-slate-400 hover:bg-white/10'}`}>
              <ChevronRight size={20} />
            </button>
          </div>
          <div className={`h-8 w-px mx-2 ${theme === 'light' ? 'bg-slate-200' : 'bg-white/10'}`}></div>
          <button className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-xs font-bold transition-all ${
            theme === 'light' ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
          }`}>
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Main Grid Interface */}
      <div className={`flex-1 rounded-[32px] border overflow-hidden flex flex-col shadow-2xl ${
        theme === 'light' ? 'bg-white border-slate-200 shadow-amber-900/5' : 'bg-white/[0.02] border-white/10 backdrop-blur-3xl'
      }`}>
        <div className={`grid grid-cols-7 border-b ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-white/5 border-white/10'}`}>
          {days.map(d => (
            <div key={d} className="py-5 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{d}</div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7 overflow-y-auto scrollbar-hide">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
