import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendOTP = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/forgot-password",
        {
          email,
        }
      );

      alert(res.data.message);

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Unable to send OTP"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={sendOTP}
        className="bg-white shadow-xl rounded-xl p-8 w-[420px]"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Enter your registered email address.
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border rounded-lg p-3 mb-6"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
        >
          {
            loading
            ? "Sending OTP..."
            : "Send OTP"
          }
        </button>

        <button
          type="button"
          onClick={()=>navigate("/login")}
          className="mt-4 w-full border border-gray-400 p-3 rounded-lg"
        >
          Back to Login
        </button>

      </form>

    </div>

  );

}

export default ForgotPassword;