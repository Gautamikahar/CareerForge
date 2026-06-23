import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function PostJob() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [job, setJob] = useState({
    company: "",
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/jobs/create",
        {
          ...job,
          skills: job.skills
            .split(",")
            .map((skill) => skill.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎉 Job Posted Successfully!");

      navigate("/recruiter-dashboard");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to post job."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center py-8">

          <h1 className="text-4xl font-bold">
            📢 Post a New Job
          </h1>

          <p className="mt-2 text-lg">
            Reach thousands of talented students.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-10 space-y-6"
        >

          <div>

            <label className="font-semibold block mb-2">
              Company Name
            </label>

            <input
              type="text"
              name="company"
              value={job.company}
              onChange={handleChange}
              placeholder="Google"
              required
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="font-semibold block mb-2">
              Job Title
            </label>

            <input
              type="text"
              name="title"
              value={job.title}
              onChange={handleChange}
              placeholder="Frontend Developer"
              required
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="font-semibold block mb-2">
              Job Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={job.description}
              onChange={handleChange}
              placeholder="Describe the job..."
              required
              className="w-full border rounded-lg p-3"
            ></textarea>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-semibold block mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={job.location}
                onChange={handleChange}
                placeholder="Pune / Remote"
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="font-semibold block mb-2">
                Salary
              </label>

              <input
                type="text"
                name="salary"
                value={job.salary}
                onChange={handleChange}
                placeholder="₹8 LPA"
                className="w-full border rounded-lg p-3"
              />

            </div>

          </div>

          <div>

            <label className="font-semibold block mb-2">
              Required Skills
            </label>

            <input
              type="text"
              name="skills"
              value={job.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full border rounded-lg p-3"
            />

            <p className="text-gray-500 text-sm mt-2">
              Separate skills using commas.
            </p>

          </div>

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              {loading
                ? "Posting..."
                : "🚀 Post Job"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/recruiter-dashboard")
              }
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default PostJob;