import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    college: "",
    branch: "",
    year: "",
    skills: "",
    github: "",
    linkedin: "",
    bio: "",
    profileImage: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (photo) {
      setPreview(URL.createObjectURL(photo));
    }
  }, [photo]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profile = res.data.profile;

      setFormData({
        college: profile.college || "",
        branch: profile.branch || "",
        year: profile.year || "",
        skills: profile.skills
          ? profile.skills.join(", ")
          : "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
        bio: profile.bio || "",
        profileImage: profile.profileImage || "",
      });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    // Upload Profile Photo
  const uploadPhoto = async () => {
    if (!photo) {
      alert("Please select an image first.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const fd = new FormData();
      fd.append("photo", photo);

      const res = await API.post(
        "/profile/upload-photo",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData((prev) => ({
        ...prev,
        profileImage: res.data.profile.profileImage,
      }));

      setPreview("");

      alert("✅ Profile photo uploaded successfully!");
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Photo upload failed."
      );
    }
  };

  // Save Profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      await API.put(
        "/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Profile Updated Successfully");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to update profile."
      );
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <h2 className="text-3xl font-bold text-blue-600 animate-pulse">
          Loading Profile...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-blue-100 py-12 px-4">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-8 text-center">

          <h1 className="text-4xl font-bold">
            ✏ Edit Your Profile
          </h1>

          <p className="mt-2 text-blue-100">
            Keep your profile updated to impress recruiters.
          </p>

        </div>

        <div className="p-10">

          {/* Profile Picture */}

          <div className="flex flex-col items-center mb-10">

            <div className="relative">

              <img
                src={
                  preview
                    ? preview
                    : formData.profileImage
                    ? `http://localhost:5000/${formData.profileImage}`
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                className="w-44 h-44 rounded-full object-cover border-4 border-blue-600 shadow-xl"
              />

            </div>

            <label className="mt-6 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">

              📷 Choose New Photo

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setPhoto(e.target.files[0])
                }
              />

            </label>

            <button
              type="button"
              onClick={uploadPhoto}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Upload Photo
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          ></form>
                      {/* College */}

            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                🎓 College
              </label>

              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Enter your college name"
                className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:border-blue-600"
              />

            </div>

            {/* Branch & Year */}

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  💻 Branch
                </label>

                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Computer Engineering"
                  className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:border-blue-600"
                />

              </div>

              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  📅 Year
                </label>

                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="3"
                  className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:border-blue-600"
                />

              </div>

            </div>

            {/* Skills */}

            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                🚀 Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, Java"
                className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:border-blue-600"
              />

              <p className="text-sm text-gray-500 mt-2">
                Separate multiple skills using commas.
              </p>

            </div>

            {/* GitHub */}

            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                💻 GitHub Profile
              </label>

              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:border-blue-600"
              />

            </div>

            {/* LinkedIn */}

            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                🔗 LinkedIn Profile
              </label>

              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:border-blue-600"
              />

            </div>

            {/* Bio */}

            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                📝 About Yourself
              </label>

              <textarea
                rows="6"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell recruiters about yourself..."
                className="w-full border-2 border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:border-blue-600"
              ></textarea>

            </div>
                        {/* Action Buttons */}

            <div className="flex flex-col sm:flex-row justify-center gap-5 pt-4">

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-10 py-4 rounded-xl font-semibold text-lg transition duration-300 shadow-lg"
              >
                {saving ? "Saving..." : "💾 Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition duration-300 shadow-lg"
              >
                ← Back to Dashboard
              </button>

            </div>

          

          {/* Footer */}

          <div className="border-t mt-12 pt-6 text-center">

            <p className="text-gray-500">
              Keep your profile updated to improve your chances of getting noticed by recruiters.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EditProfile;