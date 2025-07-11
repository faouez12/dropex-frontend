import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TripLogCharts() {
  const [tripLogs, setTripLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/triplogs")
      .then((res) => res.json())
      .then((data) => setTripLogs(data))
      .catch((err) => console.error("Error fetching trip logs:", err));
  }, []);

  const vehicleLabels = tripLogs.map(
    (log) => log.vehicleId?.matricule || "N/A"
  );
  const kmDrivenData = tripLogs.map((log) => log.kmDriven || 0);
  const fuelEfficiencyData = tripLogs.map((log) =>
    log.litresPer100Km ? log.litresPer100Km.toFixed(2) : 0
  );

  const kmDrivenChart = {
    labels: vehicleLabels,
    datasets: [
      {
        label: "KM Driven",
        data: kmDrivenData,
      },
    ],
  };

  const fuelEfficiencyChart = {
    labels: vehicleLabels,
    datasets: [
      {
        label: "L/100KM",
        data: fuelEfficiencyData,
      },
    ],
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>📊 KM Driven Per Vehicle</h2>
      <Bar data={kmDrivenChart} />

      <h2 style={{ marginTop: "40px" }}>⛽ Fuel Efficiency (L/100KM)</h2>
      <Bar data={fuelEfficiencyChart} />
    </div>
  );
}

export default TripLogCharts;
