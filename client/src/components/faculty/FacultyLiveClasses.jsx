import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  Calendar, 
  Plus, 
  Clock, 
  Users, 
  Play, 
  Settings as SettingsIcon,
  MoreVertical,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Mic,
  Camera,
  Monitor
} from 'lucide-react';

const FacultyLiveClasses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScheduling, setIsScheduling] = useState(false);
  
  const upcomingClasses = [
    { id: 1, title: 'React Performance Optimization', course: 'React Masterclass', date: 'May 15, 2024', time: '10:00 AM', enrolled: 145, status: 'upcoming' },
    { id: 2, title: 'UI Design Systems Q&A', course: 'UI/UX Fundamentals', date: 'May 16, 2024', time: '02:00 PM', enrolled: 89, status: 'upcoming' },
    { id: 3, title: 'Python for Data Science Workshop', course: 'Data Science Pro', date: 'May 18, 2024', time: '11:30 AM', enrolled: 210, status: 'upcoming' },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  if (isLoading) {
    return (
      <div className="p-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-[10px]">Initializing Streaming Hub...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Live Status Card */}
      <div className="glass-card p-10 bg-[#1A237E] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-3 h-3 bg-rose-500 rounded-full animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-400">Stream Status: Ready</span>
            </div>
            <h2 className="text-4xl font-black">Broadcast Live Session</h2>
            <p className="text-slate-300 font-medium max-w-md">Connect with your students in real-time. Share your screen, host Q&As, and record sessions for later review.</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <button className="px-8 py-3.5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/40 hover:scale-[1.02] transition-all flex items-center gap-2">
                <Play size={18} fill="currentColor" /> Start Instant Session
              </button>
              <button 
                onClick={() => setIsScheduling(true)}
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <Calendar size={18} /> Schedule Workshop
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
             <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                <Mic size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-[10px] font-black uppercase opacity-60">Audio Level</p>
                <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-400 w-3/4"></div>
                </div>
             </div>
             <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                <Camera size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-[10px] font-black uppercase opacity-60">Video Quality</p>
                <p className="text-xs font-black mt-1">4K ULTRA HD</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black flex items-center gap-2">
              <Clock className="text-primary" size={24} /> Scheduled Intelligence
            </h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{upcomingClasses.length} SESSIONS PLANNED</span>
          </div>

          <div className="space-y-4">
            {upcomingClasses.map((session, i) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border group hover:border-primary/30 transition-all flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-dark-bg flex flex-col items-center justify-center border border-slate-100 dark:border-dark-border group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="text-xs font-black">{session.date.split(' ')[1].replace(',', '')}</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest opacity-60">{session.date.split(' ')[0]}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#1A237E] dark:text-white group-hover:text-primary transition-all">{session.title}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{session.course}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{session.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Users size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{session.enrolled} Joined</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="p-3 bg-slate-100 dark:bg-dark-bg text-slate-500 hover:text-primary rounded-xl transition-all">
                    <LinkIcon size={18} />
                  </button>
                  <button className="p-3 bg-slate-100 dark:bg-dark-bg text-slate-500 hover:text-primary rounded-xl transition-all">
                    <SettingsIcon size={18} />
                  </button>
                  <button className="px-6 py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                    Launch Stream
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="glass-card p-8 bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Monitor size={16} /> Stream Configuration
            </h4>
            <div className="space-y-6">
               <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark-bg rounded-2xl">
                  <span className="text-xs font-bold">Auto-Record Session</span>
                  <div className="w-10 h-5 bg-primary rounded-full relative">
                     <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark-bg rounded-2xl">
                  <span className="text-xs font-bold">Enable Chat</span>
                  <div className="w-10 h-5 bg-primary rounded-full relative">
                     <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark-bg rounded-2xl">
                  <span className="text-xs font-bold">Wait for Instructor</span>
                  <div className="w-10 h-5 bg-slate-200 rounded-full relative">
                     <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
               </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-6 text-center italic">These settings apply to all upcoming live sessions.</p>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
            <h4 className="text-xs font-black uppercase tracking-widest opacity-70 mb-4">Zoom Integration</h4>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Video size={24} />
               </div>
               <div>
                  <p className="text-xs font-black">Connected</p>
                  <p className="text-[10px] opacity-60">instructor.zoom.account</p>
               </div>
            </div>
            <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
              Manage API Keys <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyLiveClasses;
