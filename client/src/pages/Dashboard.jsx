import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  PlayCircle, 
  FileText,
  Calendar,
  ChevronRight,
  Video,
  Award,
  Zap,
  Target,
  Sparkles,
  ArrowUpRight,
  Search,
  Bell,
  MoreVertical
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const learningData = [
  { name: 'Mon', hours: 2, efficiency: 85 },
  { name: 'Tue', hours: 4, efficiency: 92 },
  { name: 'Wed', hours: 3, efficiency: 78 },
  { name: 'Thu', hours: 5, efficiency: 95 },
  { name: 'Fri', hours: 6, efficiency: 88 },
  { name: 'Sat', hours: 4, efficiency: 90 },
  { name: 'Sun', hours: 2, efficiency: 82 },
];

const StatCard = ({ icon, label, value, color, trend, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-6 bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-[80px] transition-transform group-hover:scale-110`}></div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${color} shadow-lg shadow-current/20`}>
        {icon}
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg uppercase tracking-wider">
          <ArrowUpRight size={12} /> {trend}
        </span>
      )}
    </div>
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
    <p className="text-3xl font-black text-[#1A237E] dark:text-white mt-1">{value}</p>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo?.token) return;
        
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('http://localhost:5000/api/users/my-courses', config);
        setEnrolledCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
      setIsLoading(false);
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-24">
      {/* Dynamic Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-[#1A237E] dark:text-white flex items-center gap-4">
            <div className="p-3 bg-primary text-white rounded-[24px] shadow-2xl shadow-primary/30">
              <Sparkles size={32} />
            </div>
            Neural Learning Hub
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-bold text-lg">Synchronizing your cognitive growth metrics, {user?.name}.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="hidden xl:flex flex-col items-end">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Iteration</p>
              <p className="text-sm font-black text-[#1A237E] dark:text-white">Summer 2026 Batch</p>
           </div>
           <div className="w-px h-10 bg-slate-100 dark:bg-dark-border mx-2"></div>
           <button className="px-8 py-4 bg-[#FF5722] text-white rounded-[20px] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all">
             Launch Live Session
           </button>
        </div>
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          icon={<BookOpen size={26} />} 
          label="Active Curriculum" 
          value={enrolledCourses.length.toString().padStart(2, '0')} 
          color="from-[#1A237E] to-blue-600"
          trend="8% Growth"
          delay={0.1}
        />
        <StatCard 
          icon={<CheckCircle size={26} />} 
          label="Milestones Reached" 
          value="14" 
          color="from-[#FF5722] to-orange-500"
          trend="Top 5%"
          delay={0.2}
        />
        <StatCard 
          icon={<Clock size={26} />} 
          label="Cognitive Hours" 
          value="128.5" 
          color="from-indigo-600 to-purple-600"
          trend="+12h / week"
          delay={0.3}
        />
        <StatCard 
          icon={<Award size={26} />} 
          label="Skill Accolades" 
          value="06" 
          color="from-emerald-600 to-teal-600"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Deep Learning Progress */}
        <div className="xl:col-span-2 glass-card p-10 bg-white/70 dark:bg-dark-card/70 border-slate-100/50 dark:border-dark-border/50">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-[#1A237E] dark:text-white flex items-center gap-3">
                <Target className="text-primary" size={28} /> Learning Velocity
              </h3>
              <p className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-widest">Efficiency vs Engagement Matrix</p>
            </div>
            <div className="flex bg-slate-100/50 dark:bg-dark-bg p-1.5 rounded-2xl">
               <button className="px-6 py-2 text-[10px] font-black bg-white dark:bg-dark-card rounded-xl shadow-xl uppercase tracking-widest">Real-time</button>
               <button className="px-6 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Historical</button>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningData}>
                <defs>
                  <linearGradient id="colorLearning" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A237E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1A237E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)', padding: '16px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#1A237E" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorLearning)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Inventory */}
        <div className="glass-card p-10 bg-white/70 dark:bg-dark-card/70 border-slate-100/50 dark:border-dark-border/50 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-[#1A237E] dark:text-white uppercase tracking-tighter">Inventory</h3>
            <MoreVertical size={20} className="text-slate-300" />
          </div>
          
          <div className="space-y-6 flex-1 overflow-y-auto pr-4 custom-scrollbar">
            {enrolledCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 dark:bg-dark-bg rounded-3xl flex items-center justify-center text-slate-200">
                  <BookOpen size={40} />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Inventory Empty</p>
              </div>
            ) : (
              enrolledCourses.map((course, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-5 p-4 rounded-[28px] bg-white dark:bg-dark-card hover:shadow-2xl hover:shadow-primary/5 transition-all group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-dark-border"
                >
                  <div className="w-20 h-20 shrink-0 rounded-[22px] overflow-hidden shadow-inner bg-slate-50 relative">
                    <img src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm text-slate-800 dark:text-white truncate tracking-tight">{course.title}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Sync Progress</span>
                        <span className="text-[10px] font-black text-primary">0%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-dark-bg rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `15%` }}
                          className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(26,35,126,0.3)]" 
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
          <button className="w-full mt-10 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-[20px] hover:bg-black transition-all shadow-xl shadow-slate-900/20 active:scale-95">
            Sync All Artifacts
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Premium Live Broadcast Node */}
         <div className="bg-gradient-to-br from-[#1A237E] via-[#3949AB] to-primary p-12 rounded-[48px] text-white relative overflow-hidden group shadow-2xl shadow-blue-900/40">
            <div className="relative z-10 max-w-lg">
              <div className="flex items-center gap-3 mb-8">
                <span className="px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">Live Node Active</span>
                <span className="w-3 h-3 bg-rose-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(244,63,94,1)]"></span>
              </div>
              <h3 className="text-4xl font-black mb-4 tracking-tighter">Advanced Neural Architectures</h3>
              <p className="text-blue-100/70 text-lg font-medium leading-relaxed mb-10">Join Dr. Sarah Chen for a deep exploration into transformer-based cognitive models.</p>
              <div className="flex flex-wrap items-center gap-6">
                <button className="px-10 py-5 bg-white text-[#1A237E] font-black text-[10px] uppercase tracking-[0.3em] rounded-[24px] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/20">
                  Join Synchronization
                </button>
                <div className="flex -space-x-4">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-12 h-12 rounded-[18px] border-4 border-[#1A237E] bg-slate-800 shadow-xl overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${i}`} className="w-full h-full object-cover" />
                     </div>
                   ))}
                   <div className="w-12 h-12 rounded-[18px] border-4 border-[#1A237E] bg-white/20 backdrop-blur-xl flex items-center justify-center text-xs font-black shadow-xl">+128</div>
                </div>
              </div>
            </div>
            {/* Background Aesthetic */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 right-0 p-12 opacity-5 scale-[2] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
               <Video size={150} />
            </div>
         </div>

         {/* Mission Queue */}
         <div className="glass-card p-10 bg-white/70 dark:bg-dark-card/70 border-slate-100/50 dark:border-dark-border/50">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-2xl font-black text-[#1A237E] dark:text-white uppercase tracking-tighter">Mission Queue</h3>
               <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">Full Archive</button>
            </div>
            <div className="space-y-5">
               {[
                 { title: 'Neural Network Optimization', subject: 'Core AI', due: '02h 45m', type: 'Critical' },
                 { title: 'Data Pipeline Synthesis', subject: 'Backend Systems', due: '12 May', type: 'Secondary' }
               ].map((task, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-white dark:bg-dark-card rounded-[32px] border border-slate-100 dark:border-dark-border hover:shadow-2xl transition-all group">
                    <div className="flex items-center gap-5">
                       <div className="w-16 h-16 bg-slate-50 dark:bg-dark-bg rounded-[22px] flex items-center justify-center shadow-inner text-[#1A237E] dark:text-white transition-transform group-hover:scale-110">
                          <FileText size={26} />
                       </div>
                       <div>
                          <p className="font-black text-base text-slate-800 dark:text-white tracking-tight">{task.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${task.type === 'Critical' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'}`}>
                              {task.type}
                            </span>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{task.subject} • Due {task.due}</p>
                          </div>
                       </div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-dark-bg rounded-xl text-slate-300 group-hover:text-primary transition-all">
                      <ChevronRight size={22} />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
