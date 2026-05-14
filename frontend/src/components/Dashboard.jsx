import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('userAvatar'));
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const updateAvatar = () => setAvatarUrl(localStorage.getItem('userAvatar'));
    window.addEventListener('avatarUpdate', updateAvatar);
    return () => window.removeEventListener('avatarUpdate', updateAvatar);
  }, []);
  const [activeTimerTask, setActiveTimerTask] = useState(null); // {id, title}
  const [currentView, setCurrentView] = useState('BOARD'); // 'BOARD' or 'HUDDLE'
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
        }}
        onLogout={handleLogout}
        onSettingsClick={() => openSettings('profile')}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        theme={displayTheme}
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
              <span className="text-slate-700">/</span>
              <span className="text-[#8B4513]">{currentProject?.name}</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              {currentProject?.name || "Loading..."}
              <ChevronDown size={20} className="text-slate-600 mt-1 cursor-pointer" />
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 transition-all">
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
        <div className="px-8 mt-6 flex gap-8 border-b border-white/5 z-10">
          <button 
            onClick={() => setCurrentView('BOARD')}
            className={`pb-4 text-sm font-bold transition-all ${currentView === 'BOARD' ? 'text-[#8B4513] border-b-2 border-[#8B4513]' : 'text-slate-500 hover:text-slate-300'}`}>
            Stack Board
          </button>
          <button 
            onClick={() => setCurrentView('HUDDLE')}
            className={`pb-4 text-sm font-bold transition-all ${currentView === 'HUDDLE' ? 'text-[#8B4513] border-b-2 border-[#8B4513]' : 'text-slate-500 hover:text-slate-300'}`}>
            Huddle
          </button>
          <button 
            onClick={() => setCurrentView('LIST')}
            className={`pb-4 text-sm font-bold transition-all ${currentView === 'LIST' ? 'text-[#8B4513] border-b-2 border-[#8B4513]' : 'text-slate-500 hover:text-slate-300'}`}>
            List View
          </button>
          <button 
            onClick={() => setCurrentView('CALENDAR')}
            className={`pb-4 text-sm font-bold transition-all ${currentView === 'CALENDAR' ? 'text-[#8B4513] border-b-2 border-[#8B4513]' : 'text-slate-500 hover:text-slate-300'}`}>
            Calendar
          </button>
          <button 
            onClick={() => setCurrentView('FILES')}
            className={`pb-4 text-sm font-bold transition-all ${currentView === 'FILES' ? 'text-[#8B4513] border-b-2 border-[#8B4513]' : 'text-slate-500 hover:text-slate-300'}`}>
            Files
          </button>
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
        </div>
      </main>

      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        projectId={selectedProjectId}
        onTaskCreated={() => fetchTasks(selectedProjectId)}
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
      />
    </div>
  );
};

export default Dashboard;


