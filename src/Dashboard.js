import React, { useEffect, useState } from "react";
import "./AppStyles.css";

function Dashboard() {
  const [tripLogs, setTripLogs] = useState([]);
  const [totalFuelCost, setTotalFuelCost] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://dropex-backend.onrender.com/api/triplogs"
      );
      const data = await res.json();
      setTripLogs(data);
      const totalCost = data.reduce(
        (sum, log) => sum + (parseFloat(log.fuelCost) || 0),
        0
      );
      setTotalFuelCost(totalCost);
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>📊 Dashboard</h2>
        <p>Welcome to Dropex. Quick overview for your operations.</p>
        <h3>Total Trip Logs</h3>
        <p>{tripLogs.length}</p>
        <h3>Total Fuel Cost (TND)</h3>
        <p>{totalFuelCost.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Dashboard;
