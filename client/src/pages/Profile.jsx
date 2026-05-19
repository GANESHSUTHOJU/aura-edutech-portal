import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Linkedin, 
  Briefcase, 
  GraduationCap, 
  Settings, 
  Award,
  Plus,
  Trash2,
  X,
  Shield,
  Camera,
  AlertCircle,
  CheckCircle2,
  Globe,
  FileText,
  Loader2,
  Save,
  ArrowLeft,
  Cpu,
  Zap,
  Fingerprint
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, updateRole } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) return;
        
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('http://127.0.0.1:5000/api/users/profile', config);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        showNotification('System connection failure', 'error');
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put('http://127.0.0.1:5000/api/users/profile', profileData, config);
      
      const updatedUserInfo = { ...userInfo, ...data };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      
      showNotification('Neural profile synchronized', 'success');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('Synchronization failed', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const addSkill = () => {
    if (newSkill && !profileData.skills.includes(newSkill)) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(s => s !== skillToRemove)
    });
  };

  if (!profileData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
          />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Authenticating Access Node...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto pb-24 relative px-4 sm:px-6">
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`fixed bottom-10 right-10 z-[100] px-8 py-5 rounded-[28px] shadow-2xl flex items-center gap-5 border-2 backdrop-blur-2xl ${
              notification.type === 'success' 
                ? 'bg-emerald-500/95 text-white border-emerald-400/50' 
                : 'bg-rose-500/95 text-white border-rose-400/50'
            }`}
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
              {notification.type === 'success' ? <CheckCircle2 size={26} /> : <AlertCircle size={26} />}
            </div>
            <div>
              <p className="font-black text-[10px] uppercase tracking-[0.2em] opacity-80">Interface System</p>
              <p className="font-bold text-base mt-0.5">{notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner & Profile Branding */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden bg-white/80 dark:bg-dark-card/80 backdrop-blur-3xl border-slate-100/50 dark:border-dark-border/50 shadow-2xl"
      >
        <div className="h-56 bg-gradient-to-br from-[#1A237E] via-[#3949AB] to-primary opacity-90 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-[120px]"
          />
        </div>
        
        <div className="px-12 pb-14">
          <div className="flex flex-col xl:flex-row items-start gap-12 -mt-20 relative z-20">
            <div className="relative group shrink-0">
              <div className="w-48 h-48 rounded-[56px] bg-white dark:bg-dark-card p-2.5 shadow-2xl overflow-hidden ring-[12px] ring-white/20 dark:ring-dark-card/20 group-hover:ring-primary/20 transition-all duration-500">
                <div className="w-full h-full rounded-[44px] overflow-hidden relative">
                  <img 
                    src={profileData.profileImage || `https://ui-avatars.com/api/?name=${profileData.name}&background=1A237E&color=fff&bold=true&size=512`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={profileData.name} 
                  />
                  {isEditing && (
                    <label className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="p-4 bg-white/20 rounded-full mb-3">
                        <Camera size={32} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Update Identity</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex-1 pt-24 pb-4 flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-10 w-full">
              <div className="text-center xl:text-left">
                <div className="flex flex-col xl:flex-row items-center gap-6">
                  {isEditing ? (
                    <div className="w-full max-w-md">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">System Identity</p>
                      <input 
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="text-5xl font-black tracking-tighter text-[#1A237E] dark:text-white bg-transparent border-b-4 border-primary/20 outline-none focus:border-primary w-full pb-2 transition-colors"
                      />
                    </div>
                  ) : (
                    <h1 className="text-6xl font-black tracking-tighter text-[#1A237E] dark:text-white flex items-center gap-6 justify-center xl:justify-start">
                      {profileData.name}
                      {profileData.verificationStatus === 'approved' && (
                        <div className="p-2 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
                          <CheckCircle2 size={24} />
                        </div>
                      )}
                    </h1>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-6 mt-6">
                  <p className="text-slate-500 font-bold flex items-center gap-2.5 text-base">
                    <Mail size={18} className="text-primary" /> {profileData.email}
                  </p>
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  <div className="flex items-center gap-4">
                    <span className="px-5 py-2 bg-primary/10 text-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20 shadow-sm">
                      {user?.role} Access
                    </span>
                    {profileData.role === 'faculty' && (
                      <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                        profileData.verificationStatus === 'approved' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        Status: {profileData.verificationStatus}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-5">
                {isEditing && (
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-4 bg-slate-100 dark:bg-dark-bg text-slate-600 dark:text-white rounded-[20px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-200 transition-all flex items-center gap-3 border border-transparent active:scale-95"
                  >
                    <ArrowLeft size={20} /> Discard
                  </button>
                )}
                <button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  disabled={isSaving}
                  className={`px-12 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center gap-3 relative z-30 shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isEditing 
                      ? 'bg-primary text-white shadow-primary/40' 
                      : 'bg-[#1A237E] text-white shadow-blue-900/40 border border-white/10'
                  }`}
                >
                  {isSaving ? (
                    <><Loader2 size={20} className="animate-spin" /> Transmitting...</>
                  ) : isEditing ? (
                    <><Save size={20} /> Sync Profile</>
                  ) : (
                    <><Settings size={20} /> Access Configuration</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-12 bg-white/70 dark:bg-dark-card/70 backdrop-blur-3xl border-slate-100/50 dark:border-dark-border/50"
          >
            <h3 className="text-3xl font-black mb-10 flex items-center gap-5 text-[#1A237E] dark:text-white">
              <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                <Fingerprint size={28} />
              </div>
              Executive Summary
            </h3>
            {isEditing ? (
              <textarea 
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows="7"
                className="w-full p-8 bg-slate-50 dark:bg-dark-bg rounded-[32px] border-2 border-slate-100 dark:border-dark-border outline-none focus:border-primary/50 transition-all font-medium text-slate-700 dark:text-slate-300 resize-none text-lg leading-relaxed shadow-inner"
                placeholder="Compose your professional narrative..."
              />
            ) : (
              <p className="text-slate-600 dark:text-slate-400 leading-[2] font-medium text-xl italic bg-slate-50/50 dark:bg-dark-bg/50 p-8 rounded-[32px] border border-slate-100/50 dark:border-dark-border/50">
                "{profileData.bio || "Neural pathway empty. Initialize your professional journey description."}"
              </p>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-12 bg-white/70 dark:bg-dark-card/70 border-slate-100/50 dark:border-dark-border/50"
          >
            <h3 className="text-3xl font-black mb-10 flex items-center gap-5 text-[#1A237E] dark:text-white">
              <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
                <GraduationCap size={28} />
              </div>
              Academic & Career Tenure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-5">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"></div> Master Credential
                </p>
                {isEditing ? (
                  <input 
                    name="qualification"
                    value={profileData.qualification || ''}
                    onChange={handleInputChange}
                    placeholder="e.g. Doctorate in Neural Computation"
                    className="w-full px-6 py-5 bg-slate-50 dark:bg-dark-bg border-2 border-slate-100 dark:border-dark-border rounded-2xl text-base font-bold outline-none focus:border-primary/50 transition-all shadow-inner"
                  />
                ) : (
                  <div className="p-7 bg-white dark:bg-dark-bg rounded-[28px] border border-slate-100 dark:border-dark-border shadow-sm group hover:border-primary transition-colors">
                    <p className="text-base font-black text-[#1A237E] dark:text-white tracking-tight">
                      {profileData.qualification || "Credential verification required"}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-5">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50"></div> Professional Era
                </p>
                {isEditing ? (
                  <input 
                    name="experience"
                    value={profileData.experience || ''}
                    onChange={handleInputChange}
                    placeholder="e.g. 15+ Cycles Senior Leadership"
                    className="w-full px-6 py-5 bg-slate-50 dark:bg-dark-bg border-2 border-slate-100 dark:border-dark-border rounded-2xl text-base font-bold outline-none focus:border-primary/50 transition-all shadow-inner"
                  />
                ) : (
                  <div className="p-7 bg-white dark:bg-dark-bg rounded-[28px] border border-slate-100 dark:border-dark-border shadow-sm group hover:border-indigo-500 transition-colors">
                    <p className="text-base font-black text-[#1A237E] dark:text-white tracking-tight">
                      {profileData.experience || "Experience metrics missing"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-10">


          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-10 bg-white/70 dark:bg-dark-card/70 border-slate-100/50 dark:border-dark-border/50"
          >
            <h3 className="text-xl font-black mb-8 flex items-center gap-4 text-[#1A237E] dark:text-white">
              <Award size={24} className="text-primary" /> Neural Skills
            </h3>
            <div className="flex flex-wrap gap-3 mb-10">
              {profileData.skills?.map((skill, i) => (
                <span key={i} className="px-5 py-2.5 bg-white dark:bg-dark-bg text-slate-700 dark:text-slate-200 rounded-[18px] text-[11px] font-black uppercase tracking-[0.2em] border border-slate-100 dark:border-dark-border flex items-center gap-3 group hover:border-primary transition-all shadow-sm">
                  {skill}
                  {isEditing && (
                    <button onClick={() => removeSkill(skill)} className="text-slate-300 hover:text-rose-500 transition-colors">
                      <X size={14} />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-3">
                <input 
                  type="text" 
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-dark-bg border-2 border-slate-100 dark:border-dark-border rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] outline-none focus:border-primary/50 transition-all shadow-inner"
                  placeholder="Insert Node..." 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button onClick={addSkill} className="p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 hover:scale-110 transition-transform active:scale-95">
                  <Plus size={28} />
                </button>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10 bg-white/70 dark:bg-dark-card/70 border-slate-100/50 dark:border-dark-border/50"
          >
            <h3 className="text-xl font-black mb-10 flex items-center gap-4 text-[#1A237E] dark:text-white">
              <Globe size={24} className="text-blue-500" /> Web Integrations
            </h3>
            <div className="space-y-6">
              {[
                { name: 'linkedinUrl', label: 'LinkedIn Digital Identity', icon: <Linkedin size={20} className="text-blue-600" />, placeholder: 'linkedin.com/in/username' },
                { name: 'portfolioUrl', label: 'Creative Showcase', icon: <Globe size={20} className="text-emerald-500" />, placeholder: 'yourdomain.com' },
                { name: 'resumeUrl', label: 'Curriculum Vitae', icon: <FileText size={20} className="text-rose-500" />, placeholder: 'Storage link' },
              ].map((link) => (
                <div key={link.name} className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">{link.label}</p>
                  {isEditing ? (
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 opacity-60 group-focus-within:opacity-100 transition-opacity">
                        {link.icon}
                      </div>
                      <input 
                        name={link.name}
                        value={profileData[link.name] || ''}
                        onChange={handleInputChange}
                        placeholder={link.placeholder}
                        className="w-full pl-14 pr-6 py-4.5 bg-slate-50 dark:bg-dark-bg border-2 border-slate-100 dark:border-dark-border rounded-2xl text-[11px] font-black outline-none focus:border-primary/50 transition-all shadow-inner"
                      />
                    </div>
                  ) : (
                    <a 
                      href={profileData[link.name]?.startsWith('http') ? profileData[link.name] : `https://${profileData[link.name]}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`flex items-center gap-5 p-5 rounded-[24px] border border-slate-100 dark:border-dark-border group hover:border-primary transition-all shadow-sm ${
                        !profileData[link.name] ? 'opacity-30 cursor-not-allowed grayscale' : 'bg-white dark:bg-dark-bg/50'
                      }`}
                    >
                      <div className="p-3 bg-slate-50 dark:bg-dark-bg rounded-xl group-hover:scale-110 transition-transform shadow-inner">
                        {link.icon}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] truncate">
                        {profileData[link.name] ? 'Launch Node' : 'No Connection'}
                      </span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
