import React from 'react';
import { File, Image, FileText, MoreVertical, Download, Plus, Search } from 'lucide-react';

const FilesView = ({ theme }) => {
  const mockFiles = [
    { name: 'Branding_Guidelines.pdf', type: 'PDF', size: '2.4 MB', date: 'May 10, 2026' },
    { name: 'Dashboard_Mockup_v2.png', type: 'IMAGE', size: '5.1 MB', date: 'May 12, 2026' },
    { name: 'Project_Proposal.docx', type: 'DOC', size: '840 KB', date: 'May 08, 2026' },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF': return <FileText size={24} className="text-rose-500" />;
      case 'IMAGE': return <Image size={24} className="text-[#20B2AA]" />;
      default: return <File size={24} className="text-[#8B4513]" />;
    }
  };

  return (
    <div className="flex-1 p-8 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h3 className={`text-xl font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Project Assets</h3>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#8B4513] hover:bg-[#5D2E0A] rounded-xl text-sm font-bold text-white shadow-lg shadow-amber-900/20 transition-all active:scale-[0.98]">
          <Plus size={18} />
          Upload File
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFiles.map((file, idx) => (
          <div key={idx} className={`border rounded-2xl p-4 group transition-all cursor-pointer ${
            theme === 'light' ? 'bg-white border-slate-200 hover:bg-slate-50' : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
                {getFileIcon(file.type)}
              </div>
              <button className={`p-1.5 rounded-lg text-slate-500 ${theme === 'light' ? 'hover:bg-slate-200' : 'hover:bg-white/10'}`}>
                <MoreVertical size={18} />
              </button>
            </div>
            <h4 className={`text-sm font-bold truncate mb-1 ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>{file.name}</h4>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">{file.size}</span>
              <span className="text-[10px] text-slate-500 font-medium">{file.date}</span>
            </div>
            <div className={`mt-4 pt-4 border-t flex gap-2 ${theme === 'light' ? 'border-slate-100' : 'border-white/5'}`}>
              <button className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold transition-all ${
                theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}>
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesView;
