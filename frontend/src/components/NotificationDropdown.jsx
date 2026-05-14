import React from 'react';
import { Bell, Check, Clock, AlertCircle, Info } from 'lucide-react';

const NotificationDropdown = ({ isOpen, notifications, onClose, onMarkAsRead }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-0 w-80 bg-[#1A120E] border border-white/10 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white tracking-tight">Recent Nudges</h3>
        <span className="text-[10px] bg-[#8B4513] text-white px-2 py-0.5 rounded-full font-bold uppercase">
          {notifications.filter(n => !n.isRead).length} New
        </span>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell size={24} className="mx-auto text-slate-700 mb-2" />
            <p className="text-xs text-slate-500 italic">No nudges yet</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id} 
              onClick={() => onMarkAsRead(n.id)}
              className={`p-4 border-b border-white/5 flex gap-3 cursor-pointer transition-colors ${n.isRead ? 'opacity-50 grayscale-[0.5]' : 'hover:bg-white/5'}`}
            >
              <div className="mt-1 flex-shrink-0">
                {n.type === 'ALERT' ? <AlertCircle size={16} className="text-rose-500" /> : <Info size={16} className="text-[#8B4513]" />}
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-200 leading-relaxed font-medium mb-1">
                  {n.message}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
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

      <div className="p-3 text-center border-t border-white/5">
        <button onClick={onClose} className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
