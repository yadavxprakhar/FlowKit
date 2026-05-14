import React from 'react';
import { Bell, Check, Clock, AlertCircle, Info } from 'lucide-react';

const NotificationDropdown = ({ isOpen, notifications, onClose, onMarkAsRead, theme }) => {
  if (!isOpen) return null;

  return (
    <div className={`absolute top-12 right-0 w-80 border rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 ${
      theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#1A120E] border-white/10'
    }`}>
      <div className={`p-4 border-b flex items-center justify-between ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'border-white/5'}`}>
        <h3 className={`text-sm font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Recent Nudges</h3>
        <span className="text-[10px] bg-[#8B4513] text-white px-2 py-0.5 rounded-full font-bold uppercase">
          {notifications.filter(n => !n.isRead).length} New
        </span>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell size={24} className="mx-auto text-slate-300 mb-2" />
            <p className="text-xs text-slate-400 italic">No nudges yet</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id} 
              onClick={() => onMarkAsRead(n.id)}
              className={`p-4 border-b flex gap-3 cursor-pointer transition-colors ${
                theme === 'light' ? 'border-slate-100' : 'border-white/5'
              } ${n.isRead ? 'opacity-50 grayscale-[0.5]' : theme === 'light' ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}
            >
              <div className="mt-1 flex-shrink-0">
                {n.type === 'ALERT' ? <AlertCircle size={16} className="text-rose-500" /> : <Info size={16} className="text-[#8B4513]" />}
              </div>
              <div className="flex-1">
                <p className={`text-xs leading-relaxed font-medium mb-1 ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>
                  {n.message}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock size={10} />
                  <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              {!n.isRead && (
                <div className="w-1.5 h-1.5 bg-[#8B4513] rounded-full mt-2"></div>
              )}
            </div>
          ))
        )}
      </div>

      <div className={`p-3 text-center border-t ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-white/5'}`}>
        <button onClick={onClose} className={`text-[10px] font-bold transition-colors uppercase tracking-widest ${theme === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-slate-500 hover:text-white'}`}>
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
