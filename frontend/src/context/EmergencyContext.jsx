import { createContext, useContext, useState } from "react";

const EmergencyContext = createContext();

export const EmergencyProvider = ({ children }) => {

  const [alerts, setAlerts] = useState([]);

  /* ================= TRIGGER EMERGENCY ================= */
  const triggerEmergency = (data) => {

    const newAlert = {
      ...data,
      status: "ACTIVE",
      timeline: data.timeline || ["Emergency Triggered"]
    };

    setAlerts((prev) => [newAlert, ...prev]);
  };

  /* ================= UPDATE ALERT ================= */
  const updateAlert = (id, action) => {
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === id) {
          return {
            ...alert,
            timeline: [...(alert.timeline || []), action]
          };
        }
        return alert;
      })
    );
  };

  /* ================= RESOLVE ALERT ================= */
  const resolveAlert = (id) => {
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === id) {
          return {
            ...alert,
            status: "RESOLVED",
            timeline: [...(alert.timeline || []), "Emergency Resolved"]
          };
        }
        return alert;
      })
    );
  };

  return (
    <EmergencyContext.Provider
      value={{
        alerts,
        triggerEmergency,
        updateAlert,
        resolveAlert
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  return useContext(EmergencyContext);
};