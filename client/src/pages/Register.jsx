import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Github, Globe, GraduationCap, Briefcase, CheckCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const extraData = role === 'faculty' ? {
      skills,
      experience,
      qualification,
      linkedinUrl: linkedin
    } : {};
    
    const result = await register(name, email, password, role, extraData);
    if (result.success) {
      if (role === 'faculty') {
        setIsSuccess(true);
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-primary/10 blur-3xl"
            style={{
              width: 200 + i * 50,
              height: 200 + i * 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="max-w-md w-full glass-card p-12 text-center space-y-8 shadow-2xl relative z-10"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2 
            }}
            className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20"
          >
            <CheckCircle size={48} />
          </motion.div>
          
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-[#1A237E]"
            >
              Registration Successful!
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-500 text-lg leading-relaxed"
            >
              Your faculty account is now <br/>
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg font-bold text-sm inline-block mt-2">
                PENDING ADMIN APPROVAL
              </span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-slate-400 mb-8">
              We will notify you via email once your profile is verified by our team.
            </p>
            
            <button 
              onClick={() => navigate('/login')}
              className="w-full py-4 bg-[#1A237E] text-white font-bold rounded-2xl hover:bg-blue-900 transition-all shadow-lg hover:shadow-blue-900/40 active:scale-95"
            >
              Return to Login
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-stretch overflow-hidden bg-light-bg dark:bg-dark-bg relative">
      {/* Floating Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-bold text-sm hover:bg-white/20 transition-all shadow-xl"
      >
        <ArrowRight className="rotate-180" size={18} /> Back to Home
      </Link>

      {/* Left Side: Illustration */}
      <div className="hidden lg:flex w-1/2 bg-[#1A237E] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        <div className="relative z-10 text-white max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-5xl font-bold mb-6">Join the Future of <br />Learning</h2>
            <p className="text-xl text-white/80 leading-relaxed mb-12">
              Create an account and start your journey towards mastering the most in-demand skills in the industry.
            </p>
            
            <div className="space-y-6">
               <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5722] flex items-center justify-center text-white">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Personalized Learning</p>
                    <p className="text-sm text-white/60">Tailored courses for your career goals</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Industry Projects</p>
                    <p className="text-sm text-white/60">Work on real-world engineering tasks</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-[#1A237E] mb-2">Create Account</h1>
            <p className="text-slate-500">Enter your details to register as a {role}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-2xl text-sm border border-red-100 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Switcher */}
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
               <button 
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === 'student' ? 'bg-white text-[#1A237E] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 Student
               </button>
               <button 
                type="button"
                onClick={() => setRole('faculty')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === 'faculty' ? 'bg-white text-[#1A237E] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 Faculty
               </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {role === 'faculty' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Skills (comma separated)</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    placeholder="React, Node.js, Python"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Experience</label>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                      placeholder="5+ Years"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Qualification</label>
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                      placeholder="M.Tech, PhD"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#FF5722] text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500">
              Already have an account? <Link to="/login" className="text-[#1A237E] font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
