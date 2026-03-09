import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  // Hooks for navigation and state
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page refresh
    setError("");       // Clear previous errors
    setLoading(true);   // Start loading state

    try {
      // 1. Send Login Request to Backend
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      // 2. Logic Check: Does the response contain the token?
      if (res.data.token) {
        // Save JWT and user info to LocalStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userEmail", res.data.email || email);

        // Optional: Set Axios default header so all future calls are authorized
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

        // 3. Success Feedback and Redirect
        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        setError("Token not received. Please contact support.");
      }
    } catch (err) {
      // Handle Errors (Wrong password, server down, etc.)
      const errorMsg = err.response?.data?.message || "Login failed. Connection error.";
      setError(errorMsg);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-amber-50 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-xl shadow-lg">
        
        <h2 className="text-center text-2xl font-bold tracking-tight text-stone-800">
          Sign in to your account
        </h2>

        {/* Display Error Message if it exists */}
        {error && (
          <div className="mt-4 p-2 text-sm text-red-600 bg-red-100 rounded text-center">
            {error}
          </div>
        )}

        <div className="mt-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-2 block w-full rounded-md bg-stone-100 px-3 py-2 text-stone-800 outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-2 block w-full rounded-md bg-stone-100 px-3 py-2 text-stone-800 outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm 
                  ${loading ? "bg-stone-300" : "bg-stone-500 hover:bg-stone-600"}`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-stone-500">
            Don't have an account?{" "}
            <a href="/register" className="font-semibold text-stone-500 hover:text-stone-700">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;