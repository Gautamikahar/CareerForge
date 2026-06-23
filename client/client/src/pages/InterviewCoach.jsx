

import { useState } from "react";
import API from "../api/axios";

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

      setFeedback(res.data.result);

    } catch (err) {

      console.log(err);

      alert("Unable to evaluate answer");

    } finally {

      setSubmitting(false);

    }

  };

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

              <textarea
                rows="8"
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full border rounded-lg mt-6 p-4"
              />
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

                      <div className="mt-8 bg-green-100 border border-green-300 rounded-xl p-8 text-center">

                        <h2 className="text-4xl font-bold text-green-700">
                          🎉 Interview Completed!
                        </h2>

                        <p className="mt-4 text-lg text-gray-700">

                          Congratulations!

                          <br />

                          You have completed all {TOTAL_QUESTIONS} interview questions.

                        </p>

                        <button
                          onClick={() => {

                            setCurrentQuestion(1);

                            setCompleted(false);

                            setQuestion("");

                            setAnswer("");

                            setFeedback("");

                            setAskedQuestions([]);

                          }}
                          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                        >
                          Start New Interview
                        </button>

                      </div>

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