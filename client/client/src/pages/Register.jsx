import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post(
        "/auth/register",
        formData
      );

      alert("Registration Successful ✅");

      console.log(res.data);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-purple-100">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">
          CareerForge
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}

          <div>

            <label className="font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Email */}

          <div>

            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Password */}

          <div>

            <label className="font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Role */}

          <div>

            <label className="font-semibold block mb-3">
              Register As
            </label>

            <div className="flex gap-6">

              <label className="flex items-center gap-2">

                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={
                    formData.role === "student"
                  }
                  onChange={handleChange}
                />

                Student

              </label>

              <label className="flex items-center gap-2">

                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={
                    formData.role === "recruiter"
                  }
                  onChange={handleChange}
                />

                Recruiter

              </label>

            </div>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;