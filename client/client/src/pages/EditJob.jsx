import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function EditJob() {

  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({

    title: "",

    company: "",

    description: "",

    location: "",

    salary: "",

    skills: ""

  });

  useEffect(() => {

    fetchJob();

  }, []);

  const fetchJob = async () => {

    try {

      const res = await API.get("/jobs/all");

      const job = res.data.jobs.find(
        (j) => j._id === id
      );

      if (!job) {

        alert("Job not found");

        navigate("/recruiter");

        return;

      }

      setFormData({

        title: job.title,

        company: job.company,

        description: job.description,

        location: job.location,

        salary: job.salary,

        skills: job.skills.join(", ")

      });

    }

    catch (error) {

      console.log(error);

    }

    setLoading(false);

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };
    const handleSubmit = async (e) => {

    e.preventDefault();

    setSaving(true);

    try {

      await API.put(

        `/jobs/update/${id}`,

        formData,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      alert("✅ Job Updated Successfully");

      navigate("/recruiter");

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Unable to update job"

      );

    }

    setSaving(false);

  };

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        <h2 className="text-2xl font-bold">

          Loading Job...

        </h2>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-10">

        <h1 className="text-4xl font-bold text-center mb-8">

          ✏ Edit Job

        </h1>

        <form

          onSubmit={handleSubmit}

          className="space-y-6"

        >

          <div>

            <label className="font-semibold">

              Job Title

            </label>

            <input

              type="text"

              name="title"

              value={formData.title}

              onChange={handleChange}

              className="w-full mt-2 border rounded-lg p-3"

              required

            />

          </div>

          <div>

            <label className="font-semibold">

              Company

            </label>

            <input

              type="text"

              name="company"

              value={formData.company}

              onChange={handleChange}

              className="w-full mt-2 border rounded-lg p-3"

              required

            />

          </div>

          <div>

            <label className="font-semibold">

              Description

            </label>

            <textarea

              rows="5"

              name="description"

              value={formData.description}

              onChange={handleChange}

              className="w-full mt-2 border rounded-lg p-3"

              required

            />

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">

                Location

              </label>

              <input

                type="text"

                name="location"

                value={formData.location}

                onChange={handleChange}

                className="w-full mt-2 border rounded-lg p-3"

              />

            </div>

            <div>

              <label className="font-semibold">

                Salary

              </label>

              <input

                type="text"

                name="salary"

                value={formData.salary}

                onChange={handleChange}

                className="w-full mt-2 border rounded-lg p-3"

              />

            </div>

          </div>

          <div>

            <label className="font-semibold">

              Skills

            </label>

            <input

              type="text"

              name="skills"

              value={formData.skills}

              onChange={handleChange}

              className="w-full mt-2 border rounded-lg p-3"

              placeholder="React, Node.js, MongoDB"

            />

          </div>

          <div className="flex gap-4">

            <button

              type="submit"

              disabled={saving}

              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"

            >

              {

                saving

                  ? "Saving..."

                  : "💾 Update Job"

              }

            </button>

            <button

              type="button"

              onClick={() => navigate("/recruiter")}

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

export default EditJob;