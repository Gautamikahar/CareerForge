

import { useState } from "react";
import API from "../api/axios";
import InterviewDashboard from "../components/InterviewDashboard";
function InterviewCoach() {

  const TOTAL_QUESTIONS = 10;

  const [role, setRole] = useState("MERN Stack Developer");
  const [difficulty, setDifficulty] = useState("Easy");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [feedback, setFeedback] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [completed, setCompleted] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [allFeedback, setAllFeedback] = useState([]);

const [scores, setScores] = useState([]);

const [strengths, setStrengths] = useState([]);

const [weaknesses, setWeaknesses] = useState([]);

  const [listening, setListening] = useState(false);

const recognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;


  const startInterview = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/ai/generate-interview",
        {
          role,
          difficulty,
          previousQuestions: askedQuestions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newQuestion = res.data.result;

setQuestion(newQuestion);

setAskedQuestions((prev) => [
  ...prev,
  newQuestion,
]);

setAnswer("");

setFeedback("");

    } catch (err) {

      console.log(err);

      alert("Unable to generate question");

    } finally {

      setLoading(false);

    }

  };

  const submitAnswer = async () => {

    try {

      setSubmitting(true);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/ai/evaluate-interview",
        {
          question,
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiFeedback = res.data.result;

setFeedback(aiFeedback);

setAllFeedback((prev) => [...prev, aiFeedback]);

// Extract Score
const scoreMatch = aiFeedback.match(/Score:\s*(\d+)/i);

if (scoreMatch) {
  setScores((prev) => [
    ...prev,
    Number(scoreMatch[1]),
  ]);
}

// Extract Strengths
const strengthsMatch = aiFeedback.match(
  /Strengths([\s\S]*?)Weaknesses/i
);

if (strengthsMatch) {
  setStrengths((prev) => [
    ...prev,
    strengthsMatch[1].trim(),
  ]);
}

// Extract Weaknesses
const weakMatch = aiFeedback.match(
  /Weaknesses([\s\S]*?)Correct Answer/i
);

if (weakMatch) {
  setWeaknesses((prev) => [
    ...prev,
    weakMatch[1].trim(),
  ]);
}

    } catch (err) {

      console.log(err);

      alert("Unable to evaluate answer");

    } finally {

      setSubmitting(false);

    }

  };
//
  const nextQuestion = async () => {

    if (currentQuestion >= TOTAL_QUESTIONS) {

      setCompleted(true);

      return;

    }

    setCurrentQuestion((prev) => prev + 1);

    setAnswer("");

    setFeedback("");

    await startInterview();

  };

  const speakQuestion = () => {

  if (!window.speechSynthesis) return;

  const speech = new SpeechSynthesisUtterance(question);

  speech.rate = 1;

  speech.pitch = 1;

  speech.lang = "en-US";

  window.speechSynthesis.cancel();

  window.speechSynthesis.speak(speech);

};
const startListening = () => {

  if (!recognition) {

    alert("Speech Recognition not supported");

    return;

  }

  const mic = new recognition();

  mic.lang = "en-US";

  mic.interimResults = true;

  mic.continuous = true;

  setListening(true);

  mic.onresult = (event) => {

    let transcript = "";

    for (
      let i = event.resultIndex;
      i < event.results.length;
      i++
    ) {

      transcript += event.results[i][0].transcript;

    }

    setAnswer(transcript);

  };

  mic.onerror = () => {

    setListening(false);

  };

  mic.onend = () => {

    setListening(false);

  };

  mic.start();

  window.currentMic = mic;

};
const stopListening = () => {

  if (window.currentMic) {

    window.currentMic.stop();

  }

  setListening(false);

};
const averageScore =
  scores.length > 0
    ? (
        scores.reduce((a, b) => a + b, 0) /
        scores.length
      ).toFixed(1)
    : 0;

  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-4xl font-bold mb-8">
            🎤 AI Interview Coach
          </h1>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">
                Job Role
              </label>

              <select
                className="w-full border rounded-lg p-3 mt-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >

                <option>MERN Stack Developer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>React Developer</option>
                <option>Node.js Developer</option>
                <option>Google SDE</option>
                <option>Java Developer</option>
                <option>Python Developer</option>

              </select>

            </div>

            <div>

              <label className="font-semibold">
                Difficulty
              </label>

              <select
                className="w-full border rounded-lg p-3 mt-2"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >

                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>

              </select>

            </div>

          </div>

          <button
            onClick={startInterview}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            {loading ? "Generating..." : "Start Interview"}
          </button>

        </div>

        {

          question && (

            <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

              <div className="mb-8">

                <div className="flex justify-between items-center mb-3">

                  <h2 className="text-2xl font-bold">
                    Question {currentQuestion} / {TOTAL_QUESTIONS}
                  </h2>

                  <span className="font-bold text-blue-600">
                    {Math.round(
                      (currentQuestion / TOTAL_QUESTIONS) * 100
                    )}
                    %
                  </span>

                </div>

                <div className="w-full bg-gray-300 rounded-full h-3">

                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${(currentQuestion / TOTAL_QUESTIONS) * 100}%`,
                    }}
                  />

                </div>

              </div>

              <h2 className="text-2xl font-bold mb-5">
                Interview Question
              </h2>

              <pre className="whitespace-pre-wrap text-lg">
                {question}
              </pre>
              <button
  onClick={speakQuestion}
  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
>
  🔊 Read Question
</button>

              <textarea
                
                rows="8"
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full border rounded-lg mt-6 p-4"
              />
              <div className="flex gap-4 mt-4">

  <button
    onClick={startListening}
    disabled={listening}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
  >
    🎤 Start Recording
  </button>

  <button
    onClick={stopListening}
    disabled={!listening}
    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
  >
    ⏹ Stop
  </button>
  {
  listening &&

  <p className="text-red-600 mt-3 font-semibold">

    🎙 Listening...

  </p>
}

</div>
                            <button
                onClick={submitAnswer}
                disabled={submitting || answer.trim() === ""}
                className="mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg"
              >
                {submitting ? "Evaluating..." : "Submit Answer"}
              </button>

              {feedback && (

                <div className="mt-8">

                  <div className="bg-gray-100 rounded-xl p-6">

                    <h3 className="text-2xl font-bold mb-4">
                      🤖 AI Feedback
                    </h3>

                    <pre className="whitespace-pre-wrap text-gray-800 leading-7">
                      {feedback}
                    </pre>

                  </div>

                  {

                    !completed ? (

                      <button
                        onClick={nextQuestion}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                      >
                        Next Question →
                      </button>

                    ) : (

                      <div className="mt-10">

  <InterviewDashboard
    scores={scores}
    strengths={strengths}
    weaknesses={weaknesses}
    totalQuestions={TOTAL_QUESTIONS}
  />

  <div className="text-center mt-8">

    <button
      onClick={() => {

        setCurrentQuestion(1);

        setCompleted(false);

        setQuestion("");

        setAnswer("");

        setFeedback("");

        setAskedQuestions([]);

        setScores([]);

        setStrengths([]);

        setWeaknesses([]);

      }}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
    >
      Start New Interview
    </button>

  </div>

</div>
//

                    )

                  }

                </div>

              )}

            </div>

          )

        }

      </div>

    </div>

  );

}

export default InterviewCoach;