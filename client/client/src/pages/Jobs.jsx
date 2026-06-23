// import { useEffect, useState } from "react";
// import API from "../api/axios";

// function Jobs() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);

//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("All");
//   const [savedJobs, setSavedJobs] = useState([]);
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await API.get("/jobs/all");

//         console.log("Jobs Response:", res.data);

//         setJobs(res.data.jobs);
//         setFilteredJobs(res.data.jobs);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // Search & Filter
//   useEffect(() => {
//     let temp = [...jobs];

//     // Search
//     if (search.trim() !== "") {
//       temp = temp.filter(
//         (job) =>
//           job.title
//             .toLowerCase()
//             .includes(search.toLowerCase()) ||
//           job.company
//             .toLowerCase()
//             .includes(search.toLowerCase()) ||
//           job.skills
//             ?.join(" ")
//             .toLowerCase()
//             .includes(search.toLowerCase())
//       );
//     }

//     // Location Filter
//     if (location !== "All") {
//       temp = temp.filter(
//         (job) => job.location === location
//       );
//     }

//     setFilteredJobs(temp);
//   }, [search, location, jobs]);

//   const handleApply = async (jobId) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await API.post(
//         `/jobs/apply/${jobId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log(res.data);

//       alert("✅ Applied Successfully");
//     } catch (error) {
//       console.log(error);

//       alert(
//         error.response?.data?.message ||
//           "Application Failed"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="max-w-6xl mx-auto px-5">

//         <h1 className="text-4xl font-bold mb-3">
//           Available Jobs
//         </h1>

//         <p className="text-gray-600 mb-8">
//           Showing{" "}
//           <span className="font-bold text-blue-600">
//             {filteredJobs.length}
//           </span>{" "}
//           Jobs
//         </p>

//         {/* Search & Filters */}

//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

//           <div className="grid md:grid-cols-2 gap-5">

//             <input
//               type="text"
//               placeholder="🔍 Search by title, company or skill..."
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               className="border rounded-lg p-3 w-full"
//             />

//             <select
//               value={location}
//               onChange={(e) =>
//                 setLocation(e.target.value)
//               }
//               className="border rounded-lg p-3 w-full"
//             >
//               <option value="All">
//                 All Locations
//               </option>

//               {[
//                 ...new Set(
//                   jobs
//                     .map((job) => job.location)
//                     .filter(Boolean)
//                 ),
//               ].map((loc) => (
//                 <option
//                   key={loc}
//                   value={loc}
//                 >
//                   {loc}
//                 </option>
//               ))}
//             </select>

//           </div>

//         </div>

//         {filteredJobs.length === 0 ? (

//           <div className="bg-white rounded-xl shadow-lg p-10 text-center">
//             <h2 className="text-2xl font-semibold">
//               😕 No Jobs Found
//             </h2>

//             <p className="text-gray-500 mt-2">
//               Try changing the search or filter.
//             </p>
//           </div>

//         ) : (

//           filteredJobs.map((job) => (

//             <div
//               key={job._id}
//               className="bg-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition"
//             >

//               <div className="flex justify-between items-start">

//                 <div>

//                   <h2 className="text-2xl font-bold">
//                     {job.title}
//                   </h2>

//                   <p className="text-lg text-blue-700 font-semibold mt-1">
//                     {job.company}
//                   </p>

//                 </div>

//                 <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
//                   {job.salary}
//                 </span>

//               </div>

//               <div className="grid md:grid-cols-2 gap-4 mt-5">

//                 <p>
//                   <strong>📍 Location:</strong>{" "}
//                   {job.location || "Not Mentioned"}
//                 </p>

//                 <p>
//                   <strong>👤 Recruiter:</strong>{" "}
//                   {job.postedBy?.name}
//                 </p>

//               </div>

//               <p className="mt-5 text-gray-700 leading-7">
//                 {job.description}
//               </p>

//               <div className="flex flex-wrap gap-2 mt-5">

//                 {job.skills?.map(
//                   (skill, index) => (
//                     <span
//                       key={index}
//                       className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
//                     >
//                       {skill}
//                     </span>
//                   )
//                 )}

