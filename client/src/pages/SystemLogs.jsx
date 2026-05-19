import { motion } from 'framer-motion';
import { 
  FileText, 
  Terminal, 
  Shield, 
  AlertTriangle, 
  Activity, 
  Database, 
  Server,
  Filter,
  Search,
  Download,
  Trash2,
  Clock,
  User,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';

const SystemLogs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock logs for demonstration
  const [logs] = useState([
    { id: 1, type: 'security', level: 'warning', message: 'Unauthorized login attempt from IP 192.168.1.45', user: 'Unknown', time: '2 mins ago', icon: <Shield size={16}/> },
    { id: 2, type: 'system', level: 'success', message: 'Daily database backup completed successfully', user: 'System', time: '15 mins ago', icon: <Database size={16}/> },
    { id: 3, type: 'user', level: 'info', message: 'Faculty "Dr. Smith" updated course "Advanced React"', user: 'Admin', time: '45 mins ago', icon: <User size={16}/> },
    { id: 4, type: 'system', level: 'error', message: 'API Latency spike detected in /api/users endpoint (450ms)', user: 'Server', time: '1 hour ago', icon: <Activity size={16}/> },
    { id: 5, type: 'user', level: 'info', message: 'New student registration: John Doe', user: 'System', time: '2 hours ago', icon: <User size={16}/> },
    { id: 6, type: 'security', level: 'info', message: 'Admin password changed successfully', user: 'Admin', time: '3 hours ago', icon: <Shield size={16}/> },
    { id: 7, type: 'system', level: 'info', message: 'SSL Certificate renewed', user: 'Server', time: '5 hours ago', icon: <Server size={16}/> },
    { id: 8, type: 'user', level: 'warning', message: 'Course "Intro to Python" reported for content violation', user: 'Student_99', time: 'Yesterday', icon: <AlertTriangle size={16}/> },
  ]);

  const filteredLogs = logs.filter(log => {
    const matchesTab = activeTab === 'all' || log.type === activeTab;
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         log.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'warning': return 'text-amber-500 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30';
      case 'error': return 'text-rose-500 bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-900/30';
      case 'success': return 'text-emerald-500 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30';
      default: return 'text-primary bg-primary/5 border-primary/10';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#1A237E] dark:text-white flex items-center gap-4">
            <Terminal className="text-primary" size={36} /> System Logs
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time platform activity, security audits, and system health monitoring.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl font-bold text-sm hover:shadow-lg transition-all text-rose-500">
            <Trash2 size={18} /> Clear All
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:shadow-lg shadow-primary/20 transition-all">
            <Download size={18} /> Download Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Filter Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400">Log Categories</h3>
            <div className="space-y-2">
              {[
                { id: 'all', name: 'All Activity', icon: <Activity size={18}/>, count: logs.length },
                { id: 'security', name: 'Security Audit', icon: <Shield size={18}/>, count: logs.filter(l => l.type === 'security').length },
                { id: 'system', name: 'System Health', icon: <Server size={18}/>, count: logs.filter(l => l.type === 'system').length },
                { id: 'user', name: 'User Actions', icon: <User size={18}/>, count: logs.filter(l => l.type === 'user').length },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
                    activeTab === cat.id 
                      ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                      : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-dark-bg hover:text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {cat.icon}
                    <span className="font-bold text-sm">{cat.name}</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${activeTab === cat.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-dark-bg'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/10">
            <div className="w-12 h-12 bg-white dark:bg-dark-card rounded-2xl shadow-lg flex items-center justify-center mb-4">
              <Activity className="text-primary animate-pulse" size={24} />
            </div>
            <h4 className="font-black text-lg">System Status</h4>
            <p className="text-xs text-slate-500 mt-1 font-medium italic">"All systems operational. No critical failures detected in the last 24h."</p>
          </div>
        </div>

        {/* Right Column: Log Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-card p-4 flex gap-4 items-center bg-white/50 backdrop-blur-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search logs by message, user, or IP..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark-bg border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-3 bg-slate-100 dark:bg-dark-bg rounded-2xl text-slate-500 hover:text-primary transition-all">
              <Filter size={20} />
            </button>
          </div>

          <div className="glass-card overflow-hidden bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border-slate-100 dark:border-dark-border">
            <div className="divide-y divide-slate-100 dark:divide-dark-border">
              {filteredLogs.map((log, i) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 hover:bg-slate-50/50 dark:hover:bg-dark-bg/50 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start gap-6 relative z-10">
                    <div className={`mt-1 w-10 h-10 rounded-2xl flex items-center justify-center border shrink-0 ${getLevelColor(log.level)}`}>
                      {log.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${getLevelColor(log.level)}`}>
                            {log.level}
                          </span>
                          <span className="text-xs font-black text-slate-300">/</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            {log.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                            <Clock size={12} /> {log.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 font-bold leading-relaxed pr-8">
                        {log.message}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-dark-bg rounded-lg text-[11px] font-black text-slate-500">
                          <User size={12} /> {log.user}
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-all text-primary text-[11px] font-black flex items-center gap-1 hover:underline underline-offset-4">
                          View Details <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Decorative faint glow on hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-r from-primary to-transparent transition-opacity`} />
                </motion.div>
              ))}
            </div>

            {filteredLogs.length === 0 && (
              <div className="p-20 text-center">
                <div className="w-20 h-20 bg-slate-50 dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <Terminal size={32} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No logs match your filters</h3>
                <p className="text-slate-400 mt-2">Try searching for something else or clearing filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
