const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  resumeAnalyzer,
  resumeScore,
  skillGap,
  jobRecommendation,
  interviewQuestions,
  chatbot,
  generateInterview,
  evaluateInterview,
} = require("../controllers/aiController");

// =====================================
// Resume Analyzer
// GET /api/ai/resume-analyzer
// =====================================
router.get(
  "/resume-analyzer",
  protect,
  resumeAnalyzer
);

// =====================================
// Resume Score
// GET /api/ai/resume-score
// =====================================
router.get(
  "/resume-score",
  protect,
  resumeScore
);

// =====================================
// AI Skill Gap Analysis
// POST /api/ai/skill-gap
// Body:
// {
//    "targetJob": "Full Stack Developer"
// }
// =====================================
router.post(
  "/skill-gap",
  protect,
  skillGap
);

// =====================================
// AI Job Recommendation
// GET /api/ai/job-recommendation
// =====================================
router.get(
  "/job-recommendation",
  protect,
  jobRecommendation
);

// =====================================
// AI Interview Questions
// GET /api/ai/interview-questions
// =====================================
router.get(
  "/interview-questions",
  protect,
  interviewQuestions
);

// =====================================
// Career AI Chatbot
// POST /api/ai/chat
// Body:
// {
//    "message":"How can I become a Data Scientist?"
// }
// =====================================
router.post(
  "/chat",
  protect,
  chatbot
);

router.post(
"/generate-interview",
protect,
generateInterview
);

router.post(
"/evaluate-interview",
protect,
evaluateInterview
);

module.exports = router;