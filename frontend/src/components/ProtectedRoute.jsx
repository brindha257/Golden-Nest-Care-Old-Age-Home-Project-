import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles, children }) {
  const { role } = useAuth();

  // 🔥 Wait until role loads
  if (role === null) {
    return <h2>Loading...</h2>;
  }

  // 🔥 Check role
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;