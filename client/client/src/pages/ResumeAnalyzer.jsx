import { useState } from "react";
import API from "../api/axios";

function ResumeAnalyzer() {

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const analyzeResume = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/ai/resume-analyzer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(res.data.analysis);

    } catch (err) {

      console.log(err);

      alert("Unable to analyze resume.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto">

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-xl p-10">

          <h1 className="text-4xl font-bold mb-3">

            🤖 AI Resume Analyzer

          </h1>

          <p className="text-lg opacity-90">

            Upload your resume and receive AI-powered ATS feedback instantly.

          </p>

          <button
            onClick={analyzeResume}
            className="mt-8 bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:scale-105 transition"
          >

            {loading ? "Analyzing..." : "Analyze Resume"}

          </button>

        </div>

        {analysis && (

          <div className="bg-white mt-8 rounded-xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-6">

              AI Analysis

            </h2>

            <pre className="whitespace-pre-wrap text-gray-700 leading-8">

              {analysis}

            </pre>

          </div>

        )}

      </div>

    </div>

  );

}

export default ResumeAnalyzer;