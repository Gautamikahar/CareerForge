
import { useState } from "react";
import Editor from "@monaco-editor/react";
import API from "../api/axios";

function CodingAssessment() {

  const [language, setLanguage] = useState("JavaScript");
  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState("Easy");

  const [question, setQuestion] = useState("");

  const [code, setCode] = useState("");

  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const languageMap = {

  JavaScript: "javascript",

  Java: "java",

  Python: "python",

  "C++": "cpp",

};

const starterCodes = {
  javascript: `function solution() {

}
`,

  java: `public class Main {

    public static void main(String[] args) {

    }

}
`,

  python: `def solution():
    pass
`,

  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {

    return 0;
}
`
};

  const generateQuestion = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/ai/coding/generate",
        {
          language,
          topic,
          difficulty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestion(res.data.result);

      setCode(starterCodes[language.toLowerCase()]);

      setFeedback("");

    } catch (err) {

      console.log(err);

      alert("Unable to generate coding question");

    } finally {

      setLoading(false);

    }

  };

  const submitSolution = async () => {

    try {

      setSubmitting(true);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/ai/coding/evaluate",
        {
          question,
          code,
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

      alert("Unable to evaluate code");

    } finally {

      setSubmitting(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-4xl font-bold mb-8">
            💻 AI Coding Assessment
          </h1>

          <div className="grid md:grid-cols-3 gap-5">

            <div>

              <label className="font-semibold">
                Language
              </label>

              <select
                className="w-full border rounded-lg p-3 mt-2"
                value={language}
                onChange={(e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(starterCodes[lang.toLowerCase()]);
}}
              >

                <option>JavaScript</option>
                <option>Java</option>
                <option>Python</option>
                <option>C++</option>

              </select>

            </div>

            <div>

              <label className="font-semibold">
                Topic
              </label>

              <select
                className="w-full border rounded-lg p-3 mt-2"
                value={topic}
                onChange={(e)=>setTopic(e.target.value)}
              >

                <option>Arrays</option>
                <option>Strings</option>
                <option>Linked List</option>
                <option>Stack</option>
                <option>Queue</option>
                <option>Trees</option>
                <option>Graphs</option>
                <option>Dynamic Programming</option>

              </select>

            </div>

            <div>

              <label className="font-semibold">
                Difficulty
              </label>

              <select
                className="w-full border rounded-lg p-3 mt-2"
                value={difficulty}
                onChange={(e)=>setDifficulty(e.target.value)}
              >

                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>

              </select>

            </div>

          </div>

          <button
            onClick={generateQuestion}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >

            {

              loading

              ?

              "Generating..."

              :

              "Generate Coding Question"

            }

          </button>

        </div>

        {

          question && (

            <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

              <div className="flex justify-between items-center mb-5">

  <h2 className="text-2xl font-bold">

    💻 Coding Problem

  </h2>

  <span className="bg-blue-600 text-white px-4 py-2 rounded-full">

    {language}

  </span>

</div>

              <pre className="whitespace-pre-wrap">

                {question}

              </pre>

              <div className="mt-6 border rounded-lg overflow-hidden">

<h3 className="text-xl font-semibold mt-8 mb-3">

Write your Solution

</h3>

  <Editor

    height="500px"

    language={languageMap[language]}

    value={code}

    onChange={(value) => setCode(value || "")}

    theme="vs-dark"

    options={{

      fontSize: 16,

      minimap: {

        enabled: false,

      },

      automaticLayout: true,

      wordWrap: "on",

      scrollBeyondLastLine: false,

      formatOnPaste: true,

      formatOnType: true,

      tabSize: 2,

      fontFamily: "Consolas",

    }}

  />

</div>

              <button

                onClick={submitSolution}

                disabled={submitting}

                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"

              >

                {

                  submitting

                  ?

                  "Evaluating..."

                  :

                  "Submit Solution"

                }

              </button>

              {

                feedback && (

                  <div className="mt-8 bg-gray-100 rounded-xl p-6">

                    <h2 className="text-2xl font-bold mb-4">

                      🤖 AI Evaluation

                    </h2>

                    <pre className="whitespace-pre-wrap">

                      {feedback}

                    </pre>

                  </div>

                )

              }

            </div>

          )

        }

      </div>

    </div>

  );

}

export default CodingAssessment;