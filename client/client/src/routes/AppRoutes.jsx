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
import ForgotPassword from "../pages/ForgetPassword";
import VerifyOTP from "../pages/VerifyOTP";
import ResetPassword from "../pages/ResetPassword";
import CodingAssessment from "../pages/CodingAssessment";
import CareerChat from "../pages/CareerChat";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/verify-otp"
  element={<VerifyOTP />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

      {/* Student */}
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>} />
      <Route
  path="/edit-profile"
  element={
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  }
/>
      <Route
        path="/resume-analyzer"
        element={<ResumeAnalyzer />}
      />

      {/* Jobs */}
      <Route
  path="/jobs"
  element={
    <ProtectedRoute>
      <Jobs />
    </ProtectedRoute>
  }
/>

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
  element={
    <ProtectedRoute>
      <AIHub />
    </ProtectedRoute>
  }
/>
<Route
  path="/interview-coach"
  element={<InterviewCoach />}
/>
<Route
  path="/coding-assessment"
  element={<CodingAssessment />}
/>
<Route
  path="/career-chat"
  element={<CareerChat />}
/>
    </Routes>
  );
}

export default AppRoutes;