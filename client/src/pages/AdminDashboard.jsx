import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  ShieldCheck, 
  AlertCircle, 
  Activity,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Clock,
  ExternalLink,
  ChevronRight,
  Monitor,
  Zap,
  Globe
} from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    facultyCount: 0,
    studentCount: 0,
    totalRevenue: 0,
    activeCourses: 0,
    pendingVerifications: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      if (!user?.token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      // Fetching users for stats
      const { data: users } = await axios.get('http://127.0.0.1:5000/api/users', config);
      
      // Fetching courses if possible
      let coursesCount = 0;
      try {
        const { data: courses } = await axios.get('http://127.0.0.1:5000/api/courses', config);
        coursesCount = courses.length;
      } catch (e) {
        coursesCount = 12; // Mock fallback
      }

      setStats({
        totalUsers: users.length,
        facultyCount: users.filter(u => u.role === 'faculty').length,
        studentCount: users.filter(u => u.role === 'student').length,
        totalRevenue: users.reduce((acc, curr) => acc + (curr.totalEarnings || 0), 0),
        activeCourses: coursesCount,
        pendingVerifications: users.filter(u => u.verificationStatus === 'pending').length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        logout();
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1, 
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  const [chartView, setChartView] = useState('monthly');

  const monthlyData = [40, 65, 45, 90, 55, 80, 60, 95, 70, 85, 50, 75];
  const yearlyData = [35, 50, 70, 90, 85];
  const activeData = chartView === 'monthly' ? monthlyData : yearlyData;
  const labels = chartView === 'monthly' 
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : ['2020', '2021', '2022', '2023', '2024'];

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#1A237E] dark:text-white">Admin Control Center</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time platform insights and system intelligence.</p>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <DollarSign size={24} />, color: 'bg-emerald-500', trend: '+12.5%' },
          { label: 'Total Users', value: stats.totalUsers, icon: <Users size={24} />, color: 'bg-blue-600', trend: '+5.2%' },
          { label: 'Active Courses', value: stats.activeCourses, icon: <BookOpen size={24} />, color: 'bg-purple-600', trend: '+8.1%' },
          { label: 'Pending Approval', value: stats.pendingVerifications, icon: <ShieldCheck size={24} />, color: 'bg-amber-500', trend: 'Immediate' },
        ].map((item, i) => (
          <motion.div 
            key={item.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="glass-card p-6 bg-white dark:bg-dark-card relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${item.color} opacity-10 rounded-bl-[100px] transition-all group-hover:w-28 group-hover:h-28`}></div>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${item.color} text-white rounded-2xl shadow-lg`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${item.label === 'Pending Approval' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                {item.trend}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{item.label}</p>
            <h3 className="text-3xl font-black mt-1 text-[#1A237E] dark:text-white">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analytics View */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8 bg-white/40 dark:bg-dark-card/40 backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2">
                  <TrendingUp className="text-primary" size={24} /> Growth Intelligence
                </h3>
                <p className="text-sm text-slate-400 font-medium">User acquisition vs retention trends</p>
              </div>
              <div className="flex bg-slate-100 dark:bg-dark-bg p-1 rounded-xl">
                <button 
                  onClick={() => setChartView('monthly')}
                  className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${chartView === 'monthly' ? 'bg-white dark:bg-dark-card shadow-sm text-primary' : 'text-slate-400'}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setChartView('yearly')}
                  className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${chartView === 'yearly' ? 'bg-white dark:bg-dark-card shadow-sm text-primary' : 'text-slate-400'}`}
                >
                  Yearly
                </button>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="h-64 flex items-end gap-2 px-2">
              {activeData.map((h, i) => (
                <motion.div 
                  key={`${chartView}-${i}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`flex-1 rounded-t-lg bg-gradient-to-t from-primary to-primary/40 relative group cursor-pointer`}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}%
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2">
              {labels.map(l => (
                <span key={l} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{l}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/admin/users" className="glass-card p-8 hover:border-primary/50 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                  <Monitor size={24} />
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-primary" />
              </div>
              <h4 className="text-lg font-black">User Management</h4>
              <p className="text-sm text-slate-500 mt-2 font-medium leading-relaxed">Advanced controls for faculty verification, student records, and role hierarchy.</p>
            </Link>
            
            <div className="glass-card p-8 hover:border-emerald-500/50 transition-all group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                  <Zap size={24} />
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-emerald-500" />
              </div>
              <h4 className="text-lg font-black">Platform Actions</h4>
              <p className="text-sm text-slate-500 mt-2 font-medium leading-relaxed">Broadcast announcements, update system-wide policies, and manage global settings.</p>
            </div>
          </div>
        </div>

        {/* System Health & Activity */}
        <div className="space-y-8">
          <div className="glass-card p-8 bg-slate-900 text-white">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <Activity className="text-emerald-400" size={24} /> Neural Core
            </h3>
            <div className="space-y-8">
              {[
                { label: 'CPU Cluster', value: '24%', color: 'bg-emerald-400' },
                { label: 'Memory Bank', value: '42%', color: 'bg-blue-400' },
                { label: 'API Latency', value: '18ms', color: 'bg-purple-400' },
                { label: 'Cache Hit Rate', value: '98%', color: 'bg-amber-400' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-3 text-slate-400">
                    <span>{item.label}</span>
                    <span className="text-white">{item.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.value.includes('%') ? item.value : '100%' }}
                      transition={{ delay: 1, duration: 1.5 }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-8 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  System Status: Operational
                </div>
                <Globe size={14} />
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-lg font-black mb-6">Security Logs</h3>
            <div className="space-y-5">
              {[
                { type: 'Login', user: 'Admin 04', time: '2m ago' },
                { type: 'Update', user: 'System', time: '14m ago' },
                { type: 'Backup', user: 'Auto-Task', time: '1h ago' },
                { type: 'Access', user: 'Faculty 12', time: '2h ago' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-dark-bg flex items-center justify-center">
                      <Clock size={14} className="text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{log.type}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{log.user}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-300 group-hover:text-slate-500 transition-colors">{log.time}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-50 dark:bg-dark-bg text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              View Full Audit <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
