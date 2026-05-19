import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  XCircle, 
  Eye, 
  Search,
  Filter,
  X,
  Mail,
  Briefcase,
  GraduationCap,
  Linkedin,
  MoreVertical,
  Download,
  Ban
} from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UserManagement = () => {
  const { user: authUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchUsers = async () => {
    try {
      if (!authUser?.token) {
        console.error('No auth token found');
        showNotification('Authentication error. Please log in again.', 'error');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      };
      const { data } = await axios.get('http://127.0.0.1:5000/api/users', config);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        showNotification('Session expired. Please log in again.', 'error');
        setTimeout(() => logout(), 2000);
      } else {
        const msg = error.response?.data?.message || 'Failed to fetch users';
        showNotification(msg, 'error');
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [authUser]);

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      if (!authUser?.token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      };
      await axios.put(`http://localhost:5000/api/users/${userId}/status`, { status: newStatus }, config);
      
      showNotification(`User ${newStatus} successfully!`);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating status:', error.response?.data || error.message);
      showNotification(error.response?.data?.message || 'Failed to update status', 'error');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.verificationStatus === filterStatus;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  const exportToCSV = () => {
    if (users.length === 0) {
      showNotification('No data to export', 'error');
      return;
    }

    const headers = ['Name', 'Email', 'Role', 'Status'];
    const csvRows = users.map(u => [
      u.name,
      u.email,
      u.role,
      u.verificationStatus
    ].join(','));

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `aura_users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    showNotification('User list exported successfully!', 'success');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-10 right-10 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
              notification.type === 'success' 
                ? 'bg-emerald-500 text-white border-emerald-400' 
                : 'bg-rose-500 text-white border-rose-400'
            }`}
          >
            {notification.type === 'success' ? <ShieldCheck size={20} /> : <AlertCircle size={20} />}
            <span className="font-bold">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#1A237E] dark:text-white">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage platform users, verify faculty, and monitor activity.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-95"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* Advanced Filters Bar */}
      <div className="glass-card p-4 flex flex-col lg:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-xl">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark-bg border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex bg-slate-100 dark:bg-dark-bg p-1.5 rounded-2xl">
            {['all', 'faculty', 'student'].map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-5 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                  filterRole === role 
                    ? 'bg-white dark:bg-dark-card text-primary shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="h-10 w-[1px] bg-slate-200 dark:bg-dark-border hidden lg:block mx-2"></div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-dark-bg px-4 py-2 rounded-2xl">
            <Filter size={16} className="text-slate-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent text-xs font-black uppercase tracking-wider outline-none text-slate-600 dark:text-slate-300"
            >
              <option value="all">Any Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border-slate-100 dark:border-dark-border"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-dark-bg/50">
                <th className="px-8 py-5 font-black text-[11px] uppercase tracking-[0.2em] text-slate-400">User Profile</th>
                <th className="px-6 py-5 font-black text-[11px] uppercase tracking-[0.2em] text-slate-400">Role & Access</th>
                <th className="px-6 py-5 font-black text-[11px] uppercase tracking-[0.2em] text-slate-400">Verification Status</th>
                <th className="px-6 py-5 font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 text-right">Revenue</th>
                <th className="px-8 py-5 font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
              {filteredUsers.map((user, i) => (
                <motion.tr 
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-primary/5 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-aura p-[2px]">
                          <div className="w-full h-full rounded-[14px] bg-white dark:bg-dark-card overflow-hidden">
                            <img 
                              src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=1A237E&color=fff&bold=true`} 
                              className="w-full h-full object-cover" 
                              alt="" 
                            />
                          </div>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-dark-card ${user.verificationStatus === 'approved' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{user.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      user.role === 'faculty' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 
                      user.role === 'admin' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' : 
                      'bg-slate-50 text-slate-600 dark:bg-slate-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      user.verificationStatus === 'approved' ? 'bg-emerald-50 text-emerald-600' : 
                      user.verificationStatus === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        user.verificationStatus === 'approved' ? 'bg-emerald-500' : 
                        user.verificationStatus === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}></div>
                      {user.verificationStatus || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <p className="text-sm font-black text-slate-700 dark:text-slate-300">
                      {user.role === 'faculty' ? `₹${(user.totalEarnings || 0).toLocaleString()}` : '-'}
                    </p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="p-2 bg-slate-100 dark:bg-dark-bg text-slate-600 hover:text-primary rounded-xl transition-all"
                        title="View Profile"
                      >
                        <Eye size={16} />
                      </button>
                      
                      {user.verificationStatus !== 'approved' && (
                        <button 
                          onClick={() => handleStatusUpdate(user._id, 'approved')}
                          className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-xl transition-all"
                          title="Approve User"
                        >
                          <Check size={16} />
                        </button>
                      )}

                      {user.verificationStatus !== 'suspended' && (
                        <button 
                          onClick={() => handleStatusUpdate(user._id, 'suspended')}
                          className="p-2 bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl transition-all"
                          title="Suspend User"
                        >
                          <Ban size={16} />
                        </button>
                      )}

                      {user.verificationStatus !== 'rejected' && (
                        <button 
                          onClick={() => handleStatusUpdate(user._id, 'rejected')}
                          className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl transition-all"
                          title="Reject / Deactivate"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <Users size={32} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No users found</h3>
            <p className="text-slate-400 mt-2">Try adjusting your filters or search query.</p>
          </div>
        )}
      </motion.div>

      {/* Enhanced User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setSelectedUser(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-dark-card w-full max-w-3xl rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative z-10"
            >
              <div className="relative h-40 bg-gradient-aura">
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="absolute top-6 right-6 p-2.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all"
                >
                  <X size={20} />
                </button>
                <div className="absolute -bottom-16 left-12 p-1.5 bg-white dark:bg-dark-card rounded-[32px] shadow-2xl">
                  <div className="w-32 h-32 rounded-[26px] overflow-hidden">
                    <img 
                      src={selectedUser.profileImage || `https://ui-avatars.com/api/?name=${selectedUser.name}&background=1A237E&color=fff&bold=true&size=512`} 
                      className="w-full h-full object-cover" 
                      alt="" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="px-12 pt-20 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div>
                    <h2 className="text-4xl font-black tracking-tight">{selectedUser.name}</h2>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-slate-500 font-bold flex items-center gap-2"><Mail size={16} className="text-primary"/> {selectedUser.email}</p>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <p className="text-primary font-black uppercase text-xs tracking-widest">{selectedUser.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {selectedUser.linkedinUrl && (
                      <a href={selectedUser.linkedinUrl} target="_blank" rel="noreferrer" className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-all">
                        <Linkedin size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                  <div className="space-y-8">
                    <div className="bg-slate-50 dark:bg-dark-bg p-6 rounded-3xl">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <GraduationCap size={16} /> Professional Info
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Qualification</p>
                          <p className="text-sm font-bold mt-1 text-slate-700 dark:text-slate-200">{selectedUser.qualification || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Experience</p>
                          <p className="text-sm font-bold mt-1 text-slate-700 dark:text-slate-200">{selectedUser.experience || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Competencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.skills?.length > 0 ? selectedUser.skills.map(s => (
                        <span key={s} className="px-4 py-2 bg-primary/5 text-primary text-xs font-black rounded-xl border border-primary/10">{s}</span>
                      )) : <p className="text-sm text-slate-400 italic font-medium">No skills listed</p>}
                    </div>
                    
                    <div className="mt-10 pt-8 border-t border-slate-100 dark:border-dark-border">
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Account Status</p>
                       <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${
                        selectedUser.verificationStatus === 'approved' ? 'bg-emerald-50 text-emerald-600' : 
                        selectedUser.verificationStatus === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {selectedUser.verificationStatus || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedUser.role === 'faculty' && selectedUser.verificationStatus === 'pending' && (
                  <div className="flex gap-4 mt-12 pt-8 border-t border-slate-100 dark:border-dark-border">
                    <button 
                      onClick={() => handleStatusUpdate(selectedUser._id, 'approved')}
                      className="flex-1 py-4 bg-emerald-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/40 transition-all"
                    >
                      Verify Instructor
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(selectedUser._id, 'rejected')}
                      className="flex-1 py-4 bg-rose-50 text-rose-500 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-rose-100 transition-all"
                    >
                      Reject Application
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
