import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PublicLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => {
          login("public");
          navigate("/");
        }}
        className="bg-slate-800 text-white px-6 py-3 rounded"
      >
        Login as Public
      </button>
    </div>
  );
}

export default PublicLogin;
