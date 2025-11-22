import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import LoginCard from './components/LoginCard';
import DashboardLayout from './layouts/DashboardLayout';
import CandidateDashboard from './pages/candidate/Dashboard';
import Profile from './pages/candidate/Profile';
import VideoResume from './pages/candidate/VideoResume';
import Assessments from './pages/candidate/Assessments';
import Jobs from './pages/candidate/Jobs';
import GamificationDashboard from './pages/candidate/GamificationDashboard';
import EmployerLayout from './layouts/EmployerLayout';
import EmployerDashboard from './pages/employer/Dashboard';
import PostJob from './pages/employer/PostJob';
import Candidates from './pages/employer/Candidates';
import Interviews from './pages/employer/Interviews';
import Settings from './pages/employer/Settings';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import APIConfig from './pages/admin/APIConfig';
import UserManagement from './pages/admin/UserManagement';
import SystemLogs from './pages/admin/SystemLogs';

function App() {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-space-dark text-white font-outfit">
        <Navbar onSignInClick={() => setShowLogin(true)} />
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* Candidate Routes */}
          <Route path="/candidate" element={<DashboardLayout />}>
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="video-resume" element={<VideoResume />} />
            <Route path="assessments" element={<Assessments />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="gamification" element={<GamificationDashboard />} />
          </Route>

          {/* Employer Routes */}
          <Route path="/employer" element={<EmployerLayout />}>
            <Route path="dashboard" element={<EmployerDashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="api-config" element={<APIConfig />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="logs" element={<SystemLogs />} />
          </Route>
        </Routes>
        {showLogin && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogin(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <LoginCard onClose={() => setShowLogin(false)} />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
