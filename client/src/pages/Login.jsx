import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Github, Globe } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-stretch overflow-hidden relative">
      {/* Floating Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-bold text-sm hover:bg-white/20 transition-all shadow-xl"
      >
        <ArrowRight className="rotate-180" size={18} /> Back to Home
      </Link>

      {/* Left Side: 3D Illustration/Animation */}
      <div className="hidden lg:flex w-1/2 bg-gradient-aura relative items-center justify-center p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          {/* Floating Shapes */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 50, 0],
              x: [0, 30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-3xl blur-xl rotate-12"
          />
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6">Welcome Back to <br />AUra Edutech</h2>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              "The beautiful thing about learning is that no one can take it away from you."
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 glass p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <ArrowRight size={20} />
                </div>
                <p className="font-medium">Access over 500+ premium courses</p>
              </div>
              <div className="flex items-center gap-4 glass p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <ArrowRight size={20} />
                </div>
                <p className="font-medium">Connect with top-tier faculty</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-light-bg dark:bg-dark-bg">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Sign In</h1>
            <p className="text-slate-500">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl text-sm border border-red-100 dark:border-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold">Password</label>
                <Link to="#" className="text-xs text-primary font-semibold hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" id="remember" className="rounded border-slate-300 text-primary focus:ring-primary" />
              <label htmlFor="remember" className="text-sm text-slate-500">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 text-lg"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute w-full h-px bg-slate-200 dark:bg-slate-800"></div>
              <span className="relative px-4 bg-light-bg dark:bg-dark-bg text-sm text-slate-500">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
                className="flex items-center justify-center gap-2 py-3 border border-light-border dark:border-dark-border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium"
              >
                <Globe size={20} /> Google
              </button>
              <button 
                onClick={() => window.location.href = 'http://localhost:5000/api/auth/github'}
                className="flex items-center justify-center gap-2 py-3 border border-light-border dark:border-dark-border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium"
              >
                <Github size={20} /> Github
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-slate-500">
            Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign up for free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
