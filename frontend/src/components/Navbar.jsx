import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import nestIcon from "../assets/nest.jpg";
function Navbar() {
  const { role, logout } = useAuth();

  const openLoginPopup = () => {
    window.dispatchEvent(new Event("openLogin"));
  };

  return (
    <nav className="bg-slate-700 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-2">
  <img
    src={nestIcon} alt="Golden Nest Care Logo"className="w-10 h-10 rounded-full object-cover "/>

  <h1 className="text-xl font-bold text-white">
    Golden Nest Care
  </h1>
</div>

      <div className="flex gap-6 items-center">

        {role === "public" && (
          <>
            <Link to="/" className="hover:text-yellow-400">🏠︎ Home</Link>
            <Link to="/marketplace" className="hover:text-yellow-400">🛒 Marketplace</Link>
            <Link to="/donor" className="hover:text-yellow-400">❤ Donate</Link>

            <button
              onClick={openLoginPopup}
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
            >
              Login
            </button>
          </>
        )}

        {role === "senior" && (
          <>
            <Link to="/" className="hover:text-yellow-400">🏠︎ Home</Link>
            <Link to="/marketplace" className="hover:text-yellow-400">🛒 My Products</Link>
            <Link to="/resident" className="hover:text-yellow-400">✿ Resident Zone</Link>

            <Link
              to="/senior/emergency"
              className="bg-red-600 px-4 py-2 rounded"
            >
             🚑 Emergency
            </Link>

            <button
              onClick={logout}
              className="bg-gray-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}

        {role === "staff" && (
          <>
            <Link to="/staff">🗒 Staff Dashboard</Link>

            <Link
              to="/staff/emergency"
              className="bg-red-600 px-4 py-2 rounded"
            >
             🚑 Emergencies
            </Link>

            <button
              onClick={logout}
              className="bg-gray-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;