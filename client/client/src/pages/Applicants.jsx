import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function Applicants() {
  const { jobId } = useParams();

  const [applicants, setApplicants] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch Applicants
  const fetchApplicants = async () => {
    try {
      const res = await API.get(
        `/jobs/applicants/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplicants(res.data.applicants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  // Update Status
  const updateStatus = async (
    applicationId,
    status
  ) => {
    try {
      await API.put(
        `/jobs/application/${applicationId}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Application ${status}`);

      fetchApplicants();

    } catch (error) {

      console.log(error);

      alert("Unable to update status");

    }
  };

  // Badge Colors
  const getStatusColor = (status) => {

    switch (status) {

      case "Accepted":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Shortlisted":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-blue-100 text-blue-700";

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Applicants
        </h1>

        {applicants.length === 0 ? (

          <div className="bg-white rounded-lg shadow p-8 text-center">
            No Applicants Found
          </div>

        ) : (

          applicants.map((app) => (

            <div
              key={app._id}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold">
                    {app.applicant?.name}
                  </h2>

                  <p className="text-gray-600">
                    {app.applicant?.email}
                  </p>

                  <p className="mt-3">
                    <strong>Job:</strong>{" "}
                    {app.job?.title}
                  </p>

                  <p>
                    <strong>Company:</strong>{" "}
                    {app.job?.company}
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                    app.status
                  )}`}
                >
                  {app.status || "Applied"}
                </span>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      "Shortlisted"
                    )
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                >
                  Shortlist
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      "Accepted"
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      "Rejected"
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Reject
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Applicants;