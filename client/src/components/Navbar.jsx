import { useAuth } from '../context/AuthContext';
import { Bell, Search, Sun, Moon, User, LogOut, ChevronDown, Sparkles, Command } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <nav className="h-20 border-b border-slate-100 dark:border-dark-border/50 bg-white/70 dark:bg-dark-card/70 backdrop-blur-3xl sticky top-0 z-[90] flex items-center justify-between px-10">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative max-w-md w-full hidden xl:block">
          <div className="absolute inset-y-0 left-5 flex items-center text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search intellectual artifacts..."
            className="w-full pl-14 pr-12 py-3.5 bg-slate-50 dark:bg-dark-bg/50 rounded-2xl border-none focus:ring-4 focus:ring-primary/5 text-xs font-black uppercase tracking-widest transition-all shadow-inner"
          />
          <div className="absolute inset-y-0 right-4 flex items-center gap-1 opacity-40">
             <Command size={14} /> <span className="text-[10px] font-black">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-dark-bg/50 rounded-2xl">
          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all ${!isDark ? 'bg-white text-primary shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Sun size={18} />
          </button>
          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-primary'}`}
          >
            <Moon size={18} />
          </button>
        </div>
        
        <div className="w-px h-8 bg-slate-100 dark:bg-dark-border mx-2"></div>

        <button className="p-3 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-2xl text-slate-400 hover:text-primary hover:shadow-xl transition-all relative group">
          <Bell size={22} className="group-hover:animate-bounce" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#FF5722] rounded-full border-4 border-white dark:border-dark-card shadow-[0_0_8px_rgba(255,87,34,0.5)]"></span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-4 pl-4 hover:bg-slate-50/50 dark:hover:bg-dark-bg/50 transition-all py-1.5 pr-2 rounded-2xl group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-[#1A237E] dark:text-white uppercase tracking-tighter">{user?.name}</p>
              <div className="flex items-center justify-end gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">{user?.role} NODE</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-[20px] bg-gradient-to-br from-[#1A237E] to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-900/20 group-hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity z-10"></div>
              <img 
                src={user?.profileImage || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=1A237E&color=fff&bold=true&size=128`} 
                alt={user?.name || 'Profile'}
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown size={16} className={`text-slate-300 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-64 bg-white/95 dark:bg-dark-card/95 backdrop-blur-2xl border border-slate-100 dark:border-dark-border rounded-[32px] shadow-2xl py-3 z-[100] overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-slate-50 dark:border-dark-border/50 mb-2">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Neural Signature</p>
                   <p className="text-sm font-black text-[#1A237E] dark:text-white truncate">{user?.email}</p>
                </div>
                <Link 
                  to="/profile" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-[calc(100%-16px)] flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-bg hover:text-primary transition-all mx-2 rounded-2xl"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User size={18} className="text-primary" />
                  </div>
                  Neural Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                  className="w-[calc(100%-16px)] flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all mx-2 rounded-2xl"
                >
                  <div className="p-2 bg-rose-500/10 rounded-lg">
                    <LogOut size={18} className="text-rose-500" />
                  </div>
                  Terminate Sync
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
