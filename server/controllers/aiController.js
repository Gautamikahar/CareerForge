const fs = require("fs");
const pdfParse = require("pdf-parse");

const Resume = require("../models/Resume");

const {
  analyzeResume,
  resumeScore: getResumeScore,
  skillGapAnalysis,
  recommendJobs,
  interviewQuestions: getInterviewQuestions,
  careerChat,
  generateInterviewQuestion,
  evaluateAnswer,
} = require("../services/groqService");

// ==============================
// Helper Function
// ==============================

async function getResumeText(userId) {
  const resume = await Resume.findOne({
    user: userId,
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  const pdfBuffer = fs.readFileSync(
    resume.filePath
  );

  const pdf = await pdfParse(pdfBuffer);

  return pdf.text;
}

// ==============================
// Resume Analyzer
// ==============================

exports.resumeAnalyzer = async (req, res) => {
  try {
    const resumeText = await getResumeText(
      req.user.id
    );

    const analysis =
      await analyzeResume(resumeText);

    res.json({
      success: true,
      analysis,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==============================
// Resume Score
// ==============================

exports.resumeScore = async (req, res) => {
  try {
    const resumeText = await getResumeText(
      req.user.id
    );

    const result = await getResumeScore(resumeText);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==============================
// Skill Gap Analysis
// ==============================

exports.skillGap = async (req, res) => {
  try {
    const { targetJob } = req.body;

    const resumeText = await getResumeText(
      req.user.id
    );

    const result =
      await skillGapAnalysis(
        resumeText,
        targetJob
      );

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==============================
// Job Recommendation
// ==============================

exports.jobRecommendation = async (
  req,
  res
) => {
  try {
    const resumeText = await getResumeText(
      req.user.id
    );

    const result =
      await recommendJobs(
        resumeText
      );

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==============================
// Interview Questions
// ==============================

exports.interviewQuestions =
  async (req, res) => {
    try {
      const resumeText =
        await getResumeText(
          req.user.id
        );

      const result = await getInterviewQuestions(resumeText);

      res.json({
        success: true,
        result,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

// ==============================
// Career Chatbot
// ==============================

exports.chatbot = async (
  req,
  res
) => {
  try {
    const { message } = req.body;

    const result =
      await careerChat(message);

    res.json({
      success: true,
      reply: result,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.generateInterview=
async(req,res)=>{

try{

const{

role,
difficulty,
previousQuestions

}=req.body;

const result=
await generateInterviewQuestion(
role,
difficulty,
previousQuestions
);

res.json({

success:true,

result

});

}

catch(err){

console.log(err);

res.status(500).json({

success:false,

message:err.message

});

}

};
exports.evaluateInterview = async(req,res)=>{

try{

const {question,answer}=req.body;

const result=await evaluateAnswer(question,answer);

res.json({

success:true,

result

});

}
catch(err){

console.log(err);

res.status(500).json({

success:false,

message:err.message

});

}

};