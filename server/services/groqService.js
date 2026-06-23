const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function askGroq(prompt) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.4,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content.trim();
}

// Resume Analyzer
async function analyzeResume(resumeText) {
  return askGroq(`
You are an ATS Resume Analyzer.

Analyze this resume.

Return:

Overall Score: XX/100

Strengths
- ...

Weaknesses
- ...

Missing Skills
- ...

Suggestions
- ...

Resume:
${resumeText}
`);
}

// Resume Score
async function resumeScore(resumeText) {
  return askGroq(`
Give ATS Resume Score.

Resume:
${resumeText}

Return:

Score: XX/100

Reason:
`);
}

// Skill Gap
async function skillGapAnalysis(resumeText, targetJob) {
  return askGroq(`
Target Job:
${targetJob}

Resume:
${resumeText}

Find

Current Skills

Missing Skills

Courses

Roadmap
`);
}

// Job Recommendation
async function recommendJobs(resumeText) {
  return askGroq(`
Analyze this resume.

Recommend Top 10 Job Roles.

Resume:
${resumeText}
`);
}

// Interview Questions
async function interviewQuestions(resumeText) {
  return askGroq(`
Generate 15 interview questions with answers.

Resume:
${resumeText}
`);
}

// Career Chat
async function careerChat(question) {
  return askGroq(`
You are CareerForge AI.

You help students in:

Career Guidance
Resume
Placements
Interview
Projects
Skills
Roadmap

Question:

${question}
`);
}

// ===================================
// AI Interview Coach
// ===================================
async function generateInterviewQuestion(role, difficulty ,  previousQuestions = []) {

const prompt = `
You are a Senior Software Engineer interviewer.

Generate ONE UNIQUE interview question.

Role:
${role}

Difficulty:
${difficulty}

Already asked questions:

${previousQuestions.join("\n")}

Rules:

1. NEVER repeat any of the above questions.

2. Ask a completely different question every time.

3. Cover different interview topics.

Possible topics:

- JavaScript
- ES6
- React
- Hooks
- Redux
- Node.js
- Express.js
- MongoDB
- JWT
- Authentication
- REST APIs
- Async/Await
- Promises
- Event Loop
- Closures
- System Design
- OOP
- DSA
- Performance
- Security
- Deployment

4. Return ONLY the interview question.

5. Do NOT return an answer.

6. Do NOT return markdown.

7. Do NOT number the question.
`;

return await askGroq(prompt);

}

async function evaluateAnswer(question, answer) {

return askGroq(`
You are a senior interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate it.

Return:

Score: X/10

Strengths
- ...

Weaknesses
- ...

Correct Answer

Tips
`);

}

module.exports = {
  analyzeResume,
  resumeScore,
  skillGapAnalysis,
  recommendJobs,
  interviewQuestions,
  careerChat,
  generateInterviewQuestion,
  evaluateAnswer,
};