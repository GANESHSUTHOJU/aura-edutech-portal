import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  FileText, 
  ClipboardCheck, 
  Award, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  User,
  Zap,
  Layers,
  Cpu,
  Target
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const studentItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Knowledge', icon: <Layers size={20} />, path: '/courses' },
    { name: 'Live Synapse', icon: <Zap size={20} />, path: '/live' },
    { name: 'Missions', icon: <Target size={20} />, path: '/assignments' },
    { name: 'Accolades', icon: <Award size={20} />, path: '/certificates' },
    { name: 'Neural Profile', icon: <User size={20} />, path: '/profile' },
  ];

  const facultyItems = [
    { name: 'Intel Center', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Knowledge Base', icon: <BookOpen size={20} />, path: '/faculty' },
    { name: 'Node Network', icon: <GraduationCap size={20} />, path: '/students' },
    { name: 'Neural Profile', icon: <User size={20} />, path: '/profile' },
  ];

  const adminItems = [
    { name: 'Overdrive', icon: <Cpu size={20} />, path: '/admin' },
    { name: 'Node Control', icon: <GraduationCap size={20} />, path: '/admin/users' },
    { name: 'Log Registry', icon: <FileText size={20} />, path: '/logs' },
    { name: 'Neural Profile', icon: <User size={20} />, path: '/profile' },
  ];

  const items = user?.role === 'admin' ? adminItems : 
                user?.role === 'faculty' ? facultyItems : 
                studentItems;

  return (
    <aside className={`h-screen bg-white/80 dark:bg-dark-card/80 backdrop-blur-3xl border-r border-slate-100 dark:border-dark-border transition-all duration-500 flex flex-col z-[100] ${isCollapsed ? 'w-24' : 'w-72'}`}>
      <div className="h-24 flex items-center justify-between px-8 border-b border-slate-50 dark:border-dark-border/50">
        {!isCollapsed ? (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 font-black text-2xl tracking-tighter"
          >
            <div className="w-10 h-10 bg-[#FF5722] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20 transform rotate-12">
              <span className="transform -rotate-12">A</span>
            </div>
            <span className="text-[#1A237E] dark:text-white">AUra<span className="text-[#FF5722]">Edutech</span></span>
          </motion.div>
        ) : (
          <div className="w-12 h-12 bg-[#FF5722] rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl shadow-orange-500/20 transform rotate-12">
            <span className="transform -rotate-12 text-xl font-black">A</span>
          </div>
        )}
      </div>

      <div className="flex-1 py-10 px-6 space-y-3 overflow-y-auto custom-scrollbar">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) => 
              `flex items-center gap-5 px-5 py-4 rounded-[20px] transition-all duration-300 group relative ${
                isActive 
                  ? 'bg-[#1A237E] text-white shadow-2xl shadow-blue-900/30 translate-x-2' 
                  : 'text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-dark-bg'
              }`
            }
          >
            <span className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${isCollapsed ? 'mx-auto' : ''}`}>{item.icon}</span>
            {!isCollapsed && <span className="font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">{item.name}</span>}
            
            {/* Active Indicator Pin */}
            {({ isActive }) => isActive && !isCollapsed && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute right-4 w-1.5 h-1.5 bg-[#FF5722] rounded-full shadow-[0_0_8px_rgba(255,87,34,0.8)]"
              />
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-6 border-t border-slate-50 dark:border-dark-border/50">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-5 px-5 py-4 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-[20px] transition-all group"
        >
          <LogOut size={20} className="shrink-0 group-hover:rotate-12 transition-transform" />
          {!isCollapsed && <span className="font-black text-[10px] uppercase tracking-[0.2em]">Terminate Session</span>}
        </button>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mt-6 w-full flex items-center justify-center p-3 text-slate-300 hover:text-primary transition-all bg-slate-50/50 dark:bg-dark-bg/50 rounded-xl"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
