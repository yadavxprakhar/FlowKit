import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  User, 
  Calendar,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Download
} from 'lucide-react';
import InvoiceModal from './InvoiceModal';

const TimesheetView = ({ projectId, projectName, clientName, theme }) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (projectId) {
      fetchLogs();
    }
  }, [projectId]);

  const fetchLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/timer/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Ensure logs is always an array
      setLogs(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Failed to fetch project logs', err);
      setError('The timesheet is taking longer than expected to load or the server is busy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (logId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8080/api/v1/timer/${logId}/status?status=${newStatus}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchLogs();
    } catch (err) {
      console.error('Failed to update log status', err);
    }
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return 0;
    const startTime = new Date(start);
    const endTime = new Date(end);
    return (endTime - startTime) / (1000 * 60 * 60); // Hours
  };

  const formatDuration = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const totals = React.useMemo(() => logs.reduce((acc, log) => {
    const duration = calculateDuration(log.startTime, log.endTime);
    acc.total += duration;
    if (log.isBillable) acc.billable += duration;
    else acc.nonBillable += duration;
    return acc;
  }, { total: 0, billable: 0, nonBillable: 0 }), [logs]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#8B4513]/10 border-t-[#8B4513] rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest animate-pulse">Loading Timesheet...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6">
          <AlertCircle size={32} />
        </div>
        <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Something went wrong</h3>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">{error}</p>
        <button 
          onClick={fetchLogs}
          className="px-8 py-3 bg-[#8B4513] hover:bg-[#5D2E0A] text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-900/20 active:scale-95"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto space-y-8">
      {/* Header & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Track your hours</h2>
          <p className="text-slate-500 text-sm mt-1">Manage and approve team timesheets for {projectName}</p>
        </div>
        <button 
          onClick={() => setIsInvoiceModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#8B4513] hover:bg-[#5D2E0A] rounded-xl text-sm font-bold text-white shadow-lg shadow-amber-900/20 transition-all active:scale-[0.98]"
        >
          <FileText size={18} />
          Generate Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === 'light' ? 'bg-white border-slate-200 shadow-xl shadow-amber-900/5' : 'bg-white/5 border-white/10'
        }`}>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Billable Hours</p>
          <div className="flex items-baseline gap-2">
            <h3 className={`text-3xl font-black ${theme === 'light' ? 'text-[#20B2AA]' : 'text-[#20B2AA]'}`}>
              {formatDuration(totals.billable)}
            </h3>
            <span className="text-xs font-bold text-slate-500 uppercase">hrs</span>
          </div>
        </div>

        <div className={`p-6 rounded-3xl border transition-all ${
          theme === 'light' ? 'bg-white border-slate-200 shadow-xl shadow-amber-900/5' : 'bg-white/5 border-white/10'
        }`}>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Non-Billable Hours</p>
          <div className="flex items-baseline gap-2">
            <h3 className={`text-3xl font-black ${theme === 'light' ? 'text-rose-500' : 'text-rose-400'}`}>
              {formatDuration(totals.nonBillable)}
            </h3>
            <span className="text-xs font-bold text-slate-500 uppercase">hrs</span>
          </div>
        </div>

        <div className={`p-6 rounded-3xl border transition-all ${
          theme === 'light' ? 'bg-[#FCFAF8] border-[#8B4513]/20 shadow-xl shadow-amber-900/5' : 'bg-[#8B4513]/10 border-[#8B4513]/20'
        }`}>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Logged</p>
          <div className="flex items-baseline gap-2">
            <h3 className={`text-3xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              {formatDuration(totals.total)}
            </h3>
            <span className="text-xs font-bold text-slate-500 uppercase">hrs</span>
          </div>
        </div>
      </div>

      {/* Timesheet List */}
      <div className={`rounded-[32px] border overflow-hidden ${
        theme === 'light' ? 'bg-white border-slate-200 shadow-xl shadow-amber-900/5' : 'bg-white/5 border-white/10'
      }`}>
        <div className={`px-8 py-5 border-b flex items-center justify-between ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-white/[0.02] border-white/5'}`}>
          <div className="flex items-center gap-4">
            <Calendar size={18} className="text-[#8B4513]" />
            <span className={`text-sm font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Recent Entries</span>
          </div>
          <div className="flex items-center gap-3">
            <button className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-slate-400'}`}>
              <Filter size={18} />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-slate-400'}`}>
              <Download size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b ${theme === 'light' ? 'border-slate-100' : 'border-white/5'}`}>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Entry Date</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Team Member</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Task Details</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Duration</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'light' ? 'divide-slate-50' : 'divide-white/5'}`}>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-8 py-12 text-center text-slate-500 italic text-sm">
                    No time entries logged for this project yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className={`transition-colors ${theme === 'light' ? 'hover:bg-slate-50/50' : 'hover:bg-white/[0.02]'}`}>
                    <td className="px-8 py-5">
                      <span className={`text-xs font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        {new Date(log.startTime).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B4513] to-amber-900 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                          {log.user?.name?.charAt(0) || 'U'}
                        </div>
                        <span className={`text-sm font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                          {log.user?.name || 'User'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="max-w-xs">
                        <p className={`text-sm font-bold truncate ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{log.task?.title}</p>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                          {log.isBillable ? 'Billable' : 'Non-Billable'} • {log.task?.priority}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-sm font-mono font-bold ${theme === 'light' ? 'text-[#8B4513]' : 'text-amber-500'}`}>
                        {formatDuration(calculateDuration(log.startTime, log.endTime))}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        log.status === 'APPROVED' ? 'bg-[#20B2AA]/10 text-[#20B2AA]' :
                        log.status === 'REJECTED' ? 'bg-rose-500/10 text-rose-500' :
                        'bg-amber-500/10 text-amber-600'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      {log.status === 'PENDING' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(log.id, 'APPROVED')}
                            className="p-2 bg-[#20B2AA]/10 text-[#20B2AA] hover:bg-[#20B2AA] hover:text-white rounded-lg transition-all"
                            title="Approve"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(log.id, 'REJECTED')}
                            className="p-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-all"
                            title="Reject"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      ) : (
                        <button className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-white/5 text-slate-500'}`}>
                          <MoreHorizontal size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <InvoiceModal 
        isOpen={isInvoiceModalOpen} 
        onClose={() => setIsInvoiceModalOpen(false)} 
        theme={theme}
        projectName={projectName}
        clientName={clientName}
        logs={logs.filter(l => l.status === 'APPROVED')}
      />
    </div>
  );
};

export default TimesheetView;