//               </div>

//               <button
//                 onClick={() =>
//                   handleApply(job._id)
//                 }
//                 className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
//               >
//                 Apply Now
//               </button>

//             </div>

//           ))

//         )}

//       </div>
//     </div>
//   );
// }

// export default Jobs;
import { useEffect, useState } from "react";
import API from "../api/axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");

  // Saved Jobs
  const [savedJobs, setSavedJobs] = useState([]);

  // -----------------------------
  // Fetch All Jobs
  // -----------------------------
  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs/all");

      console.log("Jobs Response:", res.data);

      setJobs(res.data.jobs);
      setFilteredJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------
  // Fetch Saved Jobs
  // -----------------------------
  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await API.get(
        "/saved-jobs/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedJobs(
        res.data.savedJobs.map(
          (item) => item.job._id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------
  // Initial Load
  // -----------------------------
  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, []);

  // -----------------------------
  // Search & Filters
  // -----------------------------
  useEffect(() => {
    let temp = [...jobs];

    if (search.trim() !== "") {
      temp = temp.filter(
        (job) =>
          job.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          job.company
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          job.skills
            ?.join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (location !== "All") {
      temp = temp.filter(
        (job) => job.location === location
      );
    }

    setFilteredJobs(temp);
  }, [search, location, jobs]);

  // -----------------------------
  // Apply Job
  // -----------------------------
  const handleApply = async (jobId) => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.post(
        `/jobs/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      alert("✅ Applied Successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Application Failed"
      );
    }
  };
    // -----------------------------
  // Save Job
  // -----------------------------
  const saveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/saved-jobs/save/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchSavedJobs();

      alert("❤️ Job Saved Successfully");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to save job"
      );
    }
  };

  // -----------------------------
  // Remove Saved Job
  // -----------------------------
  const removeSavedJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(
        `/saved-jobs/remove/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchSavedJobs();

      alert("💔 Job Removed");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to remove job"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto px-5">

        <h1 className="text-4xl font-bold mb-3">
          Available Jobs
        </h1>

        <p className="text-gray-600 mb-8">
          Showing{" "}
          <span className="font-bold text-blue-600">
            {filteredJobs.length}
          </span>{" "}
          Jobs
        </p>

        {/* Search & Filters */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="🔍 Search by title, company or skill..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border rounded-lg p-3 w-full"
            />

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="border rounded-lg p-3 w-full"
            >
              <option value="All">
                All Locations
              </option>

              {[
                ...new Set(
                  jobs
                    .map((job) => job.location)
                    .filter(Boolean)
                ),
              ].map((loc) => (
                <option
                  key={loc}
                  value={loc}
                >
                  {loc}
                </option>
              ))}

            </select>

          </div>

        </div>

        {filteredJobs.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-semibold">
              😕 No Jobs Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing the search or filter.
            </p>

          </div>

        ) : (           filteredJobs.map((job) => (

            <div
              key={job._id}
              className="bg-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold">
                    {job.title}
                  </h2>

                  <p className="text-lg text-blue-700 font-semibold mt-1">
                    {job.company}
                  </p>

                </div>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  {job.salary || "Not Disclosed"}
                </span>

              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-5">

                <p>
                  <strong>📍 Location:</strong>{" "}
                  {job.location || "Not Mentioned"}
                </p>

                <p>
                  <strong>👤 Recruiter:</strong>{" "}
                  {job.postedBy?.name}
                </p>

              </div>

              <p className="mt-5 text-gray-700 leading-7">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">

                {job.skills?.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>

                ))}

              </div>

              {/* Buttons */}

              <div className="flex gap-3 mt-6 flex-wrap">

                <button
                  onClick={() => handleApply(job._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Apply Now
                </button>

                {savedJobs.includes(job._id) ? (

                  <button
                    onClick={() => removeSavedJob(job._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    ❤️ Saved
                  </button>

                ) : (

                  <button
                    onClick={() => saveJob(job._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    🤍 Save Job
                  </button>

                )}

              </div>

            </div>

          ))
                  )}

      </div>

    </div>
  );
}

export default Jobs;