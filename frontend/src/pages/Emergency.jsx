import { useState, useEffect } from "react";
import { useEmergency } from "../context/EmergencyContext";

function Emergency() {
  const { triggerEmergency } = useEmergency();

  const [type, setType] = useState("Medical Emergency");
  const [showOverlay, setShowOverlay] = useState(false);
  const [gpsStatus, setGpsStatus] = useState("Idle");
  const [dispatchStep, setDispatchStep] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [location, setLocation] = useState(null);
  const [emergencyId, setEmergencyId] = useState(null);

  /* ================= COUNTDOWN EFFECT ================= */
  useEffect(() => {
    let timer;
    if (showOverlay && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showOverlay, countdown]);

  /* ================= HANDLE SOS ================= */
  const handleSOS = () => {
    if (!navigator.geolocation) {
      alert("GPS not supported");
      return;
    }

    setShowOverlay(true);
    setGpsStatus("Connecting to GPS...");
    setDispatchStep("");

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setLocation(coords);
      setGpsStatus("GPS Connected ✅");

      const id = "EMG-" + Date.now();
      setEmergencyId(id);

      setTimeout(() => setDispatchStep("📡 Notifying Staff..."), 1000);
      setTimeout(() => setDispatchStep("🏥 Contacting Hospital..."), 2000);
      setTimeout(() => setDispatchStep("📩 Alerting Family..."), 3000);

      setTimeout(() => {

        /* 🚨 THIS IS THE IMPORTANT FIX */
        triggerEmergency({
          id,
          resident: "Lakshmi Devi (72 yrs)",
          emergencyType: type,
          location: coords,
          createdAt: new Date().toLocaleString(),
          status: "ACTIVE",
          timeline: [
            "Emergency Triggered",
            "GPS Location Captured",
            "Staff Notification Sent"
          ]
        });

        setDispatchStep("🚨 Emergency Successfully Dispatched");

      }, 4000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 p-8">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-red-800">
          Senior Emergency Response System
        </h1>
        <p className="text-gray-700 mt-2">
          Immediate emergency assistance portal
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* RESIDENT CARD */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Resident Profile
          </h2>
          <p>Name: Lakshmi Devi</p>
          <p>Age: 72</p>
          <p>Blood Group: O+</p>
          <p>Condition: Hypertension</p>
        </div>

        {/* SOS CENTER */}
        <div className="flex flex-col items-center justify-center">

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mb-6 p-3 rounded border w-64"
          >
            <option>Medical Emergency</option>
            <option>Fall Detected</option>
            <option>Cardiac Issue</option>
            <option>Breathing Difficulty</option>
          </select>

          <button
            onClick={handleSOS}
            className="w-64 h-64 rounded-full bg-red-600 text-white text-5xl font-bold
            flex items-center justify-center
            animate-pulse shadow-[0_0_80px_rgba(255,0,0,0.8)]
            hover:scale-110 transition duration-300"
          >
            SOS
          </button>

        </div>

        {/* SYSTEM STATUS */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            System Status
          </h2>
          <p>🟢 GPS Module Active</p>
          <p>🟢 Family Contact Linked</p>
          <p>🟢 Hospital Network Online</p>
          <p>🟢 Staff Monitoring Enabled</p>
        </div>

      </div>

      {/* ================= OVERLAY ================= */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white z-50">

          <div className="bg-red-700 p-10 rounded-xl w-[450px] text-center shadow-2xl">

            <h2 className="text-3xl font-bold mb-6">
              🚨 Emergency Activated
            </h2>

            <p className="mb-2">{gpsStatus}</p>

            {dispatchStep && (
              <p className="mb-4 font-semibold">{dispatchStep}</p>
            )}

            {emergencyId && (
              <p className="mb-4 text-sm">
                Emergency ID: {emergencyId}
              </p>
            )}

            {countdown > 0 && (
              <p className="text-xl font-bold">
                Dispatch in: {countdown}s
              </p>
            )}

            {location && (
              <a
                href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
                target="_blank"
                rel="noreferrer"
                className="underline text-sm block mt-4"
              >
                View Location on Map
              </a>
            )}

            <button
              onClick={() => {
                setShowOverlay(false);
                setCountdown(5);
              }}
              className="mt-6 bg-black px-6 py-2 rounded hover:bg-gray-800"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Emergency;