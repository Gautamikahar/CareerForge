import { useEffect, useRef , useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import CareerChatbot from "../components/CareerChatbot";
function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

const fetchDashboard = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/user/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setData(res.data);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const replaceResume = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("resume", file);

  try {

    await API.post(
      "/resume/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Resume Updated Successfully ✅");

    fetchDashboard();

  } catch (error) {

    console.log(error);

    alert("Resume Upload Failed");

  }

};

const deleteResume = async () => {

  if (!window.confirm("Delete your resume?"))
    return;

  const token = localStorage.getItem("token");

  try {

    await API.delete("/resume/delete", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Resume Deleted");

    fetchDashboard();

  } catch (error) {

    console.log(error);

  }

};
  useEffect(() => {
  fetchDashboard();
}, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              🎓 Student Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back! Manage your career journey from one place.
            </p>

          </div>

          <button
            onClick={() => navigate("/edit-profile")}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            ✏ Edit Profile
          </button>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6">

            <h2 className="text-lg">
              Skills
            </h2>

            <p className="text-5xl font-bold mt-4">
              {data.profile?.skills?.length || 0}
            </p>

          </div>

          <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">

            <h2 className="text-lg">
              Applications
            </h2>

            <p className="text-5xl font-bold mt-4">
              {data.applications?.length || 0}
            </p>

          </div>

          <div className="bg-purple-600 text-white rounded-xl shadow-lg p-6">

            <h2 className="text-lg">
              Resume
            </h2>

            <p className="text-2xl font-bold mt-5">
              {data.resume ? "Uploaded ✅" : "Not Uploaded"}
            </p>

          </div>

        </div>
                {/* Profile */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            👤 Profile Information
          </h2>

          {data.profile ? (

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <p className="mb-3">
                  <strong>College:</strong> {data.profile.college}
                </p>

                <p className="mb-3">
                  <strong>Branch:</strong> {data.profile.branch}
                </p>

                <p className="mb-3">
                  <strong>Year:</strong> {data.profile.year}
                </p>

              </div>

              <div>

                <p className="font-semibold">
                  Github
                </p>

                <a
                  href={data.profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {data.profile.github}
                </a>

                <p className="mt-5 font-semibold">
                  LinkedIn
                </p>

                <a
                  href={data.profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {data.profile.linkedin}
                </a>

              </div>

              <div className="md:col-span-2">

                <p className="font-semibold mb-2">
                  Bio
                </p>

                <p className="text-gray-700">
                  {data.profile.bio}
                </p>

              </div>

            </div>

          ) : (

            <p>No Profile Found</p>

          )}

        </div>
                {/* Skills */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            💻 Skills
          </h2>

          {data.profile?.skills?.length ? (

            <div className="flex flex-wrap gap-3">

              {data.profile.skills.map((skill, index) => (

                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold"
                >
                  {skill}
                </span>

              ))}

            </div>

          ) : (

            <p>No Skills Added</p>

          )}

        </div>

        {/* Resume */}

<div className="bg-white rounded-xl shadow-lg p-6 mb-8">

  <h2 className="text-2xl font-bold mb-6">
    📄 Resume
  </h2>

  {data.resume ? (

    <>

      <div className="mb-5">

        <h3 className="font-semibold">
          Uploaded Resume
        </h3>

        <p className="text-gray-500">
          {data.resume.fileName}
        </p>

      </div>

      <div className="flex flex-wrap gap-4">

        <a
          href={`http://localhost:5000/${data.resume.filePath}`}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          👁 View Resume
        </a>

        <button
          onClick={() =>
            fileInputRef.current.click()
          }
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-lg"
        >
          🔄 Replace Resume
        </button>

        <button
          onClick={deleteResume}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
        >
          🗑 Delete Resume
        </button>

      </div>

    </>

  ) : (

    <div>

      <p className="mb-4 text-gray-600">
        No Resume Uploaded
      </p>

      <button
        onClick={() =>
          fileInputRef.current.click()
        }
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
      >
        📤 Upload Resume
      </button>

    </div>

  )}

  <input
    ref={fileInputRef}
    type="file"
    accept=".pdf"
    hidden
    onChange={replaceResume}
  />

</div>
                {/* AI Career Tools */}

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-3">
              🤖 AI Resume Analyzer
            </h2>

            <p className="mb-6 opacity-90">
              Analyze your resume with AI and receive ATS score,
              strengths, weaknesses and personalized suggestions.
            </p>

            <Link to="/resume-analyzer">

              <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-bold hover:scale-105 transition">

                Analyze Resume

              </button>

            </Link>

          </div>

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-3">
              💬 AI Interview Coach
            </h2>

            <p className="mb-6 opacity-90">
              Practice technical and HR interviews using AI.
            </p>

            <button
  onClick={() =>
    navigate("/interview-coach")
  }
  className="bg-white text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
>
  Start Interview
</button>

          </div>

        </div>
                {/* Applied Jobs */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            💼 Applied Jobs
          </h2>

          {data.applications?.length ? (

            data.applications.map((app) => (

              <div
                key={app._id}
                className="border rounded-xl p-5 mb-4 hover:shadow-md transition"
              >

                <h3 className="text-xl font-bold">
                  {app.job?.title}
                </h3>

                <p className="text-gray-600">
                  {app.job?.company}
                </p>

                <p className="text-gray-500">
                  {app.job?.location}
                </p>

                <span className="inline-block mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                  {app.status || "Applied"}

                </span>

              </div>

            ))

          ) : (

            <p>No Applications Yet</p>

          )}

        </div>

      </div>
      <CareerChatbot />

    </div>
  );
}

export default Dashboard;