import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Calendar, 
  CreditCard, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  IndianRupee,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const FacultyEarnings = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const COLORS = ['#6D28D9', '#3B82F6', '#10B981', '#F59E0B'];
  
  const courseDistribution = [
    { name: 'React Masterclass', value: 45 },
    { name: 'UI/UX Design', value: 25 },
    { name: 'Data Science', value: 20 },
    { name: 'Node.js Backend', value: 10 },
  ];

  const transactionData = [
    { id: 'TRX-9082', student: 'Aarav Sharma', course: 'React Masterclass', amount: 1999, date: 'May 12, 2024', status: 'completed' },
    { id: 'TRX-9083', student: 'Ishani Patel', course: 'UI/UX Design', amount: 2499, date: 'May 11, 2024', status: 'completed' },
    { id: 'TRX-9084', student: 'Rohan Gupta', course: 'Data Science', amount: 1999, date: 'May 10, 2024', status: 'pending' },
    { id: 'TRX-9085', student: 'Ananya Iyer', course: 'React Masterclass', amount: 1999, date: 'May 10, 2024', status: 'completed' },
    { id: 'TRX-9086', student: 'Vikram Singh', course: 'Node.js Backend', amount: 1499, date: 'May 09, 2024', status: 'completed' },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  if (isLoading) {
    return (
      <div className="p-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-[10px]">Processing Ledger Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 bg-gradient-to-br from-primary to-indigo-700 text-white relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <Wallet size={24} />
              </div>
              <span className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">Available Payout</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Total Balance</p>
            <h3 className="text-5xl font-black mb-6 flex items-baseline gap-1">
              <span className="text-2xl">₹</span>142,500
            </h3>
            <div className="flex gap-4">
              <button className="flex-1 py-3 bg-white text-primary rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all active:scale-95">
                Withdraw Funds
              </button>
              <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                <SettingsIcon size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border">
          <div className="flex items-center justify-between mb-10">
            <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-lg">+24% Monthly</span>
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Monthly Revenue</p>
          <h3 className="text-4xl font-black text-[#1A237E] dark:text-white mb-2">₹42,800</h3>
          <p className="text-[10px] text-slate-400 font-bold tracking-widest">COMPARED TO ₹34,500 LAST MONTH</p>
        </div>

        <div className="glass-card p-8 bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border flex flex-col justify-center items-center text-center">
           <div className="w-24 h-24 relative mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    innerRadius={30}
                    outerRadius={45}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <PieIcon size={16} className="text-primary" />
              </div>
           </div>
           <h4 className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-200">Revenue Split</h4>
           <p className="text-[10px] text-slate-400 font-medium mt-1">Distributed across 12 active courses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction History */}
        <div className="lg:col-span-2 glass-card bg-white/70 dark:bg-dark-card/70 border-slate-100 dark:border-dark-border overflow-hidden">
          <div className="p-8 border-b border-slate-50 dark:border-dark-border flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black flex items-center gap-2">
                <CreditCard className="text-primary" size={24} /> Transaction Ledger
              </h3>
              <p className="text-sm text-slate-400 font-medium mt-1">Real-time enrollment revenue stream</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-dark-bg border border-slate-100 dark:border-dark-border rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:text-primary transition-all shadow-sm">
              <Download size={16} /> Export Statement
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-dark-bg/50">
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Student & Course</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((trx, i) => (
                  <tr key={trx.id} className="border-b border-slate-50 dark:border-dark-border last:border-0 hover:bg-slate-50/30 dark:hover:bg-dark-bg/30 transition-all">
                    <td className="px-8 py-5 text-xs font-black text-slate-400">{trx.id}</td>
                    <td className="px-8 py-5">
                      <p className="text-xs font-black text-[#1A237E] dark:text-white">{trx.student}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{trx.course}</p>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">{trx.date}</td>
                    <td className="px-8 py-5 text-sm font-black text-primary">₹{trx.amount}</td>
                    <td className="px-8 py-5 text-right">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        trx.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <div className="glass-card p-6 bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <BarChart3 size={16} /> Course Popularity
            </h4>
            <div className="space-y-6">
              {courseDistribution.map((course, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600 dark:text-slate-300">{course.name}</span>
                    <span className="text-primary">{course.value}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-dark-bg rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${course.value}%` }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <h4 className="text-xs font-black uppercase tracking-widest opacity-70 mb-4">Tax & Invoicing</h4>
            <p className="text-sm font-bold leading-relaxed mb-6">Your Q1 earnings report is now ready for download. Ensure your PAN details are updated.</p>
            <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
              Download Q1 Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyEarnings;
