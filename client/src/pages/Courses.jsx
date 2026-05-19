import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  ChevronRight, 
  LayoutGrid, 
  List, 
  Zap, 
  Sparkles,
  ArrowRight,
  ShoppingCart,
  Layers,
  Award,
  X,
  PlayCircle,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Info,
  Loader2,
  CreditCard,
  Lock,
  Smartphone,
  Wallet
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CourseCard = ({ course, index, onQuickView, onEnroll, isEnrolled }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="glass-card group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden flex flex-col bg-white/80 dark:bg-dark-card/80 border-slate-100/50 dark:border-dark-border/50 h-full shadow-lg"
  >
    <div className="relative h-64 overflow-hidden">
      <img 
        src={course.thumbnail || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop`} 
        alt={course.title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="absolute top-5 right-5 px-4 py-2 bg-white/90 dark:bg-dark-card/90 backdrop-blur-xl rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary shadow-xl">
        {course.category}
      </div>
      
      {course.isPaid && (
        <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
          <Zap size={12} fill="currentColor" /> Premium
        </div>
      )}

      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        <button 
          onClick={() => onQuickView(course)}
          className="px-6 py-3 bg-white text-[#1A237E] rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-primary hover:text-white transition-all active:scale-95"
        >
          Quick View <ArrowRight size={16} />
        </button>
      </div>
    </div>
    
    <div className="p-8 flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "" : "text-slate-300"} />
          ))}
        </div>
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">({course.numReviews || '128'} Reviews)</span>
      </div>
      
      <h3 className="text-2xl font-black mb-3 text-[#1A237E] dark:text-white tracking-tight leading-tight group-hover:text-primary transition-colors">
        {course.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8 line-clamp-2 leading-relaxed h-12">
        {course.description}
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-100 dark:border-dark-border">
        <div className="flex items-center gap-2.5 text-slate-500">
          <div className="p-2.5 bg-slate-50 dark:bg-dark-bg rounded-xl">
            <Clock size={16} className="text-primary" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">{course.duration || '24h Total'}</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-500">
          <div className="p-2.5 bg-slate-50 dark:bg-dark-bg rounded-xl">
            <Users size={16} className="text-primary" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">{course.studentsCount || '1.8k'} Students</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Access Protocol</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#1A237E] dark:text-white">₹{course.price}</span>
            {course.isPaid && <span className="text-xs text-slate-400 line-through">₹{Math.floor(course.price * 1.5)}</span>}
          </div>
        </div>
        <button 
          onClick={() => isEnrolled ? null : onEnroll(course)}
          disabled={isEnrolled}
          className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-2xl transition-all active:scale-95 ${
            isEnrolled 
              ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
              : 'bg-[#1A237E] text-white shadow-blue-900/30 hover:bg-primary hover:scale-110'
          }`}
        >
          {isEnrolled ? <CheckCircle2 size={28} /> : <ShoppingCart size={28} />}
        </button>
      </div>
    </div>
  </motion.div>
);

