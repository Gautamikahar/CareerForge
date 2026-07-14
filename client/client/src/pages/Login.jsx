import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useContext(AuthContext);

  const { login } = auth || {};

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      login(
        res.data.user,
        res.data.token
      );

      alert("Login Successful ✅");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 mb-4 rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 mb-2 rounded"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        {/* Forgot Password */}

        <div className="text-right mb-5">

          <span
            onClick={() => navigate("/forgot-password")}
            className="text-blue-600 cursor-pointer text-sm hover:underline"
          >
            Forgot Password?
          </span>

        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
        >
          Login
        </button>

        <p className="text-center mt-5">

          Don't have an account?{" "}

          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer font-semibold"
          >
            Register
          </span>

        </p>

      </form>

    </div>

  );

}

export default Login;