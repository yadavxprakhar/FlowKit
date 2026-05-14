import React, { useState, useEffect } from 'react';
import { Play, Square, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import axios from 'axios';

const TimerWidget = ({ taskId, taskTitle }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [logId, setLogId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/timer/start/${taskId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogId(response.data.id);
      setIsActive(true);
    } catch (err) {
      console.error('Failed to start timer', err);
    }
  };

  const handleStop = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/timer/stop/${logId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsActive(false);
      setLogId(null);
      setSeconds(0);
    } catch (err) {
      console.error('Failed to stop timer', err);
    }
  };

  if (!taskId && !isActive) return null;

  return (
    <div className={`fixed bottom-8 right-8 z-[60] bg-[#1A120E] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 transition-all duration-300 ${isExpanded ? 'w-72' : 'w-14 h-14 overflow-hidden'}`}>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#8B4513]">
            <Clock size={18} className={isActive ? 'animate-pulse' : ''} />
            {isExpanded && <span className="text-[10px] font-bold uppercase tracking-widest">Active Timer</span>}
          </div>
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-500 hover:text-white transition-colors">
            {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>

        {isExpanded && (
          <>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <p className="text-xs text-slate-400 mb-1 font-medium truncate">Working on:</p>
              <p className="text-sm text-white font-bold truncate">{taskTitle || "Select a task..."}</p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-3xl font-mono font-bold text-white tracking-tighter">
                {formatTime(seconds)}
              </span>
              
              {isActive ? (
                <button
                  onClick={handleStop}
                  className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]"
                >
                  <Square size={20} fill="currentColor" />
                </button>
              ) : (
                <button
                  onClick={handleStart}
                  disabled={!taskId}
                  className="w-12 h-12 bg-[#8B4513] hover:bg-[#5D2E0A] rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-900/20 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <Play size={20} fill="currentColor" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimerWidget;
