import React, { useEffect, useState } from "react";
import "./AppStyles.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [tripLogs, setTripLogs] = useState([]);
  const [totalFuel, setTotalFuel] = useState(0);

  const fetchTripLogs = async () => {
    try {
      const res = await fetch(
        "https://dropex-backend.onrender.com/api/triplogs"
      );
      const data = await res.json();
      setTripLogs(data);

      const totalFuelCost = data.reduce(
        (acc, log) => acc + (log.fuelCost || 0),
        0
      );
      setTotalFuel(totalFuelCost);
    } catch (err) {
      console.error("Error fetching trip logs:", err);
    }
  };

  useEffect(() => {
    fetchTripLogs();
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>📊 Dashboard</h2>
        <p>Welcome to Dropex. Quick overview for your operations.</p>
        <p>
          <strong>Total Trip Logs:</strong> {tripLogs.length}
        </p>
        <p>
          <strong>Total Fuel Cost (TND):</strong> {totalFuel.toFixed(2)}
        </p>
        <h3>Fuel Cost per Trip Log</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tripLogs}>
            <XAxis dataKey="driverName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="fuelCost" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
