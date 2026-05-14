import React, { useState } from 'react';
import { X, Calendar, User, FileText, ChevronDown, Check } from 'lucide-react';

const InvoiceModal = ({ isOpen, onClose, theme, projectName, clientName, logs }) => {
  const [formData, setFormData] = useState({
    customerName: clientName || 'Leester Donnelly and Sons',
    generateWith: 'Timesheet & Expenses',
    sortBy: 'Projects',
    itemName: 'Project name',
    itemDescription: 'Date Range',
    startDate: '2026-05-01',
    endDate: '2026-05-31',
    includeUnbilled: true
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    // Mock generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className={`absolute inset-0 backdrop-blur-md ${theme === 'light' ? 'bg-slate-900/20' : 'bg-[#0F0906]/80'}`} 
        onClick={onClose} 
      />
      
      <div className={`relative w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 ${
        theme === 'light' ? 'bg-white border border-slate-200' : 'bg-[#1A120E] border border-white/10'
      }`}>
        {/* Header */}
        <div className={`px-10 py-8 border-b flex items-center justify-between ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-white/[0.02] border-white/5'}`}>
          <div>
            <h3 className={`text-2xl font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>New Invoice</h3>
            <p className="text-slate-500 text-xs mt-1 font-medium">Create a professional invoice for {projectName}</p>
          </div>
          <button onClick={onClose} className={`p-2 rounded-xl transition-colors ${theme === 'light' ? 'hover:bg-slate-200 text-slate-400' : 'hover:bg-white/10 text-slate-500'}`}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleGenerate} className="p-10 space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Customer Name</label>
              <div className="relative group">
                <input 
                  type="text" 
                  className={`w-full py-3.5 px-4 rounded-2xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 transition-all ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'
                  }`}
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Generate Invoice with</label>
              <div className="flex gap-6">
                {['Timesheet & Expenses', 'Expenses'].map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="radio" 
                        name="genType" 
                        className="peer hidden" 
                        checked={formData.generateWith === option}
                        onChange={() => setFormData({...formData, generateWith: option})}
                      />
                      <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                        formData.generateWith === option 
                          ? 'border-[#8B4513] bg-[#8B4513]' 
                          : theme === 'light' ? 'border-slate-300' : 'border-white/20'
                      }`}>
                        {formData.generateWith === option && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Sort Data By</label>
                <div className="relative">
                  <select className={`w-full py-3.5 px-4 rounded-2xl border text-sm font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 transition-all ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'
                  }`}>
                    <option>Projects</option>
                    <option>Tasks</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Show in Item Name</label>
                <div className="relative">
                  <select className={`w-full py-3.5 px-4 rounded-2xl border text-sm font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 transition-all ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'
                  }`}>
                    <option>Project name</option>
                    <option>Task title</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Start Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className={`w-full py-3.5 px-4 rounded-2xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 transition-all ${
                      theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'
                    }`}
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">End Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className={`w-full py-3.5 px-4 rounded-2xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 transition-all ${
                      theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'
                    }`}
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="peer hidden" 
                    checked={formData.includeUnbilled}
                    onChange={() => setFormData({...formData, includeUnbilled: !formData.includeUnbilled})}
                  />
                  <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${
                    formData.includeUnbilled 
                      ? 'border-[#8B4513] bg-[#8B4513]' 
                      : theme === 'light' ? 'border-slate-300' : 'border-white/20'
                  }`}>
                    {formData.includeUnbilled && <Check size={14} className="text-white" />}
                  </div>
                </div>
                <span className={`text-xs font-bold ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Include all the unbilled expense of the selected customer</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-4 rounded-2xl text-sm font-black transition-all ${
                theme === 'light' ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating || isSuccess}
              className={`flex-1 py-4 rounded-2xl text-sm font-black text-white shadow-xl shadow-amber-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 ${
                isSuccess ? 'bg-[#20B2AA]' : 'bg-[#8B4513] hover:bg-[#5D2E0A]'
              }`}
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSuccess ? (
                <>
                  <Check size={18} />
                  Invoice Generated
                </>
              ) : (
                'Generate Invoice'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModal;
