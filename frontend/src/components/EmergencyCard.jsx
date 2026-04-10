function EmergencyCard({ alert, updateStatus }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-lg mb-6
      ${alert.status === "ACTIVE"
        ? "bg-red-600 animate-pulse text-white"
        : "bg-green-600 text-white"}`}
    >
      <h2 className="text-2xl font-bold mb-2">
        🚨 {alert.resident}
      </h2>

      <p>ID: {alert.id}</p>
      <p>Type: {alert.emergencyType}</p>
      <p>Blood Group: {alert.bloodGroup}</p>
      <p>Time: {alert.createdAt}</p>

      <p>
        📍 Location:
        <a
          href={`https://www.google.com/maps?q=${alert.location?.lat},${alert.location?.lng}`}
          target="_blank"
          rel="noreferrer"
          className="underline ml-2"
        >
          View Map
        </a>
      </p>

      <p>🏥 {alert.hospital}</p>
      <p>📩 {alert.family}</p>
      <p>Status: {alert.status}</p>

      {alert.status === "ACTIVE" && (
        <div className="mt-4 space-x-4">
          <button
            onClick={() =>
              updateStatus(alert.id, "Ambulance Dispatched")
            }
            className="bg-yellow-400 px-4 py-2 rounded text-black"
          >
            Dispatch Ambulance
          </button>

          <button
            onClick={() =>
              updateStatus(alert.id, "RESOLVED")
            }
            className="bg-green-400 px-4 py-2 rounded text-black"
          >
            Mark Resolved
          </button>
        </div>
      )}
    </div>
  );
}

export default EmergencyCard;