const PurchaseModal = ({ course, onClose, onConfirm, isProcessing }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[1100] flex items-center justify-center p-6 sm:p-12"
  >
    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={onClose}></div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="bg-white dark:bg-dark-card w-full max-w-lg rounded-[48px] p-10 relative z-10 shadow-2xl border border-white/20"
    >
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CreditCard size={32} />
        </div>
        <h3 className="text-3xl font-black text-[#1A237E] dark:text-white tracking-tighter">Purchase Protocol</h3>
        <p className="text-slate-500 dark:text-slate-400 font-medium">You are about to synchronize <span className="text-primary font-bold">{course.title}</span> with your learning hub.</p>
        
        <div className="bg-slate-50 dark:bg-dark-bg p-8 rounded-[32px] space-y-4 border border-slate-100 dark:border-dark-border">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-bold uppercase tracking-widest">Investment</span>
            <span className="text-[#1A237E] dark:text-white font-black">₹{course.price}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-bold uppercase tracking-widest">Protocol Fee</span>
            <span className="text-emerald-500 font-black tracking-widest uppercase">Waived</span>
          </div>
          <div className="pt-4 border-t border-slate-200 dark:border-dark-border flex justify-between items-center">
            <span className="text-[#1A237E] dark:text-white font-black uppercase tracking-widest">Total Sync Cost</span>
            <span className="text-2xl font-black text-primary">₹{course.price}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button 
            onClick={onClose}
            className="py-5 bg-slate-100 dark:bg-dark-bg text-slate-500 rounded-[22px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-200 transition-all active:scale-95"
           >
             Cancel Node
           </button>
           <button 
            onClick={onConfirm}
            disabled={isProcessing}
            className="py-5 bg-[#1A237E] text-white rounded-[22px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-900/30 hover:bg-primary transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
           >
             {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={18} />}
             Authorize Sync
           </button>
        </div>
        
        <div className="flex items-center justify-center gap-6 opacity-40 pt-4">
          <Lock size={14} /> <span className="text-[9px] font-black uppercase tracking-widest">256-Bit SSL Secured</span>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const QuickViewModal = ({ course, onClose, onEnroll, isEnrolled }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-12"
  >
    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={onClose}></div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 40 }}
      className="bg-white dark:bg-dark-card w-full max-w-6xl rounded-[48px] overflow-hidden relative z-10 shadow-2xl border border-white/20 h-[85vh]"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-3 bg-slate-100 dark:bg-dark-bg text-slate-500 hover:text-primary rounded-2xl transition-all z-50 shadow-xl"
      >
        <X size={24} />
      </button>

      <div className="flex flex-col lg:flex-row h-full">
        {/* Visual Content */}
        <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
          <img 
            src={course.thumbnail || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop`} 
            className="w-full h-full object-cover"
            alt={course.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A237E]/90 to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-5 py-2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg">Curriculum Blueprint</span>
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter leading-tight mb-4">{course.title}</h2>
            <p className="text-blue-100/70 text-lg font-medium italic leading-relaxed">
              Synchronizing industrial architecture with cognitive learning pathways.
            </p>
          </div>
        </div>

        {/* Intelligence Details */}
        <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col overflow-y-auto custom-scrollbar bg-white dark:bg-dark-card">
          <div className="flex flex-wrap gap-4 mb-12">
            {[
              { icon: <ShieldCheck size={14} />, label: 'Verified Protocol' },
              { icon: <Zap size={14} />, label: 'Fast Track' },
              { icon: <Layers size={14} />, label: 'Multi-Module' }
            ].map(tag => (
              <span key={tag.label} className="px-5 py-2.5 bg-primary/5 text-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10 flex items-center gap-2 shadow-sm">
                {tag.icon} {tag.label}
              </span>
            ))}
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 flex items-center gap-3">
                <Info size={16} className="text-primary" /> Intelligence Abstract
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-[2] text-xl font-medium">
                {course.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-slate-50 dark:bg-dark-bg rounded-[32px] border border-slate-100 dark:border-dark-border shadow-inner">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Sync Duration</p>
                <div className="flex items-center gap-4 text-[#1A237E] dark:text-white font-black text-2xl tracking-tighter">
                  <div className="p-2 bg-primary/10 rounded-lg"><Clock size={22} className="text-primary" /></div> 
                  {course.duration || '24h'}
                </div>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-dark-bg rounded-[32px] border border-slate-100 dark:border-dark-border shadow-inner">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Active Nodes</p>
                <div className="flex items-center gap-4 text-[#1A237E] dark:text-white font-black text-2xl tracking-tighter">
                  <div className="p-2 bg-indigo-500/10 rounded-lg"><Users size={22} className="text-indigo-500" /></div>
                  {course.studentsCount || '1.8k'}
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100 dark:border-dark-border mt-auto">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Node Investment</p>
                  <p className="text-5xl font-black text-[#1A237E] dark:text-white tracking-tighter">₹{course.price}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest justify-end mb-1">
                    <CheckCircle2 size={16} /> Instant Access
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Intellectual Artifact</p>
                </div>
              </div>

              <button 
                onClick={() => isEnrolled ? null : onEnroll(course)}
                disabled={isEnrolled}
                className={`w-full py-7 rounded-[32px] font-black text-[12px] uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-5 ${
                  isEnrolled 
                    ? 'bg-emerald-500 text-white shadow-emerald-500/40' 
                    : 'bg-[#1A237E] text-white shadow-blue-900/40 hover:bg-primary'
                }`}
              >
                {isEnrolled ? (
                  <><CheckCircle2 size={24} /> Protocol Already Active</>
                ) : (
                  <><Zap size={24} fill="currentColor" /> Initialize Synchronization</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [quickViewCourse, setQuickViewCourse] = useState(null);
  const [pendingPurchase, setPendingPurchase] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);

  const categories = ['All', 'Development', 'Design', 'Data Science', 'Marketing', 'Business', 'Security'];

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/courses');
        setCourses(data);
      } catch (error) {
        setCourses([
          { _id: '1', title: 'Java Full Stack', description: 'Master end-to-end Java development with Spring Boot, Microservices, and modern React frontends.', category: 'Web Development', price: 5999, isPaid: true, duration: '48h', studentsCount: '1.8k' },
          { _id: '2', title: 'Neuro-UI/UX Design', description: 'Leverage cognitive psychology and advanced visual design principles to create addictive interfaces.', category: 'Design', price: 2999, isPaid: true, duration: '12h', studentsCount: '2.4k' },
          { _id: '3', title: 'Neural Network Synthesis', description: 'Deep dive into generative models and advanced deep learning frameworks with Python.', category: 'Data Science', price: 5999, isPaid: true, duration: '36h', studentsCount: '1.2k' },
          { _id: '4', title: 'Quantum Computing 101', description: 'Unlock the future of computation by mastering qubit manipulation and quantum algorithms.', category: 'Development', price: 8999, isPaid: true, duration: '15h', studentsCount: '800' },
          { _id: '5', title: 'Algorithmic Marketing', description: 'Automate growth cycles using advanced data modeling and programmatic advertising.', category: 'Marketing', price: 0, isPaid: false, duration: '8h', studentsCount: '3.1k' },
          { _id: '6', title: 'Cyber-Warfare Defense', description: 'Master the art of proactive threat hunting and industrial-grade security orchestration.', category: 'Security', price: 7499, isPaid: true, duration: '20h', studentsCount: '1.5k' },
        ]);
      }
      setLoading(false);
    };

    const fetchMyEnrolled = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo?.token) return;
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/users/my-courses', config);
        setEnrolledIds(data.map(c => c._id));
      } catch (err) { console.error(err); }
    };

    fetchCourses();
    fetchMyEnrolled();
  }, []);

  const handleEnrollClick = (course) => {
    if (!user) {
      showNotification('Identity authentication required', 'error');
      return;
    }
    setPendingPurchase(course);
  };

  const confirmPurchase = async () => {
    if (!pendingPurchase) return;
    
    setIsProcessing(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post('http://localhost:5000/api/courses/enroll', { courseId: pendingPurchase._id }, config);
      
      setEnrolledIds([...enrolledIds, pendingPurchase._id]);
      showNotification(`${pendingPurchase.title} synchronized to hub`, 'success');
      setPendingPurchase(null);
      setQuickViewCourse(null);
    } catch (error) {
      console.error('Enrollment error:', error);
      showNotification(error.response?.data?.message || 'Synchronization failure', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredCourses = courses.filter(c => 
    (activeCategory === 'All' || c.category === activeCategory) &&
    (c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     c.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-24 px-4 sm:px-6 relative">
      {/* Toast System */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`fixed bottom-10 right-10 z-[2000] px-8 py-5 rounded-[28px] shadow-2xl flex items-center gap-5 border-2 backdrop-blur-2xl ${
              notification.type === 'success' 
                ? 'bg-emerald-500/95 text-white border-emerald-400/50' 
                : 'bg-rose-500/95 text-white border-rose-400/50'
            }`}
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
              {notification.type === 'success' ? <CheckCircle2 size={26} /> : <AlertCircle size={26} />}
            </div>
            <div>
              <p className="font-black text-[10px] uppercase tracking-[0.2em] opacity-80">Sync System</p>
              <p className="font-bold text-base mt-0.5">{notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {quickViewCourse && (
          <QuickViewModal 
            course={quickViewCourse} 
            onClose={() => setQuickViewCourse(null)}
            onEnroll={handleEnrollClick}
            isEnrolled={enrolledIds.includes(quickViewCourse._id)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pendingPurchase && (
          <PurchaseModal 
            course={pendingPurchase}
            onClose={() => setPendingPurchase(null)}
            onConfirm={confirmPurchase}
            isProcessing={isProcessing}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl font-black tracking-tighter text-[#1A237E] dark:text-white flex items-center gap-6"
          >
            <div className="p-3 bg-[#FF5722] text-white rounded-[28px] shadow-2xl shadow-orange-500/30">
              <Layers size={40} />
            </div>
            Knowledge Explorer
          </motion.h1>
          <p className="text-slate-500 dark:text-slate-400 mt-6 font-bold text-xl leading-relaxed">
            Synchronize with industrial-grade intellectual artifacts and scale your professional neural network.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-[450px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
            <input 
              type="text" 
              placeholder="Filter by title, tag, or core skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-white dark:bg-dark-card border-2 border-slate-100 dark:border-dark-border rounded-[28px] focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-sm shadow-xl shadow-slate-100 dark:shadow-none"
            />
          </div>
          <button className="w-full sm:w-auto p-6 bg-white dark:bg-dark-card border-2 border-slate-100 dark:border-dark-border rounded-[28px] hover:bg-slate-50 transition-all shadow-xl group">
            <Filter size={26} className="text-slate-600 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap items-center gap-4 overflow-x-auto pb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-10 py-4 rounded-[22px] text-[10px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap border-2 ${
              activeCategory === cat 
                ? 'bg-[#1A237E] text-white border-blue-900 shadow-2xl shadow-blue-900/30 scale-105' 
                : 'bg-white dark:bg-dark-card text-slate-500 border-slate-100 dark:border-dark-border hover:border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <AnimatePresence mode="wait">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[650px] bg-slate-100 dark:bg-dark-bg animate-pulse rounded-[48px]"></div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12"
          >
            {filteredCourses.map((course, index) => (
              <CourseCard 
                key={course._id} 
                course={course} 
                index={index} 
                onQuickView={setQuickViewCourse}
                onEnroll={handleEnrollClick}
                isEnrolled={enrolledIds.includes(course._id)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-40 glass-card bg-slate-50/50 dark:bg-dark-bg/50 border-dashed border-2 border-slate-200 rounded-[60px]"
          >
            <div className="w-28 h-28 bg-white dark:bg-dark-card rounded-[40px] flex items-center justify-center mx-auto mb-10 text-slate-300 shadow-2xl">
              <Search size={48} />
            </div>
            <h3 className="text-4xl font-black text-[#1A237E] dark:text-white uppercase tracking-tight">Zero Artifacts Found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium max-w-md mx-auto text-lg leading-relaxed">
              Our neural search couldn't locate any artifacts matching your criteria. Try expanding your search parameters.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Processing Indicator */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-xl text-white px-10 py-5 rounded-[24px] flex items-center gap-5 z-[2000] shadow-2xl border border-white/10"
          >
            <div className="relative">
              <Loader2 className="animate-spin text-primary" size={20} />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full"></div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing Enrollment Node...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courses;
