import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Download, 
  MessageSquare,
  MoreVertical,
  ChevronRight,
  BookOpen,
  Calendar,
  GraduationCap
} from 'lucide-react';

const FacultyAssignments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const assignments = [
    { id: 1, title: 'React Hooks Deep Dive', course: 'React Masterclass', dueDate: 'May 15, 2024', submissions: 124, pending: 15, status: 'active' },
    { id: 2, title: 'Color Theory & Grid Systems', course: 'UI/UX Fundamentals', dueDate: 'May 16, 2024', submissions: 82, pending: 42, status: 'active' },
    { id: 3, title: 'Pandas Data Cleaning Workshop', course: 'Data Science Pro', dueDate: 'May 10, 2024', submissions: 156, pending: 0, status: 'closed' },
    { id: 4, title: 'Auth Middleware Implementation', course: 'Node.js Backend Pro', dueDate: 'May 20, 2024', submissions: 45, pending: 45, status: 'active' },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  if (isLoading) {
    return (
      <div className="p-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-[10px]">Synchronizing Submissions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Review', value: '117', icon: <AlertCircle size={20} />, color: 'bg-amber-500' },
          { label: 'Completed Review', value: '452', icon: <CheckCircle2 size={20} />, color: 'bg-emerald-500' },
          { label: 'Avg. Score', value: '84%', icon: <GraduationCap size={20} />, color: 'bg-primary' },
          { label: 'Late Submissions', value: '12', icon: <Clock size={20} />, color: 'bg-rose-500' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border flex items-center gap-4">
            <div className={`p-3 ${stat.color} text-white rounded-2xl shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              <h4 className="text-xl font-black text-[#1A237E] dark:text-white">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search assignments or courses..."
            className="w-full pl-12 pr-6 py-3.5 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-2xl text-sm outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3.5 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-600 hover:text-primary transition-all shadow-sm">
            <Filter size={16} /> Filters
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
            <FileText size={18} /> Create Assignment
          </button>
        </div>
      </div>

      {/* Assignment Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {assignments.map((assignment, i) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-8 bg-white/70 dark:bg-dark-card/70 border-slate-100 dark:border-dark-border group hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  assignment.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'
                }`}>
                  <ClipboardList size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-[#1A237E] dark:text-white">{assignment.title}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{assignment.course}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                assignment.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {assignment.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-slate-50 dark:bg-dark-bg rounded-2xl border border-slate-100 dark:border-dark-border">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Due Date</p>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-200">
                  <Calendar size={14} />
                  <span className="text-xs font-black">{assignment.dueDate}</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-dark-bg rounded-2xl border border-slate-100 dark:border-dark-border">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Submissions</p>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-200">
                  <Users size={14} />
                  <span className="text-xs font-black">{assignment.submissions}</span>
                </div>
              </div>
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">To Review</p>
                <div className="flex items-center gap-2 text-primary">
                  <AlertCircle size={14} />
                  <span className="text-xs font-black">{assignment.pending}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-dark-border">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white dark:border-dark-card flex items-center justify-center text-[8px] font-black">
                    U{i}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white dark:border-dark-card flex items-center justify-center text-[8px] font-black text-slate-400">
                  +12
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-3 bg-slate-50 dark:bg-dark-bg text-slate-500 hover:text-primary rounded-xl transition-all">
                  <Download size={18} />
                </button>
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                  Review Submissions
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FacultyAssignments;
