import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Marketplace from "./pages/MarketPlace";
import Donor from "./pages/Donor";
import Emergency from "./pages/Emergency";

import SeniorLogin from "./pages/SeniorLogin";
import StaffLogin from "./pages/staffLogin";
import StaffPortal from "./pages/StaffPortal";
import StaffEmergency from "./pages/StaffEmergency";
import ResidentZone from "./pages/ResidentZone";
import Checkout from "./pages/Checkout";



function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/donor" element={<Donor />} />
       
<Route
  path="/resident"
  element={
    <ProtectedRoute allowedRoles={["senior"]}>
      <ResidentZone />
    </ProtectedRoute>
  }
/>


        <Route path="/login/senior" element={<SeniorLogin />} />
        <Route path="/login/staff" element={<StaffLogin />} />
        <Route path="/checkout" element={<Checkout />} />

       <Route
  path="/senior/emergency"
  element={
    <ProtectedRoute allowedRoles={["senior"]}>
      <Emergency />
    </ProtectedRoute>
  }
/>

<Route
  path="/staff/emergency"
  element={
    <ProtectedRoute allowedRoles={["staff"]}>
      <StaffEmergency />
    </ProtectedRoute>
  }
/>


        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffPortal />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
