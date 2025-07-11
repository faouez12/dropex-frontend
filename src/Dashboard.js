import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [tripLogs, setTripLogs] = useState([]);
  const [totalFuelCost, setTotalFuelCost] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://dropex-backend.onrender.com/api/triplogs"
        );
        setTripLogs(res.data);

        const totalCost = res.data.reduce(
          (sum, log) => sum + parseFloat(log.fuelCost || 0),
          0
        );
        setTotalFuelCost(totalCost);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const chartData = tripLogs.map((log) => ({
    driverName: log.driverName,
    fuelCost: parseFloat(log.fuelCost),
  }));

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          <span role="img" aria-label="dashboard">
            📊
          </span>{" "}
          Dashboard
        </h2>
        <p className="text-center">
          Welcome to Dropex. Quick overview for your operations.
        </p>

        <div className="text-center mt-4">
          <h5>
            <strong>Total Trip Logs:</strong> {tripLogs.length}
          </h5>
          <h5>
            <strong>Total Fuel Cost (TND):</strong> {totalFuelCost.toFixed(2)}
          </h5>
        </div>

        <div className="mt-5">
          <h5 className="text-center mb-3">Fuel Cost per Trip Log</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="driverName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fuelCost" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
