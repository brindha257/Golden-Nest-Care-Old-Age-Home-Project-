import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SeniorLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email: email.trim(),
        password: password.trim()
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("RESPONSE:", res.data);

    localStorage.setItem("role", res.data.role);

    login(res.data.role);
navigate("/");

  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data);
    setError("Invalid Email or Password");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-800 to-green-700">

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl p-10 rounded-2xl w-[420px] text-white">

        <h2 className="text-3xl font-bold text-center mb-8">
           Resident Portal
        </h2>

        {error && (
          <p className="text-red-300 text-center mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-white/20 placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg mb-6 bg-white/20 placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white text-emerald-800 font-semibold py-3 rounded-lg hover:scale-105 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default SeniorLogin;