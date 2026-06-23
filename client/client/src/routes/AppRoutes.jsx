import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import Applicants from "../pages/Applicants";
import EditProfile from "../pages/EditProfile";
import ResumeAnalyzer from "../pages/ResumeAnalyzer";
import PostJob from "../pages/PostJob";
import EditJob from "../pages/EditJob";
import AIHub from "../pages/AIHub";
import InterviewCoach from "../pages/InterviewCoach";

function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route
        path="/resume-analyzer"
        element={<ResumeAnalyzer />}
      />

      {/* Jobs */}
      <Route path="/jobs" element={<Jobs />} />

      {/* Recruiter */}
      <Route
  path="/recruiter-dashboard"
  element={<RecruiterDashboard />}
/>

      <Route
        path="/applicants/:jobId"
        element={<Applicants />}
      />
      <Route
  path="/post-job"
  element={<PostJob />}
/>
<Route
  path="/edit-job/:id"
  element={<EditJob />}
/>
<Route
  path="/ai"
  element={<AIHub />}
/>
<Route
  path="/interview-coach"
  element={<InterviewCoach />}
/>
    </Routes>
  );
}

export default AppRoutes;