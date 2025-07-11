import React, { useEffect, useState } from "react";
import "./AppStyles.css";

function Historique() {
  const [tripLogs, setTripLogs] = useState([]);

  useEffect(() => {
    fetch("https://dropex-backend.onrender.com/api/triplogs")
      .then((response) => response.json())
      .then((data) => setTripLogs(data))
      .catch((error) => console.error("Error fetching trip logs:", error));
  }, []);

  return (
    <div className="page">
      <h2>📜 Historique des Trip Logs</h2>
      <div className="table-container">
        <table className="triplog-table">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Matricule</th>
              <th>Vehicle Type</th>
              <th>Driver Name</th>
              <th>KM Today</th>
              <th>Fuel Cost (TND)</th>
              <th>Frais/100 KM</th>
            </tr>
          </thead>
          <tbody>
            {tripLogs.map((log) => (
              <tr key={log._id}>
                <td>{log.branch}</td>
                <td>{log.matricule}</td>
                <td>{log.vehicleType}</td>
                <td>{log.driverName}</td>
                <td>{log.kmToday}</td>
                <td>{log.fuelCost}</td>
                <td>{log.frais_100km ? log.frais_100km.toFixed(2) : "0.00"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Historique;
