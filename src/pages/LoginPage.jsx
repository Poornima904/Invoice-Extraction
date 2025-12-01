import React, { useState } from "react";
import logo from "../assets/peollogo.jpg";


const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple demo validation
    if (email === "admin@gmail.com" && password === "admin123") {
      onLogin(true);
    } else {
      setError("Invalid credentials. Try again!");
    }
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-[90%] max-w-md">
        {/* ✅ Logo section */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Company Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline"
            onClick={() => onLogin(false, "signup")}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
