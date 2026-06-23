const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  saveJob,
  removeSavedJob,
  getSavedJobs,
  isJobSaved,
} = require("../controllers/savedJobController");

// Save a Job
router.post(
  "/save/:jobId",
  protect,
  saveJob
);

// Remove Saved Job
router.delete(
  "/remove/:jobId",
  protect,
  removeSavedJob
);

// Get All Saved Jobs
router.get(
  "/all",
  protect,
  getSavedJobs
);

// Check if Job is Saved
router.get(
  "/check/:jobId",
  protect,
  isJobSaved
);

module.exports = router;