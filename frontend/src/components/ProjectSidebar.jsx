import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Plus, Folder, Hash, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectSidebar = ({ 
  projects, 
  selectedProjectId, 
  onSelectProject, 
  onLogout,
  onSettingsClick,
  isCollapsed,
  setIsCollapsed,
  theme
}) => {
  return (
    <aside className={`backdrop-blur-3xl border-r flex flex-col transition-all duration-300 z-30 ${isCollapsed ? 'w-20' : 'w-72'} ${
      theme === 'light' 
        ? 'bg-white/60 border-slate-200' 
        : 'bg-white/[0.01] border-white/5'
    }`}>
      {/* Header */}
      <div className={`p-6 flex items-center justify-between border-b ${theme === 'light' ? 'border-slate-200' : 'border-white/5'}`}>
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Layout className="text-white w-5 h-5" />
            </div>
            <span className={`font-bold text-xl tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Flowkit</span>
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors mx-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        <div>
          <div className={`flex items-center justify-between mb-4 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
            {!isCollapsed && <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">My Projects</h3>}
            <button className="p-1 hover:bg-white/5 rounded text-slate-400 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          
          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  selectedProjectId === project.id 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Folder size={20} className={selectedProjectId === project.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
                {!isCollapsed && <span className="font-medium truncate">{project.name}</span>}
              </button>
            ))}
          </div>
        </div>

        <div>
          {!isCollapsed && <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Workspace</h3>}
          <div className="space-y-1">
            <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all ${isCollapsed ? 'justify-center' : ''}`}>
              <Hash size={20} />
              {!isCollapsed && <span className="font-medium">Huddle</span>}
            </button>
            <button 
              onClick={onSettingsClick}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all ${isCollapsed ? 'justify-center' : ''}`}>
              <Settings size={20} />
              {!isCollapsed && <span className="font-medium">Settings</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default ProjectSidebar;
