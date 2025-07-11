import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

function VehicleCharts() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  const barData = {
    labels: vehicles.map((v) => v.matricule),
    datasets: [
      {
        label: "KM Today",
        data: vehicles.map((v) => v.kilometrageToday || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: vehicles.map((v) => v.matricule),
    datasets: [
      {
        label: "Litres per 100KM",
        data: vehicles.map((v) => v.litresPer100km || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Vehicle KM Today</h2>
      <Bar data={barData} />

      <h2 style={{ marginTop: "30px" }}>🛢️ Litres per 100KM</h2>
      <Pie data={pieData} />
    </div>
  );
}

export default VehicleCharts;
