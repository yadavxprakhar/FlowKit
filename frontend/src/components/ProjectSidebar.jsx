import React from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Folder, Settings, LogOut, ChevronLeft, ChevronRight, Link2,
  List, LayoutDashboard, MessageCircle, Bell, Timer, Paperclip, Calendar, Hash
} from 'lucide-react';
import logo from '../assets/logo.png';

const TOOLS = [
  { key: 'BOARD',    label: 'Stack Board', icon: LayoutDashboard, color: 'text-amber-500' },
  { key: 'LIST',     label: 'Flow List',   icon: List,             color: 'text-[#8B4513]' },
  { key: 'CALENDAR', label: 'Calendar',    icon: Calendar,         color: 'text-amber-400' },
  { key: 'FILES',    label: 'Clip',        icon: Paperclip,        color: 'text-[#8D6E63]' },
  { key: 'TIMER',    label: 'Timesheet',   icon: Timer,            color: 'text-rose-400' },
  { key: 'NUDGE',    label: 'Nudge',       icon: Bell,             color: 'text-orange-400' },
  { key: 'HUDDLE',   label: 'Huddle',      icon: Hash,             color: 'text-[#20B2AA]' },
];

const ProjectSidebar = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onLogout,
  onSettingsClick,
  isCollapsed,
  setIsCollapsed,
  theme,
  currentView,
  onViewChange,
  onCreateProject,
}) => {
  const isActive = (key) => currentView === key;

  const navItem = (key, label, Icon, color) => (
    <button
      key={key}
      onClick={() => onViewChange(key)}
      title={isCollapsed ? label : undefined}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
        isCollapsed ? 'justify-center' : ''
      } ${
        isActive(key)
          ? 'bg-[#8B4513]/10 border border-[#8B4513]/20 text-[#8B4513]'
          : `${theme === 'light' ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-900' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'} border border-transparent`
      }`}
    >
      <Icon size={20} className={isActive(key) ? 'text-[#8B4513]' : color + (theme === 'light' ? '' : ' group-hover:text-slate-300')} />
      {!isCollapsed && <span className="font-medium">{label}</span>}
      {!isCollapsed && isActive(key) && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8B4513] animate-pulse" />
      )}
    </button>
  );

  return (
    <aside className={`backdrop-blur-3xl border-r flex flex-col transition-all duration-300 z-30 ${isCollapsed ? 'w-20' : 'w-72'} ${
      theme === 'light' ? 'bg-white/60 border-slate-200 shadow-xl' : 'bg-white/[0.01] border-white/5 shadow-2xl'
    }`}>
      {/* Header */}
      <div className={`p-6 flex items-center justify-between border-b ${theme === 'light' ? 'border-slate-200' : 'border-white/5'}`}>
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-[#8B4513] rounded-lg flex items-center justify-center shadow-lg shadow-amber-900/20 overflow-hidden p-1">
              <img src={logo} alt="Flowkit" className="w-full h-full object-contain" />
            </div>
            <span className={`font-bold text-xl tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Flowkit</span>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg transition-colors mx-auto ${theme === 'light' ? 'hover:bg-slate-100 text-slate-400 hover:text-slate-600' : 'hover:bg-white/5 text-slate-400'}`}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        {/* My Projects */}
        <div>
          <div className={`flex items-center justify-between mb-3 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
            {!isCollapsed && <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">My Projects</h3>}
            <button 
              onClick={onCreateProject}
              className={`p-1 rounded transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-white/5 text-slate-400'}`} 
              title="New Project"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                title={isCollapsed ? project.name : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  selectedProjectId === project.id
                    ? 'bg-[#8B4513]/10 text-[#8B4513] border border-[#8B4513]/20'
                    : `${theme === 'light' ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-900' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'} border border-transparent`
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Folder size={20} className={selectedProjectId === project.id ? 'text-[#8B4513]' : 'text-slate-500 group-hover:text-slate-300'} />
                {!isCollapsed && <span className="font-medium truncate">{project.name}</span>}
              </button>
            ))}
            {projects.length === 0 && !isCollapsed && (
              <p className="text-xs text-slate-600 px-2 py-1">No projects yet.</p>
            )}
          </div>
        </div>

        {/* Tools */}
        <div>
          {!isCollapsed && <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Tools</h3>}
          <div className="space-y-1">
            {TOOLS.map(({ key, label, icon: Icon, color }) => navItem(key, label, Icon, color))}
          </div>
        </div>

        {/* Workspace */}
        <div>
          {!isCollapsed && <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Workspace</h3>}
          <div className="space-y-1">
            <Link
              to="/dashboard/integrations"
              title={isCollapsed ? 'Integrations' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border border-transparent ${isCollapsed ? 'justify-center' : ''} ${
                theme === 'light' ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-900' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <Link2 size={20} />
              {!isCollapsed && <span className="font-medium">Integrations</span>}
            </Link>
            <button
              onClick={onSettingsClick}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border border-transparent ${isCollapsed ? 'justify-center' : ''} ${
                theme === 'light' ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-900' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <Settings size={20} />
              {!isCollapsed && <span className="font-medium">Settings</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${theme === 'light' ? 'border-slate-200' : 'border-white/5'}`}>
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


