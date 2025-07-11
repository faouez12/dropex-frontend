import React, { useEffect, useState } from "react";
import "./AppStyles.css";

function Dashboard() {
  const [tripLogs, setTripLogs] = useState([]);
  const [totalFuelCost, setTotalFuelCost] = useState(0);

  useEffect(() => {
    fetch("https://dropex-backend.onrender.com/api/triplogs")
      .then((response) => response.json())
      .then((data) => {
        setTripLogs(data);
        const totalCost = data.reduce(
          (sum, log) => sum + (log.fuelCost || 0),
          0
        );
        setTotalFuelCost(totalCost);
      })
      .catch((error) => console.error("Error fetching trip logs:", error));
  }, []);

  return (
    <div className="page">
      <h2>📊 Dashboard</h2>
      <p>Welcome to Dropex. Quick overview for your operations.</p>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Trip Logs</h3>
          <p>{tripLogs.length}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Fuel Cost (TND)</h3>
          <p>{totalFuelCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
