import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Search, 
  ChevronDown, 
  Star, 
  Clock, 
  BookOpen, 
  ArrowUpRight,
  Monitor,
  Cloud,
  Code, 
  Shield,
  Cpu,
  Database,
  Play,
  UserCheck,
  Briefcase,
  PenTool,
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

import msmeLogo from '../assets/msme_logo.png';
import startupIndiaLogo from '../assets/startup_india_logo.png';
import isoLogo from '../assets/iso_logo.png';
import apscheLogo from '../assets/apsche_logo.png';

const Landing = () => {
  const [showPrograms, setShowPrograms] = useState(false);
  const [showJobRoles, setShowJobRoles] = useState(false);

  const programs = [
    'Internship',
    'Academics',
    'Technical Courses',
    'CRT',
    'Competitive & Technical assessments'
  ];

  const jobRoles = [
    'Programming Languages',
    'FullStack Engineer',
    'Cloud Engineer',
    'DevOps Engineer',
    'AI/ML/DS',
    'Networking & Security Engineer',
    'IOT',
    'Mechanical Engineering',
    'ECE',
    'EEE',
    'Civil Engineering',
    'B.Com. (Commerce and HR)'
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md z-50 border-b border-slate-100 dark:border-dark-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-10 h-10 bg-[#FF5722] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20"
              >
                A
              </motion.div>
              <span className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">AUra<span className="text-[#FF5722]">Edutech</span></span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-6">
              <div className="relative" 
                onMouseEnter={() => setShowJobRoles(true)}
                onMouseLeave={() => setShowJobRoles(false)}
              >
                <button 
                  className={`flex items-center gap-1 font-bold text-sm px-4 py-2.5 rounded-lg transition-all ${showJobRoles ? 'bg-orange-50 dark:bg-primary/10 text-[#FF5722]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-card'}`}
                >
                  Job Roles 
                  <motion.span animate={{ rotate: showJobRoles ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                
                <AnimatePresence>
                  {showJobRoles && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 w-72 bg-white dark:bg-dark-card shadow-2xl rounded-xl border border-slate-100 dark:border-dark-border py-3 z-50"
                    >
                      {jobRoles.map((role, i) => (
                        <Link 
                          key={i} 
                          to="#" 
                          className="flex items-center justify-between px-6 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-bg hover:text-[#FF5722] transition-all font-medium text-sm group"
                        >
                          {role}
                          <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF5722]" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative w-64 xl:w-80">
                <input 
                  type="text" 
                  placeholder="Search for courses" 
                  className="w-full pl-4 pr-10 py-2 bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm dark:text-white"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-400">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              
              {/* Programs Dropdown */}
              <div className="relative" 
                onMouseEnter={() => setShowPrograms(true)} 
                onMouseLeave={() => setShowPrograms(false)}
              >
                <button className={`flex items-center gap-1 text-sm font-bold px-4 py-2.5 rounded-lg transition-all ${showPrograms ? 'bg-orange-50 dark:bg-primary/10 text-[#FF5722]' : 'hover:bg-slate-50 dark:hover:bg-dark-card'}`}>
                  Programs 
                  <motion.span animate={{ rotate: showPrograms ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                
                <AnimatePresence>
                  {showPrograms && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 w-64 bg-white dark:bg-dark-card shadow-2xl rounded-xl border border-slate-100 dark:border-dark-border py-3 z-50"
                    >
                      {programs.map((prog, i) => (
                        <Link 
                          key={i} 
                          to="#" 
                          className="flex items-center justify-between px-6 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-bg hover:text-[#FF5722] transition-all font-medium text-sm group"
                        >
                          {prog}
                          <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF5722]" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="h-6 w-px bg-slate-200 dark:bg-dark-border mx-1"></div>
              <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-card rounded-lg transition-all border border-slate-200 dark:border-dark-border">Log In</Link>
              <Link to="/register" className="px-5 py-2 text-sm font-bold bg-[#1A237E] text-white rounded-lg hover:bg-[#1A237E]/90 transition-all shadow-md">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 overflow-hidden bg-white dark:bg-dark-bg relative">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold mb-8"
            >
              <span className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">⚡</span>
              India's E-Learning Pioneer
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold text-[#1A237E] dark:text-white leading-tight mb-8"
            >
              <span className="text-[#FF5722]">Power</span> Up Your Future with <br />
              Smart Learning
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl leading-relaxed"
            >
              Learn online with digital lessons designed for both degree and engineering graduates. 
              Gain in-depth knowledge of core subjects, explore new technologies, and improve your placement skills.
            </motion.p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/login" className="px-8 py-4 bg-[#1A237E] text-white font-bold rounded-lg flex items-center gap-2 hover:bg-[#1A237E]/90 transition-all shadow-lg shadow-blue-900/20">
                Get Started <ArrowUpRight size={20} />
              </Link>
              <button className="px-8 py-4 border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 font-bold rounded-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-dark-card transition-all">
                Explore courses <ArrowUpRight size={20} />
              </button>
            </div>

            <div className="mt-12 flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full border-2 border-white" alt="Student" />
                  ))}
               </div>
               <div>
                  <div className="flex text-orange-500">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">35k+ happy students</p>
               </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="Student learning"
                className="w-full h-auto dark:opacity-80 transition-opacity"
              />
            </div>
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-100 dark:bg-orange-500/10 rounded-full blur-3xl -z-10 opacity-60 dark:opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-100 dark:bg-blue-500/10 rounded-full blur-3xl -z-10 opacity-60 dark:opacity-20"></div>
          </motion.div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20 bg-slate-50 dark:bg-dark-card/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Our certificates & Accreditations</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12">Partnering with trusted institutions and organizations to create impact.</p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-16"
          >
            {[
              { src: msmeLogo, alt: 'MSME', h: 'h-40' },
              { src: startupIndiaLogo, alt: 'Startup India', h: 'h-32' },
              { src: isoLogo, alt: 'ISO', h: 'h-40' },
              { src: apscheLogo, alt: 'APSCHE', h: 'h-40' }
            ].map((logo, i) => (
              <motion.img 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.15, filter: 'grayscale(0%)', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300 }}
                src={logo.src} 
                className={`${logo.h} object-contain mix-blend-multiply dark:mix-blend-screen dark:invert dark:brightness-200 grayscale opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer`} 
                alt={logo.alt} 
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journeys */}
      <section className="py-24 bg-white dark:bg-dark-bg transition-colors duration-300">
        <div className="container mx-auto px-6 text-center">
          {/* B.Tech Section */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Build Your 4-Year <span className="text-[#FF5722]">B.Tech</span> Journey</h2>
            <p className="text-slate-500 dark:text-slate-400">Build real skills each year with hands-on learning and future-ready training.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto">
              {[1, 2, 3, 4].map(year => (
                <div key={year} className="group cursor-pointer">
                  <div className="w-24 h-24 bg-orange-50 dark:bg-orange-500/10 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform relative text-slate-400 group-hover:text-[#FF5722] transition-colors">
                     <UserCheck size={44} strokeWidth={1.5} />
                     <div className="absolute bottom-2 right-2 w-6 h-6 bg-white dark:bg-dark-bg rounded-full border border-slate-200 dark:border-dark-border flex items-center justify-center text-[10px] text-slate-400">✓</div>
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-300">BTech {year}{year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year</p>
                </div>
              ))}
            </div>
          </div>

          {/* Degree Section */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Shape Your 3-Year <span className="text-[#FF5722]">Degree</span></h2>
            <p className="text-slate-500 dark:text-slate-400">Learn, grow, and build real-world skills every year to prepare for jobs or higher studies. want to go with this</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              {[1, 2, 3].map(year => (
                <div key={year} className="group cursor-pointer">
                  <div className="w-24 h-24 bg-orange-50 dark:bg-orange-500/10 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform relative text-slate-400 group-hover:text-[#FF5722] transition-colors">
                     <UserCheck size={44} strokeWidth={1.5} />
                     <div className="absolute bottom-2 right-2 w-6 h-6 bg-white dark:bg-dark-bg rounded-full border border-slate-200 dark:border-dark-border flex items-center justify-center text-[10px] text-slate-400">✓</div>
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-300">Degree {year}{year === 1 ? 'st' : year === 2 ? 'nd' : 'rd'} Year</p>
                </div>
              ))}
            </div>
          </div>

          {/* PG Section */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Advance with Your 2-Year <span className="text-[#FF5722]">PG</span></h2>
            <p className="text-slate-500 dark:text-slate-400">Deepen your knowledge and gain career-ready skills through practical, focused learning each year.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto">
              {[1, 2].map(year => (
                <div key={year} className="group cursor-pointer">
                  <div className="w-24 h-24 bg-orange-50 dark:bg-orange-500/10 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform relative text-slate-400 group-hover:text-[#FF5722] transition-colors">
                     <UserCheck size={44} strokeWidth={1.5} />
                     <div className="absolute bottom-2 right-2 w-6 h-6 bg-white dark:bg-dark-bg rounded-full border border-slate-200 dark:border-dark-border flex items-center justify-center text-[10px] text-slate-400">✓</div>
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-300">Post Graduate {year}{year === 1 ? 'st' : 'nd'} Year</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white dark:bg-dark-bg transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-[#1A237E] dark:text-white mb-3">Categories</h2>
              <p className="text-slate-500 dark:text-slate-400">Explore In-Demand Career Categories</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-400 hover:text-[#FF5722] transition-all">
              Show Categories <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'AI/ML, Data Science, Prompt Engineering' },
              { title: 'Cloud Engineer' },
              { title: 'Full Stack Engineer' },
              { title: 'Computer Fundamentals' },
              { title: 'DevOps Engineer' },
              { title: 'Cyber Security Engineer' }
            ].map((cat, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border flex items-center gap-6 hover:shadow-xl transition-all cursor-pointer group">
                <div className="w-16 h-16 bg-slate-50 dark:bg-dark-bg rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#FF5722] group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 transition-all">
                  <Briefcase size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-[#1A237E] dark:text-white leading-tight group-hover:text-[#FF5722] transition-colors">{cat.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academics */}
      <section className="py-24 bg-white dark:bg-dark-bg border-t border-slate-50 dark:border-dark-border transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-[#1A237E] dark:text-white mb-3">Academics</h2>
              <p className="text-slate-500 dark:text-slate-400">Engaging digital videos to help you understand and master your academic subjects.</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-400 hover:text-[#FF5722] transition-all">
              Show Academics <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'IT' },
              { title: 'CSE' },
              { title: 'CSE-AI/ML' },
              { title: 'CSE-CyS' },
              { title: 'CSE-DS' },
              { title: 'CSE-IOT' }
            ].map((acad, i) => (
              <div key={i} className={`p-8 rounded-2xl bg-white dark:bg-dark-card border flex items-center gap-6 hover:shadow-xl transition-all cursor-pointer group ${i === 1 ? 'border-orange-200 dark:border-orange-500/50' : 'border-slate-100 dark:border-dark-border'}`}>
                <div className="w-16 h-16 bg-slate-50 dark:bg-dark-bg rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#FF5722] group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 transition-all">
                  <PenTool size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-[#1A237E] dark:text-white leading-tight group-hover:text-[#FF5722] transition-colors">{acad.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <section className="py-24 bg-slate-50 dark:bg-dark-card/20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#1A237E] dark:text-white mb-2">Trending Courses</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12">Explore in-demand courses for skill and career growth.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Artificial Intelligence & Machine Learning', lessons: 22, duration: '22 hrs 17 min', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop' },
              { title: 'Python FullStack', lessons: 73, duration: '73 hrs 57 min', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop' },
              { title: 'Cloud Computing', lessons: 41, duration: '41 hrs 59 min', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&auto=format&fit=crop' },
              { title: 'Embedded with C', lessons: 31, duration: '31 hrs 5 min', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop' },
              { title: 'Cyber Security & Ethical Hacking', lessons: 45, duration: '45 hrs 30 min', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop' },
              { title: 'Data Science with R Programming', lessons: 38, duration: '38 hrs 15 min', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop' },
              { title: 'UI/UX Design Masterclass', lessons: 25, duration: '25 hrs 10 min', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&auto=format&fit=crop' },
              { title: 'DevOps with Docker & Kubernetes', lessons: 52, duration: '52 hrs 45 min', img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=400&auto=format&fit=crop' }
            ].map((course, i) => (
              <div key={i} className="bg-white dark:bg-dark-card rounded-2xl flex flex-col group overflow-hidden border border-slate-100 dark:border-dark-border shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><BookOpen size={14} /> {course.lessons} Lessons</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors leading-tight">{course.title}</h3>
                  <button className="mt-auto w-full py-3 px-4 border border-[#FF5722] text-[#FF5722] font-bold rounded-lg hover:bg-[#FF5722] hover:text-white transition-all text-sm">
                    Enroll Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50 dark:bg-secondary/10 transition-colors duration-300">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
           <div className="flex-1">
              <h2 className="text-5xl font-bold text-[#1A237E] dark:text-white mb-6">Learn What Matters. <br />Grow with Confidence.</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">Explore career-focused learning designed to meet industry expectations.</p>
              <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A237E] text-white font-bold rounded-lg hover:bg-[#1A237E]/90 transition-all shadow-lg">
                Get Started <ArrowUpRight size={20} />
              </Link>
           </div>
           <div className="flex-1">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" className="rounded-3xl shadow-2xl" alt="CTA" />
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 bg-white dark:bg-dark-bg border-t border-slate-100 dark:border-dark-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand & Contact */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#FF5722] rounded flex items-center justify-center text-white font-bold text-lg">A</div>
                <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">AUra<span className="text-[#FF5722]">Edutech</span></span>
              </Link>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                  <Phone size={18} className="text-[#1A237E]" />
                  <span>+91 9154399388</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                  <Mail size={18} className="text-[#1A237E]" />
                  <span>support@auraedutech.com</span>
                </div>
                <div className="flex items-start gap-3 text-slate-500 dark:text-slate-400 text-sm">
                  <MapPin size={18} className="text-[#1A237E] shrink-0 mt-0.5" />
                  <span>Flat no: 312, 3rd Floor, Nilgiri Block, <br />Aditya Enclave, Ameerpet, <br />Hyderabad-500038</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                   <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-50 dark:bg-dark-card flex items-center justify-center text-slate-400 hover:bg-[#1A237E] hover:text-white transition-all">
                     <Icon size={16} />
                   </a>
                 ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-[#1A237E] dark:text-white mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="#" className="hover:text-[#FF5722] transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-[#FF5722] transition-colors">FAQs</Link></li>
                <li><Link to="#" className="hover:text-[#FF5722] transition-colors">Help Center</Link></li>
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="font-bold text-[#1A237E] dark:text-white mb-6">Useful Links</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="#" className="hover:text-[#FF5722] transition-colors">Testimonials</Link></li>
                <li><Link to="#" className="hover:text-[#FF5722] transition-colors">Terms & Conditions</Link></li>
                <li><Link to="#" className="hover:text-[#FF5722] transition-colors">Refund & Cancellation Policy</Link></li>
                <li><Link to="#" className="hover:text-[#FF5722] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Subscribe */}
            <div className="space-y-6">
              <h4 className="font-bold text-[#1A237E] dark:text-white mb-6">Subscribe</h4>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Join 35,000+ Indian Students and Grow with Us!</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Stay updated, enhance your skills, and feel free to introduce yourself today!</p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-50 dark:border-dark-border text-center">
            <p className="text-xs text-slate-400">© 2026 AUra Edutech. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
