import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";

function VerifyOTP() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const verifyOTP = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      alert(res.data.message);

      navigate("/reset-password", {
        state: { email },
      });

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Invalid OTP"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={verifyOTP}
        className="bg-white shadow-xl rounded-xl p-8 w-[420px]"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Verify OTP
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Enter the OTP sent to
          <br />
          <span className="font-semibold">
            {email}
          </span>
        </p>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit OTP"
          className="w-full border rounded-lg p-3 mb-6 text-center text-xl tracking-widest"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
        >
          {
            loading
            ? "Verifying..."
            : "Verify OTP"
          }
        </button>

      </form>

    </div>

  );

}

export default VerifyOTP;