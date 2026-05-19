import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  BarChart3,
  ChevronRight,
  UserCheck,
  BookOpen,
  Calendar,
  MoreVertical,
  GraduationCap
} from 'lucide-react';
import axios from 'axios';

const FacultyStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // In a real app, we would fetch from /api/courses/instructor/students
    // For now, let's mock some data to show the premium UI
    setTimeout(() => {
      setStudents([
        { id: 1, name: 'Aarav Sharma', email: 'aarav.s@example.com', enrolledDate: '2024-03-10', course: 'React Masterclass', progress: 85, lastActivity: '2 hours ago', status: 'active' },
        { id: 2, name: 'Ishani Patel', email: 'ishani.p@example.com', enrolledDate: '2024-03-12', course: 'UI/UX Fundamentals', progress: 45, lastActivity: '5 hours ago', status: 'active' },
        { id: 3, name: 'Rohan Gupta', email: 'rohan.g@example.com', enrolledDate: '2024-02-28', course: 'Data Science with Python', progress: 100, lastActivity: '1 day ago', status: 'completed' },
        { id: 4, name: 'Ananya Iyer', email: 'ananya.i@example.com', enrolledDate: '2024-03-15', course: 'React Masterclass', progress: 12, lastActivity: 'Just now', status: 'active' },
        { id: 5, name: 'Vikram Singh', email: 'vikram.s@example.com', enrolledDate: '2024-03-05', course: 'Node.js Backend Pro', progress: 68, lastActivity: '3 hours ago', status: 'active' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-[10px]">Aggregating Student Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search students by name, email or course..."
            className="w-full pl-12 pr-6 py-3.5 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-2xl text-sm outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3.5 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-600 hover:text-primary transition-all shadow-sm">
            <Filter size={16} /> Filters
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Mail size={18} /> Broadcast Message
          </button>
        </div>
      </div>

      {/* Student List Table */}
      <div className="glass-card bg-white/70 dark:bg-dark-card/70 border-slate-100 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-50 dark:border-dark-border">
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Profile</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Enrolled Course</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Progress Intelligence</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Activity Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, i) => (
                <motion.tr 
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-slate-50/50 dark:hover:bg-dark-bg/50 transition-all border-b border-slate-50 dark:border-dark-border last:border-0"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/10 to-indigo-600/10 flex items-center justify-center font-black text-primary border border-primary/10 shadow-sm uppercase tracking-tighter">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#1A237E] dark:text-white leading-tight">{student.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-50 dark:bg-dark-bg rounded-lg text-blue-500">
                        <BookOpen size={14} />
                      </div>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{student.course}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="w-full max-w-[160px] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{student.progress}%</span>
                        <span className="text-[10px] font-black text-primary">LVL {Math.floor(student.progress/10) + 1}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-dark-bg rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${student.progress}%` }}
                          className={`h-full rounded-full bg-gradient-to-r ${student.progress === 100 ? 'from-emerald-400 to-teal-500' : 'from-primary to-indigo-600'}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{student.lastActivity}</span>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${student.status === 'completed' ? 'text-emerald-500' : 'text-blue-500'}`}>
                        {student.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2.5 bg-slate-100 dark:bg-dark-bg text-slate-500 hover:text-primary hover:shadow-lg rounded-xl transition-all">
                        <MessageSquare size={16} />
                      </button>
                      <button className="p-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white hover:shadow-lg rounded-xl transition-all">
                        <BarChart3 size={16} />
                      </button>
                      <button className="p-2.5 text-slate-300 hover:text-slate-600 transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 bg-emerald-500 text-white relative overflow-hidden">
          <CheckCircle2 className="absolute -right-4 -bottom-4 opacity-10" size={120} />
          <div className="relative z-10">
            <h4 className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Total Completions</h4>
            <p className="text-4xl font-black">128</p>
            <p className="text-[10px] font-bold mt-4 flex items-center gap-1">
              <ArrowUpRight size={14} /> +12% from last month
            </p>
          </div>
        </div>
        <div className="glass-card p-6 bg-[#1A237E] text-white relative overflow-hidden">
          <GraduationCap className="absolute -right-4 -bottom-4 opacity-10" size={120} />
          <div className="relative z-10">
            <h4 className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Average Progress</h4>
            <p className="text-4xl font-black">64%</p>
            <p className="text-[10px] font-bold mt-4">Calculated across 2,450 students</p>
          </div>
        </div>
        <div className="glass-card p-6 bg-white dark:bg-dark-card border-slate-100 dark:border-dark-border">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Engagement Rating</h4>
          <div className="flex items-center gap-3">
            <div className="p-4 bg-amber-50 rounded-2xl text-amber-500">
              <Star size={32} fill="currentColor" />
            </div>
            <div>
              <p className="text-3xl font-black text-[#1A237E] dark:text-white">4.85</p>
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Global Ranking: Top 3%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyStudents;
