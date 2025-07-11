import React, { useEffect, useState } from "react";

function TripLogTable() {
  const [tripLogs, setTripLogs] = useState([]);

  const fetchTripLogs = () => {
    fetch("http://localhost:5000/api/triplogs")
      .then((response) => response.json())
      .then((data) => setTripLogs(data))
      .catch((error) => console.error("Error fetching trip logs:", error));
  };

  useEffect(() => {
    fetchTripLogs();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>📊 Trip Logs</h2>
      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Vehicle</th>
            <th>KM Yesterday</th>
            <th>KM Today</th>
            <th>KM Driven</th>
            <th>Fuel (L)</th>
            <th>L/100KM</th>
            <th>Cost/100KM</th>
          </tr>
        </thead>
        <tbody>
          {tripLogs.map((log) => (
            <tr key={log._id}>
              <td>{new Date(log.date).toLocaleDateString()}</td>
              <td>{log.vehicleId?.matricule || "N/A"}</td>
              <td>{log.kmYesterday}</td>
              <td>{log.kmToday}</td>
              <td>{log.kmDriven}</td>
              <td>{log.fuelAmount}</td>
              <td>
                {log.litresPer100Km ? log.litresPer100Km.toFixed(2) : "-"}
              </td>
              <td>{log.costPer100Km ? log.costPer100Km.toFixed(2) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TripLogTable;
