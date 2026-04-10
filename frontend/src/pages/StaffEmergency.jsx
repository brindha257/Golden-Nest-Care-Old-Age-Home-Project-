import { useEmergency } from "../context/EmergencyContext";
import { useEffect, useState, useRef } from "react";

function StaffEmergency() {
  const { alerts, updateAlert, resolveAlert } = useEmergency();
  const [time, setTime] = useState(new Date());
  const containerRef = useRef(null);

  /* ================= LIVE CLOCK ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ================= PLAY SIREN ON NEW ALERT ================= */
  useEffect(() => {
    if (alerts.length > 0 && alerts[0].status === "ACTIVE") {
      const siren = new Audio(
        "https://actions.google.com/sounds/v1/alarms/emergency_siren.ogg"
      );
      siren.play();

      // auto scroll to top
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }
  }, [alerts]);

  const activeCount = alerts.filter(a => a.status === "ACTIVE").length;

  /* ================= CALCULATE LIVE TIMER ================= */
  const getElapsedTime = (createdAt) => {
    const created = new Date(createdAt);
    const diff = Math.floor((time - created) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-8 py-4 bg-black border-b border-red-600">
        <h1 className="text-2xl font-bold text-red-500 tracking-wide">
          🚨 Emergency Command Center
        </h1>

        <div className="flex gap-8 items-center">
          <p>🕒 {time.toLocaleTimeString()}</p>
          <p className="text-red-400 font-bold">
            Active Cases: {activeCount}
          </p>
          <p className="text-green-400 font-semibold">
            ● System Online
          </p>
        </div>
      </div>

      {/* CRITICAL ALERT BANNER */}
      {activeCount > 0 && (
        <div className="bg-red-600 text-center py-3 animate-pulse font-bold text-lg tracking-wide">
          🚨 CRITICAL EMERGENCY ALERT ACTIVE 🚨
        </div>
      )}

      <div
        ref={containerRef}
        className="grid grid-cols-4 gap-6 p-8 h-[calc(100vh-120px)] overflow-y-auto"
      >

        {/* LEFT SYSTEM PANEL */}
        <div className="col-span-1 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-red-400">
            System Monitoring
          </h2>

          <div className="space-y-2 text-sm">
            <p>🟢 GPS Network: Active</p>
            <p>🟢 Hospital API: Connected</p>
            <p>🟢 SMS Gateway: Online</p>
            <p>🟢 Staff Devices: Synced</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Live Activity Feed
            </h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>• Monitoring resident vitals...</p>
              <p>• Tracking GPS location...</p>
              <p>• Awaiting emergency triggers...</p>
            </div>
          </div>
        </div>

        {/* MAIN ALERT AREA */}
        <div className="col-span-3 space-y-6">

          {alerts.length === 0 && (
            <div className="bg-gray-800 p-10 rounded-xl text-center text-gray-400 border border-gray-700">
              No Active Emergencies
            </div>
          )}

          {alerts.map((alert, index) => (
            <div
              key={alert.id}
              className={`p-6 rounded-xl shadow-2xl border-l-8 transition-all duration-500
              ${alert.status === "ACTIVE"
                ? "bg-red-700 border-red-500 animate-pulse"
                : "bg-green-700 border-green-500"}`}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  {alert.resident}
                  {index === 0 && alert.status === "ACTIVE" && (
                    <span className="bg-yellow-400 text-black px-2 py-1 text-xs rounded">
                      NEW ALERT
                    </span>
                  )}
                </h2>

                <span className="bg-black px-3 py-1 rounded text-sm">
                  {alert.id}
                </span>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>Type: {alert.emergencyType}</p>
                <p>Triggered: {alert.createdAt}</p>
                <p>Status: {alert.status}</p>
                <p>
                  ⏱ Time Since Triggered:{" "}
                  {getElapsedTime(alert.createdAt)}
                </p>
                <p>
                  Location:
                  <a
                    href={`https://www.google.com/maps?q=${alert.location?.lat},${alert.location?.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline ml-2"
                  >
                    View Map
                  </a>
                </p>
              </div>

              {/* ACTION BUTTONS */}
              {alert.status === "ACTIVE" && (
                <div className="mt-6 flex gap-4 flex-wrap">
                  <button
                    onClick={() =>
                      updateAlert(alert.id, "Nurse Dispatched")
                    }
                    className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
                  >
                    Dispatch Nurse
                  </button>

                  <button
                    onClick={() =>
                      updateAlert(alert.id, "Hospital Contacted")
                    }
                    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Contact Hospital
                  </button>

                  <button
                    onClick={() =>
                      updateAlert(alert.id, "Family Notified")
                    }
                    className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 transition"
                  >
                    Notify Family
                  </button>

                  <button
                    onClick={() =>
                      resolveAlert(alert.id)
                    }
                    className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
                  >
                    Mark Resolved
                  </button>
                </div>
              )}

              {/* TIMELINE */}
              {alert.timeline && (
                <div className="mt-6 bg-black bg-opacity-40 p-4 rounded text-sm">
                  <h3 className="font-semibold mb-2">
                    Action Timeline:
                  </h3>
                  {alert.timeline.map((step, i) => (
                    <p key={i}>• {step}</p>
                  ))}
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default StaffEmergency;
