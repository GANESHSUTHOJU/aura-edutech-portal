import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import SystemLogs from './pages/SystemLogs';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import VideoLearning from './pages/VideoLearning';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
};

const AppLayout = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className="flex h-screen overflow-hidden">
      {user && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {user && <Navbar />}
        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-dark-bg p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

const DashboardWrapper = () => {
  const { user } = useAuth();
  return (
    <AppLayout>
      {user?.role === 'admin' ? <AdminDashboard /> : 
       user?.role === 'faculty' ? <FacultyDashboard /> : 
       <Dashboard />}
    </AppLayout>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardWrapper />
              </PrivateRoute>
            } />
            
            <Route path="/courses" element={
              <PrivateRoute>
                <AppLayout><Courses /></AppLayout>
              </PrivateRoute>
            } />

            <Route path="/watch" element={
              <PrivateRoute>
                <AppLayout><VideoLearning /></AppLayout>
              </PrivateRoute>
            } />

            <Route path="/profile" element={
              <PrivateRoute>
                <AppLayout><Profile /></AppLayout>
              </PrivateRoute>
            } />

            <Route path="/faculty" element={
              <PrivateRoute roles={['faculty', 'admin']}>
                <AppLayout><FacultyDashboard /></AppLayout>
              </PrivateRoute>
            } />

            <Route path="/admin" element={
              <PrivateRoute roles={['admin']}>
                <AppLayout><AdminDashboard /></AppLayout>
              </PrivateRoute>
            } />

            <Route path="/admin/users" element={
              <PrivateRoute roles={['admin']}>
                <AppLayout><UserManagement /></AppLayout>
              </PrivateRoute>
            } />

            <Route path="/logs" element={
              <PrivateRoute roles={['admin']}>
                <AppLayout><SystemLogs /></AppLayout>
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
