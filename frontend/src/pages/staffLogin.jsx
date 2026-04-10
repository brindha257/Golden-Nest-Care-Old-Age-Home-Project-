import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function StaffLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const STAFF_ID = "staff";
  const STAFF_PASSWORD = "staff123";

  const handleLogin = () => {
    if (staffId === STAFF_ID && password === STAFF_PASSWORD) {
      login("staff");
      navigate("/staff");
    } else {
      setError("Invalid Staff ID or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-800 to-green-700">

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl p-10 rounded-2xl w-[420px] text-white">

        <h2 className="text-3xl font-bold text-center mb-8">
          Staff Portal Login
        </h2>

        {error && (
          <p className="text-red-300 text-center mb-4">{error}</p>
        )}

        <input
          type="text"
          placeholder="Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
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
          className="w-full bg-white text-blue-900 font-semibold py-3 rounded-lg hover:scale-105 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default StaffLogin;