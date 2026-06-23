import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function RecruiterDashboard() {

  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {

    try {

      const res = await API.get(
        "/jobs/dashboard/recruiter",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchDashboard();

  }, []);

  const deleteJob = async (jobId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/jobs/delete/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Deleted Successfully");

      fetchDashboard();

    } catch (error) {

      console.log(error);

      alert("Unable to delete job");

    }

  };

  if (!data) {

    return (

      <div className="flex justify-center items-center min-h-screen">

        <h2 className="text-2xl font-bold">
          Loading Dashboard...
        </h2>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-8">

        {/* Heading */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Recruiter Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your job postings and applicants.
            </p>

          </div>

          <button
            onClick={() => navigate("/post-job")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + Post New Job
          </button>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 gap-8 mb-10">

          <div className="bg-blue-600 text-white rounded-xl shadow-lg p-8">

            <h2 className="text-xl font-semibold">
              Total Jobs
            </h2>

            <p className="text-5xl font-bold mt-4">
              {data.totalJobs}
            </p>

          </div>

          <div className="bg-green-600 text-white rounded-xl shadow-lg p-8">

            <h2 className="text-xl font-semibold">
              Total Applications
            </h2>

            <p className="text-5xl font-bold mt-4">
              {data.totalApplications}
            </p>

          </div>

        </div>

        {/* Jobs */}

        <h2 className="text-3xl font-bold mb-6">
          Your Jobs
        </h2>

        {

          data.jobs.length === 0 ?

          (

            <div className="bg-white rounded-lg p-10 text-center shadow">

              <h2 className="text-xl">
                No Jobs Posted Yet
              </h2>

            </div>

          )

          :

          (

            data.jobs.map((job) => (

              <div
                key={job._id}
                className="bg-white rounded-xl shadow-lg p-6 mb-6"
              >

                <div className="flex justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {job.title}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      <strong>Company:</strong> {job.company}
                    </p>

                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>

                    <p>
                      <strong>Salary:</strong> {job.salary}
                    </p>

                    <p className="mt-2">
                      <strong>Skills:</strong>{" "}
                      {job.skills?.join(", ")}
                    </p>

                  </div>

                  <div className="flex flex-col gap-3">

                    <button
                      onClick={() =>
                        navigate(`/applicants/${job._id}`)
                      }
                      className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
                    >
                      Applicants
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/edit-job/${job._id}`)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteJob(job._id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))

          )

        }

      </div>

    </div>

  );

}

export default RecruiterDashboard;