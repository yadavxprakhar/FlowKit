import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ProjectSidebar from './ProjectSidebar';
import StackBoard from './StackBoard';
import HuddleView from './HuddleView';
import TaskModal from './TaskModal';
import TimerWidget from './TimerWidget';
import NotificationDropdown from './NotificationDropdown';
import ListView from './ListView';
import CalendarView from './CalendarView';
import FilesView from './FilesView';
import SettingsModal from './SettingsModal';
import UserMenu from './UserMenu';
import TimesheetView from './TimesheetView';
import { Search, Bell, User, ChevronDown, Share2, Filter, Plus } from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('dark'); // 'light', 'dark', 'system'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('profile');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectClient, setNewProjectClient] = useState('');
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('userAvatar'));
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const updateAvatar = () => setAvatarUrl(localStorage.getItem('userAvatar'));
    window.addEventListener('avatarUpdate', updateAvatar);
    return () => window.removeEventListener('avatarUpdate', updateAvatar);
  }, []);
  const [activeTimerTask, setActiveTimerTask] = useState(null); // {id, title}
  const location = useLocation();
  const [currentView, setCurrentView] = useState(location.state?.view || 'BOARD'); // BOARD, LIST, CALENDAR, FILES, HUDDLE, TIMER, NUDGE
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const openSettings = (tab = 'profile') => {
    setSettingsTab(tab);
    setIsSettingsModalOpen(true);
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProjects();
    fetchNotifications();
  }, [token, navigate]);

  useEffect(() => {
    if (selectedProjectId && currentView === 'BOARD') {
      fetchTasks(selectedProjectId);
    }
  }, [selectedProjectId, currentView]);

  const fetchProjects = async () => {
    try {
      console.log('Fetching projects...');
      const response = await axios.get('http://localhost:8080/api/v1/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Projects fetched:', response.data);
      setProjects(response.data);
      if (response.data.length > 0 && !selectedProjectId) {
        setSelectedProjectId(response.data[0].id);
      } else if (response.data.length === 0) {
        setIsLoading(false); // No projects to load tasks for
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Connection lost. Please ensure your backend is running.');
      setIsLoading(false);
    }
  };

  const fetchTasks = async (projectId) => {
    setIsLoading(true);
    try {
      console.log('Fetching tasks for project:', projectId);
      const response = await axios.get(`http://localhost:8080/api/v1/tasks/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Tasks fetched:', response.data);
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/api/v1/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateProject = async (e) => {
    e?.preventDefault();
    if (!newProjectName.trim()) return;
    
    setIsCreatingProject(true);
    try {
      const response = await axios.post('http://localhost:8080/api/v1/projects', 
        { 
          name: newProjectName,
          clientName: newProjectClient
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjects([...projects, response.data]);
      setSelectedProjectId(response.data.id);
      setIsNewProjectModalOpen(false);
      setNewProjectName('');
      setNewProjectClient('');
      setCurrentView('BOARD');
    } catch (err) {
      console.error('Failed to create project:', err);
      setError('Failed to create project. Please try again.');
    } finally {
      setIsCreatingProject(false);
    }
  };

  const currentProject = projects.find(p => p.id === selectedProjectId);

  // Determine actual display theme
  const displayTheme = theme === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  return (
    <div className={`flex h-screen overflow-hidden font-sans relative transition-all duration-500 ${displayTheme === 'light' ? 'bg-[#FDFBF7] text-[#2D1E15]' : 'bg-[#0F0906] text-[#D7CCC8]'}`}>
      {/* Background Orbs for Consistency */}
      <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none animate-pulse ${displayTheme === 'light' ? 'bg-[#8B4513]/10' : 'bg-[#8B4513]/10'}`}></div>
      <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none animate-pulse ${displayTheme === 'light' ? 'bg-[#20B2AA]/10' : 'bg-[#20B2AA]/10'}`} style={{ animationDelay: '1.5s' }}></div>
      <div className={`absolute top-[30%] right-[10%] w-[20%] h-[20%] rounded-full blur-[80px] pointer-events-none ${displayTheme === 'light' ? 'bg-amber-100/30' : 'bg-amber-900/5'}`}></div>

      <ProjectSidebar 
        projects={projects} 
        selectedProjectId={selectedProjectId} 
        onSelectProject={(id) => {
          setSelectedProjectId(id);
          setCurrentView('BOARD');
        }}
        onLogout={handleLogout}
        onSettingsClick={() => openSettings('profile')}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        theme={displayTheme}
        currentView={currentView}
        onViewChange={setCurrentView}
        onCreateProject={() => setIsNewProjectModalOpen(true)}
      />

      <main className="flex-1 flex flex-col relative overflow-hidden bg-transparent">
        {/* Header */}
        <header className={`h-20 border-b flex items-center justify-between px-8 z-20 backdrop-blur-xl ${displayTheme === 'light' ? 'bg-white/40 border-slate-200' : 'bg-white/[0.02] border-white/5'}`}>
          <div className="flex items-center gap-6 flex-1">
            <div className="relative w-full max-w-md group">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 group-focus-within:text-[#8B4513] transition-colors ${displayTheme === 'light' ? 'text-slate-400' : 'text-slate-500'}`} />
              <input 
                type="text" 
                placeholder="Search tasks, projects..." 
                className={`w-full border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all ${
                  displayTheme === 'light' 
                    ? 'bg-white border-slate-200 text-slate-900 placeholder-slate-400' 
                    : 'bg-white/5 border-white/10 text-white placeholder-slate-500'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 hover:bg-white/5 rounded-xl text-slate-400 transition-colors relative">
                <Bell size={20} />
                {notifications.some(n => !n.isRead) && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#8B4513] rounded-full border-2 border-[#0F0906]"></span>
                )}
              </button>
              <NotificationDropdown 
                isOpen={isNotificationsOpen} 
                notifications={notifications} 
                onClose={() => setIsNotificationsOpen(false)}
                onMarkAsRead={handleMarkAsRead}
                theme={displayTheme}
              />
            </div>
            <div className={`h-8 w-px mx-2 ${displayTheme === 'light' ? 'bg-slate-200' : 'bg-white/5'}`}></div>
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center gap-3 p-1.5 rounded-xl transition-all group ${displayTheme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-white/5'}`}>
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-tr from-[#8B4513] to-amber-900 flex items-center justify-center shadow-lg shadow-amber-900/20">
                  {avatarUrl ? (
                    <img src={`http://localhost:8080${avatarUrl}`} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} className="text-white" />
                  )}
                </div>
                <ChevronDown size={16} className={`transition-colors ${displayTheme === 'light' ? 'text-slate-400 group-hover:text-slate-600' : 'text-slate-500 group-hover:text-slate-300'}`} />
              </button>
              <UserMenu 
                isOpen={isUserMenuOpen} 
                onClose={() => setIsUserMenuOpen(false)} 
                onLogout={handleLogout}
                onProfileClick={() => openSettings('profile')}
                onAddAccountClick={() => navigate('/register')}
                onSecurityClick={() => openSettings('security')}
                theme={displayTheme}
              />
            </div>
          </div>
        </header>

        {/* Board Header */}
        <div className="px-8 pt-8 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              <span>Projects</span>
              <span className={displayTheme === 'light' ? 'text-slate-300' : 'text-slate-700'}>/</span>
              <span className="text-[#8B4513]">{currentProject?.name}</span>
            </div>
            <h2 className={`text-3xl font-bold tracking-tight flex items-center gap-3 ${displayTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              {currentProject?.name || "Loading..."}
              <ChevronDown size={20} className="text-slate-600 mt-1 cursor-pointer" />
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium transition-all ${
              displayTheme === 'light' ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}>
              <Filter size={16} />
              Filters
            </button>
            <button 
              onClick={() => setIsTaskModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2 bg-[#8B4513] hover:bg-[#5D2E0A] rounded-xl text-sm font-bold text-white shadow-lg shadow-amber-900/20 transition-all active:scale-[0.98]">
              <Plus size={18} />
              New Task
            </button>
          </div>
        </div>

        {/* View Switcher */}
        <div className={`px-8 mt-6 flex gap-8 border-b z-10 overflow-x-auto ${displayTheme === 'light' ? 'border-slate-100' : 'border-white/5'}`}>
          {[
            { key: 'BOARD',    label: 'Stack Board' },
            { key: 'LIST',     label: 'Flow List' },
            { key: 'CALENDAR', label: 'Schedule' },
            { key: 'FILES',    label: 'Clip' },
            { key: 'HUDDLE',   label: 'Huddle' },
            { key: 'TIMER',    label: 'Timer' },
            { key: 'NUDGE',    label: 'Nudge' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCurrentView(key)}
              className={`pb-4 text-sm font-bold whitespace-nowrap transition-all ${
                currentView === key 
                  ? 'text-[#8B4513] border-b-2 border-[#8B4513]' 
                  : `text-slate-500 ${displayTheme === 'light' ? 'hover:text-slate-900' : 'hover:text-slate-300'}`
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && (
          <div className="px-8 mt-4">
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
              {error}
            </div>
          </div>
        )}

        {/* Main View Container */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {currentView === 'BOARD' && (
            <StackBoard 
              tasks={filteredTasks} 
              isLoading={isLoading} 
              onTaskSelect={(task) => setActiveTimerTask({ id: task.id, title: task.title })}
              theme={displayTheme}
            />
          )}
          {currentView === 'HUDDLE' && <HuddleView projectId={selectedProjectId} projectName={currentProject?.name} theme={displayTheme} />}
          {currentView === 'LIST' && <ListView tasks={filteredTasks} isLoading={isLoading} theme={displayTheme} />}
          {currentView === 'CALENDAR' && <CalendarView tasks={filteredTasks} theme={displayTheme} />}
          {currentView === 'FILES' && <FilesView theme={displayTheme} />}
          {currentView === 'TIMER' && (
            <TimesheetView 
              projectId={selectedProjectId} 
              projectName={currentProject?.name} 
              clientName={currentProject?.clientName}
              theme={displayTheme} 
            />
          )}
          {currentView === 'NUDGE' && (
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-2xl mx-auto">
                <h3 className={`text-2xl font-bold mb-6 ${displayTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>Nudge — Notifications</h3>
                {notifications.length === 0 ? (
                  <div className={`p-12 border rounded-[40px] text-center ${
                    displayTheme === 'light' ? 'bg-white border-slate-100' : 'bg-white/[0.02] border-white/5'
                  }`}>
                    <div className="w-12 h-12 rounded-2xl bg-orange-400/10 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                    </div>
                    <p className="text-slate-500 font-medium">You're all caught up!</p>
                    <p className="text-xs text-slate-600 mt-1">No pending notifications.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${
                        n.isRead 
                          ? `opacity-60 ${displayTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.01] border-white/5'}` 
                          : `${displayTheme === 'light' ? 'bg-white border-[#8B4513]/20 shadow-lg shadow-amber-900/5' : 'bg-[#1A120E] border-[#8B4513]/20'}`
                      }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.isRead ? 'bg-slate-400' : 'bg-[#8B4513] animate-pulse'}`} />
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${n.isRead ? 'text-slate-500' : (displayTheme === 'light' ? 'text-slate-900' : 'text-white')}`}>{n.message}</p>
                          <p className="text-xs text-slate-500 mt-1">{new Date(n.createdAt).toLocaleString('en-IN')}</p>
                        </div>
                        {!n.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(n.id)}
                            className="text-xs text-[#20B2AA] hover:underline shrink-0 font-bold"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        projectId={selectedProjectId}
        onTaskCreated={() => fetchTasks(selectedProjectId)}
        theme={displayTheme}
      />

      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
        theme={theme}
        setTheme={setTheme}
        initialTab={settingsTab}
      />

      <TimerWidget 
        taskId={activeTimerTask?.id} 
        taskTitle={activeTimerTask?.title} 
        theme={displayTheme}
      />

      {/* New Project Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className={`absolute inset-0 backdrop-blur-sm ${displayTheme === 'light' ? 'bg-slate-900/20' : 'bg-[#0F0906]/80'}`}
            onClick={() => setIsNewProjectModalOpen(false)}
          />
          <div className={`relative w-full max-w-md border rounded-[32px] p-8 shadow-2xl shadow-amber-900/20 ${
            displayTheme === 'light' ? 'bg-white border-slate-200' : 'bg-[#1A120E] border-[#8B4513]/20'
          }`}>
            <h3 className={`text-2xl font-bold mb-2 ${displayTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>Create New Project</h3>
            <p className="text-slate-500 text-sm mb-8">Give your project a name to get started.</p>
            
            <form onSubmit={handleCreateProject} className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">Project Name</label>
                <input 
                  autoFocus
                  type="text"
                  placeholder="e.g. Website Redesign"
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all font-semibold ${
                    displayTheme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400' : 'bg-white/5 border-white/10 text-white placeholder-slate-600'
                  }`}
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">Client Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Acme Corp"
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all font-semibold ${
                    displayTheme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400' : 'bg-white/5 border-white/10 text-white placeholder-slate-600'
                  }`}
                  value={newProjectClient}
                  onChange={(e) => setNewProjectClient(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className={`flex-1 py-3 px-4 rounded-xl border font-bold transition-all ${
                    displayTheme === 'light' ? 'border-slate-200 text-slate-500 hover:bg-slate-50' : 'border-white/10 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingProject || !newProjectName.trim()}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#8B4513] hover:bg-[#5D2E0A] text-white font-bold transition-all shadow-lg shadow-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreatingProject ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


