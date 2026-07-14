import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";

function ResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const resetPassword = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      return alert("Passwords do not match");

    }

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/reset-password",
        {
          email,
          password,
        }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Unable to reset password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={resetPassword}
        className="bg-white shadow-xl rounded-xl p-8 w-[420px]"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Create your new password
        </p>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border rounded-lg p-3 mb-4"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-lg p-3 mb-6"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
        >
          {
            loading
            ? "Updating..."
            : "Update Password"
          }
        </button>

      </form>

    </div>

  );

}

export default ResetPassword;