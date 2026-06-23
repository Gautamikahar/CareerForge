const express = require("express");

const router = express.Router();

const {
  createJob,
  getAllJobs,
  applyJob,
  getApplicants,
  getRecruiterDashboard,
  updateApplicationStatus,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const {
  protect
} = require("../middleware/authMiddleware");

// Create Job
router.post(
  "/create",
  protect,
  createJob
);

// Get All Jobs
router.get(
  "/all",
  getAllJobs
);

// Apply for Job
router.post(
  "/apply/:id",
  protect,
  applyJob
);

// Recruiter Dashboard
router.get(
  "/dashboard/recruiter",
  protect,
  getRecruiterDashboard
);

// View Applicants
router.get(
  "/applicants/:jobId",
  protect,
  getApplicants
);

// Update Application Status
router.put(
  "/application/:applicationId/status",
  protect,
  updateApplicationStatus
);

router.put(
  "/update/:id",
  protect,
  updateJob
);

router.delete(
  "/delete/:id",
  protect,
  deleteJob
);

module.exports = router;