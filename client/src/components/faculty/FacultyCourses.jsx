import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  BookOpen, 
  Users, 
  Star,
  Play,
  Clock,
  IndianRupee,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import axios from 'axios';

const FacultyCourses = ({ onEdit, onCreate }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);

  const fetchCourses = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get('http://127.0.0.1:5000/api/courses/instructor', config);
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`http://127.0.0.1:5000/api/courses/${courseId}`, config);
      setCourses(courses.filter(c => c._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-[10px]">Synchronizing Library...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search your courses..."
            className="w-full pl-12 pr-6 py-3.5 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-2xl text-sm outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3.5 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-600 hover:text-primary transition-all shadow-sm">
            <Filter size={16} /> Filters
          </button>
          <button 
            onClick={onCreate}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus size={18} /> New Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredCourses.map((course, i) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card group bg-white/70 dark:bg-dark-card/70 border-slate-100 dark:border-dark-border overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-primary/5 transition-all"
          >
            {/* Thumbnail Area */}
            <div className="relative h-52 overflow-hidden">
              <img 
                src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={course.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/20">
                  {course.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${
                  course.isApproved ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {course.isApproved ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                  {course.isApproved ? 'Approved' : 'Pending Review'}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-lg font-black leading-tight text-[#1A237E] dark:text-white line-clamp-2">
                  {course.title}
                </h3>
                <div className="relative">
                  <button 
                    onClick={() => setActiveMenu(activeMenu === course._id ? null : course._id)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-dark-bg rounded-xl transition-all"
                  >
                    <MoreVertical size={18} className="text-slate-400" />
                  </button>
                  <AnimatePresence>
                    {activeMenu === course._id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-48 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-2xl shadow-2xl z-20 overflow-hidden"
                      >
                        <button 
                          onClick={() => onEdit(course)}
                          className="w-full px-5 py-3.5 text-left text-xs font-bold flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-dark-bg transition-all"
                        >
                          <Edit3 size={16} className="text-primary" /> Edit Course
                        </button>
                        <button className="w-full px-5 py-3.5 text-left text-xs font-bold flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-dark-bg transition-all text-slate-600">
                          <Eye size={16} className="text-blue-500" /> View Analytics
                        </button>
                        <div className="border-t border-slate-50 dark:border-dark-border"></div>
                        <button 
                          onClick={() => handleDelete(course._id)}
                          className="w-full px-5 py-3.5 text-left text-xs font-bold flex items-center gap-3 hover:bg-rose-50 text-rose-500 transition-all"
                        >
                          <Trash2 size={16} /> Delete Course
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-slate-500">
                  <Users size={16} />
                  <span className="text-xs font-bold">{course.studentsEnrolled?.length || 0} Students</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Play size={16} />
                  <span className="text-xs font-bold">{course.lessons?.length || 0} Lessons</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock size={16} />
                  <span className="text-xs font-bold">{course.duration || '0 Hours'}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-xs font-black">{course.rating || '0.0'}</span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-dark-border flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pricing Model</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-primary">₹{course.discountPrice || course.price || 0}</span>
                    {course.discountPrice > 0 && (
                      <span className="text-xs font-bold text-slate-400 line-through">₹{course.price}</span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => onEdit(course)}
                  className="px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                >
                  Manage Content
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Empty State / Add New Card */}
        <motion.button
          onClick={onCreate}
          whileHover={{ scale: 1.02 }}
          className="glass-card min-h-[400px] border-2 border-dashed border-slate-200 dark:border-dark-border flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-primary hover:text-primary transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-dark-bg flex items-center justify-center group-hover:bg-primary/10 transition-all">
            <Plus size={32} />
          </div>
          <div className="text-center">
            <p className="font-black uppercase tracking-widest text-xs">Create New Course</p>
            <p className="text-[10px] font-medium mt-1">Add educational content to your library</p>
          </div>
        </motion.button>
      </div>

      {filteredCourses.length === 0 && searchQuery && (
        <div className="p-20 text-center glass-card">
          <BookOpen size={48} className="mx-auto text-slate-200 mb-6" />
          <h3 className="text-xl font-bold">No matching courses found</h3>
          <p className="text-slate-400 mt-2">Try searching for a different course title or category.</p>
        </div>
      )}
    </div>
  );
};

export default FacultyCourses;
