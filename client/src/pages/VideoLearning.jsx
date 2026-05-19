import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  ChevronRight, 
  Download, 
  MessageSquare, 
  Share2, 
  ThumbsUp,
  List,
  FileText
} from 'lucide-react';

const VideoLearning = () => {
  const [activeLesson, setActiveLesson] = useState(0);

  const lessons = [
    { title: 'Introduction to React 18', duration: '12:45', completed: true },
    { title: 'Understanding Hooks', duration: '24:10', completed: true },
    { title: 'Custom Hooks Deep Dive', duration: '18:30', completed: false },
    { title: 'Server Components', duration: '32:15', completed: false },
    { title: 'State Management with Context', duration: '21:05', completed: false },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Video Player Area */}
      <div className="flex-1 space-y-6">
        <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
          <img 
            src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2062&auto=format&fit=crop" 
            alt="Video Thumbnail"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40"
            >
              <Play size={32} fill="white" />
            </motion.button>
          </div>
          {/* Controls Placeholder */}
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-4 text-white">
              <Play size={20} />
              <div className="h-1.5 w-64 bg-white/20 rounded-full">
                <div className="h-full bg-primary w-1/3 rounded-full"></div>
              </div>
              <span className="text-xs">04:20 / 12:45</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{lessons[activeLesson].title}</h1>
            <p className="text-slate-500">React Masterclass • Section 2: Core Concepts</p>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl hover:bg-slate-50 transition-all">
              <ThumbsUp size={18} />
            </button>
            <button className="p-3 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl hover:bg-slate-50 transition-all">
              <Share2 size={18} />
            </button>
            <button className="btn-primary">
              Next Lesson <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="glass-card p-1">
          <div className="flex border-b border-light-border dark:border-dark-border">
            {['Overview', 'Notes', 'Resources', 'Reviews'].map((tab, i) => (
              <button 
                key={tab} 
                className={`px-8 py-4 text-sm font-bold transition-all border-b-2 ${
                  i === 0 ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            <h3 className="font-bold mb-4">About this lesson</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              In this comprehensive lesson, we'll dive deep into the new features of React 18, 
              focusing on Concurrent Rendering, automatic batching, and the transition API. 
              We'll see how these improvements significantly enhance the user experience by keeping 
              the UI responsive even during complex state updates.
            </p>
          </div>
        </div>
      </div>

      {/* Playlist Sidebar */}
      <div className="w-full lg:w-[400px] shrink-0">
        <div className="glass-card flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-light-border dark:border-dark-border flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <List size={20} className="text-primary" /> Course Playlist
            </h3>
            <span className="text-xs text-slate-500">45% Completed</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {lessons.map((lesson, i) => (
              <button 
                key={i}
                onClick={() => setActiveLesson(i)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  activeLesson === i 
                    ? 'bg-primary/10 border-primary/20 text-primary' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  lesson.completed ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                }`}>
                  {i + 1}
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{lesson.title}</p>
                  <p className="text-xs opacity-70">{lesson.duration}</p>
                </div>
                {lesson.completed && <Play size={14} className="text-green-500" fill="currentColor" />}
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-light-border dark:border-dark-border space-y-3">
             <button className="w-full flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all">
                <Download size={18} /> Download Resources
             </button>
             <button className="w-full flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all">
                <FileText size={18} /> Take Notes
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLearning;
