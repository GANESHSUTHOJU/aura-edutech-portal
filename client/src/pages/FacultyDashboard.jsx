import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  Play, 
  Plus, 
  MessageSquare, 
  FileCheck,
  TrendingUp,
  MoreVertical,
  BookOpen,
  Star,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Layers,
  PieChart as PieIcon,
  Video,
  ClipboardList,
  GraduationCap,
  Wallet,
  Search,
  Bell,
  Settings as SettingsIcon,
  Filter,
  CheckCircle2,
  AlertCircle
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
import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCourse from '../components/faculty/CreateCourse';
import FacultyCourses from '../components/faculty/FacultyCourses';
import FacultyStudents from '../components/faculty/FacultyStudents';
import FacultyEarnings from '../components/faculty/FacultyEarnings';
import FacultyLiveClasses from '../components/faculty/FacultyLiveClasses';
import FacultyAssignments from '../components/faculty/FacultyAssignments';

const revenueData = [
  { name: 'Mon', amount: 4500 },
  { name: 'Tue', amount: 5200 },
  { name: 'Wed', amount: 4800 },
  { name: 'Thu', amount: 6100 },
  { name: 'Fri', amount: 5900 },
  { name: 'Sat', amount: 7200 },
  { name: 'Sun', amount: 6800 },
];

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreating, setIsCreating] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 2450,
    totalRevenue: 24500,
    activeCourses: 12,
    avgRating: 4.9,
    monthlyEarnings: 8200,
    pendingAssignments: 45,
    completionRate: 78
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Layers size={18} /> },
    { id: 'courses', label: 'My Courses', icon: <BookOpen size={18} /> },
    { id: 'students', label: 'Students', icon: <Users size={18} /> },
    { id: 'assignments', label: 'Assignments', icon: <ClipboardList size={18} /> },
    { id: 'earnings', label: 'Earnings', icon: <Wallet size={18} /> },
    { id: 'live', label: 'Live Classes', icon: <Video size={18} /> },
  ];

  const [verificationStatus, setVerificationStatus] = useState('approved');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo?.verificationStatus) {
      setVerificationStatus(userInfo.verificationStatus);
    }
  }, []);

  if (verificationStatus !== 'approved') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 max-w-lg text-center space-y-6 bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border-slate-100 dark:border-dark-border"
        >
          <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-[32px] flex items-center justify-center mx-auto mb-8 ring-8 ring-amber-500/5">
            <AlertCircle size={40} />
          </div>
          <h2 className="text-3xl font-black text-[#1A237E] dark:text-white uppercase tracking-tight">Account Pending</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Your instructor profile is currently being reviewed by our academic board. Access to the management suite will be granted once verification is complete.
          </p>
          <div className="pt-6">
            <div className="px-6 py-3 bg-slate-100 dark:bg-dark-bg rounded-2xl inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
              <Clock size={16} /> Estimated Time: 24-48 Hours
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isCreating || editingCourse) {
    return (
      <CreateCourse 
        course={editingCourse}
        onCancel={() => {
          setIsCreating(false);
          setEditingCourse(null);
        }} 
        onSuccess={() => {
          setIsCreating(false);
          setEditingCourse(null);
          setActiveTab('courses');
        }} 
      />
    );
  }

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: stats.totalStudents.toLocaleString(), trend: '+12.5%', icon: <Users size={22} />, color: 'from-blue-500 to-indigo-600' },
          { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, trend: '+8.2%', icon: <DollarSign size={22} />, color: 'from-emerald-500 to-teal-600' },
          { label: 'Monthly Earnings', value: `₹${stats.monthlyEarnings.toLocaleString()}`, trend: '+15.1%', icon: <Wallet size={22} />, color: 'from-violet-500 to-purple-600' },
          { label: 'Course Rating', value: stats.avgRating, trend: 'Top 5%', icon: <Star size={22} />, color: 'from-amber-400 to-orange-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 bg-white/70 dark:bg-dark-card/70 border-slate-100 dark:border-dark-border relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-[80px] group-hover:scale-110 transition-transform`}></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 bg-gradient-to-br ${stat.color} text-white rounded-2xl shadow-lg`}>
                {stat.icon}
              </div>
              <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={12} /> : null} {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-[#1A237E] dark:text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Performance */}
        <div className="lg:col-span-2 glass-card p-8 bg-white/70 dark:bg-dark-card/70 border-slate-100 dark:border-dark-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black flex items-center gap-2">
                <TrendingUp className="text-primary" size={24} /> Performance Matrix
              </h3>
              <p className="text-sm text-slate-400 font-medium">Weekly engagement and revenue analytics</p>
            </div>
            <div className="flex bg-slate-100 dark:bg-dark-bg p-1 rounded-xl">
              <button className="px-4 py-1.5 text-[10px] font-black bg-white dark:bg-dark-card rounded-lg shadow-sm uppercase tracking-wider">Weekly</button>
              <button className="px-4 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider">Monthly</button>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6D28D9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} 
                />
                <Tooltip 
                  cursor={{stroke: '#6D28D9', strokeWidth: 2}}
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#6D28D9" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-[#1A237E] to-[#3949AB] text-white">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-70 mb-6">Quick Overview</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><Play size={16} /></div>
                  <span className="text-sm font-bold">Active Courses</span>
                </div>
                <span className="text-lg font-black">{stats.activeCourses}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><ClipboardList size={16} /></div>
                  <span className="text-sm font-bold">Pending Assignments</span>
                </div>
                <span className="text-lg font-black">{stats.pendingAssignments}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><GraduationCap size={16} /></div>
                  <span className="text-sm font-bold">Completion Rate</span>
                </div>
                <span className="text-lg font-black">{stats.completionRate}%</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Student Satisfaction</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    className="h-full bg-emerald-400"
                  />
                </div>
                <span className="text-xs font-black">92%</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Recent Activity</h4>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-50 dark:border-dark-border last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Users size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">New enrollment in "React Mastery"</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl transition-all">
              View All Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20">
      {/* Top Navigation / Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#1A237E] dark:text-white flex items-center gap-3">
            <div className="p-2.5 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20">
              <GraduationCap size={28} />
            </div>
            Faculty Intelligence
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Premium instructor dashboard & content management portal.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search data, students, courses..."
              className="pl-12 pr-6 py-3 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 transition-all min-w-[300px] outline-none shadow-sm"
            />
          </div>
          <button className="p-3 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-2xl text-slate-600 hover:text-primary hover:shadow-lg transition-all relative">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-dark-card"></span>
          </button>
          <button 
            onClick={() => setIsCreating(true)}
            className="px-8 py-3.5 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Create Course
          </button>
        </div>
      </div>

      {/* Modern Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/50 dark:bg-dark-bg/50 backdrop-blur-xl rounded-[24px] w-fit border border-slate-200/50 dark:border-dark-border/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-[20px] text-xs font-black uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-white dark:bg-dark-card text-primary shadow-xl shadow-slate-200/50 dark:shadow-none' 
                : 'text-slate-500 hover:text-primary hover:bg-white/50 dark:hover:bg-dark-card/50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'courses' && (
            <FacultyCourses 
              onCreate={() => setIsCreating(true)} 
              onEdit={(course) => setEditingCourse(course)} 
            />
          )}
          {activeTab === 'students' && <FacultyStudents />}
          {activeTab === 'assignments' && <FacultyAssignments />}
          {activeTab === 'earnings' && <FacultyEarnings />}
          {activeTab === 'live' && <FacultyLiveClasses />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FacultyDashboard;
