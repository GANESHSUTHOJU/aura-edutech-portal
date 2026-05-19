import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  X, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  IndianRupee, 
  Trash2, 
  Layout, 
  Clock, 
  BarChart, 
  Type,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

const CreateCourse = ({ course, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    price: '',
    discountPrice: '',
    thumbnail: '',
    introVideo: '',
    duration: '',
    language: 'English',
    lessons: [{ title: '', videoUrl: '', duration: '', isFreePreview: false }]
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        price: course.price?.toString() || '',
        discountPrice: course.discountPrice?.toString() || '',
      });
    }
  }, [course]);

  const addLesson = () => {
    setFormData({
      ...formData,
      lessons: [...formData.lessons, { title: '', videoUrl: '', duration: '', isFreePreview: false }]
    });
  };

  const removeLesson = (index) => {
    const newLessons = formData.lessons.filter((_, i) => i !== index);
    setFormData({ ...formData, lessons: newLessons });
  };

  const updateLesson = (index, field, value) => {
    const newLessons = [...formData.lessons];
    newLessons[index][field] = value;
    setFormData({ ...formData, lessons: newLessons });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      const courseData = {
        ...formData,
        instructor: userInfo._id,
        isPaid: parseFloat(formData.price) > 0,
        price: parseFloat(formData.price) || 0,
        discountPrice: parseFloat(formData.discountPrice) || 0
      };

      if (course) {
        await axios.put(`http://127.0.0.1:5000/api/courses/${course._id}`, courseData, config);
      } else {
        await axios.post('http://127.0.0.1:5000/api/courses', courseData, config);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving course:', error);
      alert(error.response?.data?.message || 'Failed to save course');
    }
    setIsLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-5xl mx-auto"
    >
      <div className="glass-card p-10 bg-white/80 dark:bg-dark-card/80 backdrop-blur-2xl border-slate-100 dark:border-dark-border relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

        <div className="flex items-center justify-between mb-12 relative z-10">
          <div>
            <h2 className="text-3xl font-black text-[#1A237E] dark:text-white">
              {course ? 'Edit Course Library' : 'Architect New Course'}
            </h2>
            <p className="text-slate-500 font-medium mt-1">Design a premium learning experience for your students.</p>
          </div>
          <button 
            onClick={onCancel} 
            className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
          {/* Section 1: Identity & Meta */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
              <Layout size={16} /> Course Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Course Title</label>
                <div className="relative">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required
                    className="w-full pl-12 pr-6 py-4 bg-white/50 dark:bg-dark-bg/50 border border-slate-100 dark:border-dark-border rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                    placeholder="e.g. Advanced Quantum Computing"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Specialization</label>
                <select 
                  required
                  className="w-full px-6 py-4 bg-white/50 dark:bg-dark-bg/50 border border-slate-100 dark:border-dark-border rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Narrative Description</label>
              <textarea 
                required
                rows="4"
                className="w-full px-6 py-4 bg-white/50 dark:bg-dark-bg/50 border border-slate-100 dark:border-dark-border rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none"
                placeholder="Describe the intellectual journey students will embark on..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>

          {/* Section 2: Media & Configuration */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
              <ImageIcon size={16} /> Asset Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Thumbnail URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required
                    className="w-full pl-12 pr-6 py-4 bg-white/50 dark:bg-dark-bg/50 border border-slate-100 dark:border-dark-border rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                    placeholder="Cover image direct link"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Intro Video URL</label>
                <div className="relative">
                  <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    className="w-full pl-12 pr-6 py-4 bg-white/50 dark:bg-dark-bg/50 border border-slate-100 dark:border-dark-border rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                    placeholder="Promo video link"
                    value={formData.introVideo}
                    onChange={(e) => setFormData({...formData, introVideo: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Pricing & Level */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
              <IndianRupee size={16} /> Commercial Strategy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Level</label>
                <select 
                  className="w-full px-4 py-4 bg-white/50 dark:bg-dark-bg/50 border border-slate-100 dark:border-dark-border rounded-2xl text-xs font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Duration</label>
                <input 
                  className="w-full px-4 py-4 bg-white/50 dark:bg-dark-bg/50 border border-slate-100 dark:border-dark-border rounded-2xl text-xs font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                  placeholder="e.g. 15 Hours"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Base Price (₹)</label>
                <input 
                  type="number"
                  className="w-full px-4 py-4 bg-white/50 dark:bg-dark-bg/50 border border-slate-100 dark:border-dark-border rounded-2xl text-xs font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                  placeholder="4999"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Offer Price (₹)</label>
                <input 
                  type="number"
                  className="w-full px-4 py-4 bg-white/50 dark:bg-dark-bg/50 border border-slate-100 dark:border-dark-border rounded-2xl text-xs font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all text-emerald-600"
                  placeholder="1999"
                  value={formData.discountPrice}
                  onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Curriculum */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                <FileText size={16} /> Curriculum Design
              </h3>
              <button 
                type="button" 
                onClick={addLesson}
                className="px-4 py-2 bg-primary/5 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:text-white transition-all"
              >
                <Plus size={14} /> Add Lesson Unit
              </button>
            </div>

            <div className="space-y-4">
              {formData.lessons.map((lesson, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 bg-slate-50/50 dark:bg-dark-bg/50 rounded-3xl border border-slate-100 dark:border-dark-border relative group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 bg-white dark:bg-dark-card rounded-full flex items-center justify-center text-xs font-black shadow-sm border border-slate-100 dark:border-dark-border">
                      {index + 1}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lesson Module</span>
                    {index > 0 && (
                      <button 
                        type="button"
                        onClick={() => removeLesson(index)}
                        className="ml-auto p-2 text-slate-300 hover:text-rose-500 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      required
                      className="px-5 py-3 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-xl text-xs font-bold outline-none focus:ring-4 focus:ring-primary/5"
                      placeholder="Module Title"
                      value={lesson.title}
                      onChange={(e) => updateLesson(index, 'title', e.target.value)}
                    />
                    <input 
                      required
                      className="px-5 py-3 bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border rounded-xl text-xs font-bold outline-none focus:ring-4 focus:ring-primary/5"
                      placeholder="Resource/Video URL"
                      value={lesson.videoUrl}
                      onChange={(e) => updateLesson(index, 'videoUrl', e.target.value)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-12 border-t border-slate-100 dark:border-dark-border">
            <button 
              type="button" 
              onClick={onCancel}
              className="px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
            >
              Discard Draft
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="px-12 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Processing Neural Data...' : (course ? 'Update Intelligent Content' : 'Release Course Content')}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateCourse;
