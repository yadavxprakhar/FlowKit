import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, MoreHorizontal } from 'lucide-react';

const CalendarView = ({ tasks }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = "May";
  const currentYear = 2026;

  // Enhance Task Ribbon Styling
  const getTaskStyle = (priority) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'MEDIUM': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const renderCalendar = () => {
    const cells = [];
    // Mocking a month that starts on a Friday (May 1st, 2026 is a Friday)
    const emptyDays = 5; 
    
    // Empty prefix cells
    for (let i = 0; i < emptyDays; i++) {
      cells.push(<div key={`empty-${i}`} className="min-h-[140px] bg-white/[0.01] border border-white/[0.03]"></div>);
    }

    for (let i = 1; i <= 31; i++) {
      const isToday = i === currentDay;
      const dayTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate).getDate() === i);
      
      cells.push(
        <div key={i} className={`min-h-[140px] relative border border-white/[0.05] p-3 transition-all duration-300 group hover:bg-white/[0.04] ${isToday ? 'bg-blue-600/[0.03]' : ''}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
              isToday 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'text-slate-500 group-hover:text-slate-300'
            }`}>
              {i}
            </span>
            {dayTasks.length > 0 && (
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
            )}
          </div>
          
          <div className="space-y-1.5">
            {dayTasks.slice(0, 3).map(t => (
              <div 
                key={t.id} 
                className={`text-[10px] px-2 py-1.5 rounded-lg border backdrop-blur-md font-bold truncate transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${getTaskStyle(t.priority)}`}
              >
                {t.title}
              </div>
            ))}
            {dayTasks.length > 3 && (
              <p className="text-[9px] text-slate-500 font-bold pl-1">
                + {dayTasks.length - 3} more tasks
              </p>
            )}
          </div>

          {/* Hover Action Overlay */}
          <button className="absolute bottom-2 right-2 p-1.5 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 text-slate-400">
            <MoreHorizontal size={14} />
          </button>
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="flex-1 flex flex-col p-8 overflow-hidden bg-[#0f172a]">
      {/* Premium Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20">
            <CalendarIcon size={24} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{currentMonth} {currentYear}</h3>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mt-0.5">Scheduling Overview</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="px-4 py-2 text-xs font-bold text-white hover:bg-white/10 rounded-lg transition-all">
              Today
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="h-8 w-px bg-white/10 mx-2"></div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10 transition-all">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Main Grid Interface */}
      <div className="flex-1 bg-white/[0.02] rounded-[32px] border border-white/10 overflow-hidden flex flex-col shadow-2xl backdrop-blur-3xl">
        <div className="grid grid-cols-7 border-b border-white/10 bg-white/5">
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
