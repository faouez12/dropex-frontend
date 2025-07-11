import React, { useEffect, useState } from "react";
import "./AppStyles.css";

function Historique() {
  const [tripLogs, setTripLogs] = useState([]);

  const fetchTripLogs = async () => {
    try {
      const res = await fetch(
        "https://dropex-backend.onrender.com/api/triplogs"
      );
      const data = await res.json();
      setTripLogs(data);
    } catch (err) {
      console.error("Error fetching trip logs:", err);
    }
  };

  useEffect(() => {
    fetchTripLogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trip log?"))
      return;
    try {
      await fetch(`https://dropex-backend.onrender.com/api/triplogs/${id}`, {
        method: "DELETE",
      });
      fetchTripLogs(); // Refresh data
    } catch (err) {
      console.error("Error deleting trip log:", err);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>📜 Historique des Trip Logs</h2>
        <table>
          <thead>
            <tr>
              <th>Branch</th>
              <th>Matricule</th>
              <th>Vehicle Type</th>
              <th>Driver Name</th>
              <th>KM Today</th>
              <th>Fuel Cost (TND)</th>
              <th>Frais/100 KM</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tripLogs.map((log) => (
              <tr key={log._id}>
                <td>{log.branch || "-"}</td>
                <td>{log.matricule || "-"}</td>
                <td>{log.vehicleType || "-"}</td>
                <td>{log.driverName || "-"}</td>
                <td>{log.kmToday || "-"}</td>
                <td>{log.fuelCost || "-"}</td>
                <td>{log.frais_100km ? log.frais_100km.toFixed(2) : "-"}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(log._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Historique;
