import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function InterviewDashboard({
  scores,
  strengths,
  weaknesses,
  totalQuestions,
}) {
  if (!scores.length) return null;

  const averageScore = (
    scores.reduce((a, b) => a + b, 0) / scores.length
  ).toFixed(1);

  const highestScore = Math.max(...scores);

  const lowestScore = Math.min(...scores);

  // ===========================
  // Line Chart
  // ===========================

  const lineData = {
    labels: scores.map((_, i) => `Q${i + 1}`),

    datasets: [
      {
        label: "Score",

        data: scores,

        borderColor: "#2563eb",

        backgroundColor: "#93c5fd",

        tension: 0.4,

        fill: true,
      },
    ],
  };

  // ===========================
  // Strength Chart
  // ===========================

  const strengthMap = {};

  strengths.forEach((item) => {
    item
      .split("\n")
      .filter((x) => x.trim() !== "")
      .forEach((skill) => {
        const key = skill.replace("-", "").trim();

        if (!key) return;

        strengthMap[key] =
          (strengthMap[key] || 0) + 1;
      });
  });

  const strengthData = {
    labels: Object.keys(strengthMap),

    datasets: [
      {
        label: "Frequency",

        data: Object.values(strengthMap),

        backgroundColor: "#16a34a",
      },
    ],
  };

  // ===========================
  // Weakness Chart
  // ===========================

  const weaknessMap = {};

  weaknesses.forEach((item) => {
    item
      .split("\n")
      .filter((x) => x.trim() !== "")
      .forEach((skill) => {
        const key = skill.replace("-", "").trim();

        if (!key) return;

        weaknessMap[key] =
          (weaknessMap[key] || 0) + 1;
      });
  });

  const weaknessData = {
    labels: Object.keys(weaknessMap),

    datasets: [
      {
        label: "Frequency",

        data: Object.values(weaknessMap),

        backgroundColor: "#dc2626",
      },
    ],
  };

  return (
    <div className="mt-10">

      <h2 className="text-4xl font-bold text-center mb-8">
        📊 Interview Analytics Dashboard
      </h2>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-blue-100 rounded-xl p-6 shadow">

          <h3 className="text-lg font-semibold">
            Average Score
          </h3>

          <p className="text-4xl font-bold mt-3">
            {averageScore}/10
          </p>

        </div>

        <div className="bg-green-100 rounded-xl p-6 shadow">

          <h3 className="text-lg font-semibold">
            Highest Score
          </h3>

          <p className="text-4xl font-bold mt-3">
            {highestScore}/10
          </p>

        </div>

        <div className="bg-red-100 rounded-xl p-6 shadow">

          <h3 className="text-lg font-semibold">
            Lowest Score
          </h3>

          <p className="text-4xl font-bold mt-3">
            {lowestScore}/10
          </p>

        </div>

        <div className="bg-yellow-100 rounded-xl p-6 shadow">

          <h3 className="text-lg font-semibold">
            Questions
          </h3>

          <p className="text-4xl font-bold mt-3">
            {scores.length}/{totalQuestions}
          </p>

        </div>

      </div>

      {/* Score Trend */}

      <div className="bg-white rounded-xl shadow-lg mt-10 p-8">

        <h2 className="text-2xl font-bold mb-6">

          📈 Score Trend

        </h2>

        <Line data={lineData} />

      </div>

      {/* Charts */}

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">

            💪 Strongest Areas

          </h2>

          <Bar data={strengthData} />

        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">

            ⚠ Weakest Areas

          </h2>

          <Bar data={weaknessData} />

        </div>

      </div>

    </div>
  );
}

export default InterviewDashboard;