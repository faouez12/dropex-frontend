import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function VehicleStatusPie() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, []);

  const activeCount = vehicles.filter((v) => v.status === "Active").length;
  const inactiveCount = vehicles.filter((v) => v.status === "Inactive").length;

  const data = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [activeCount, inactiveCount],
      },
    ],
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>📊 Vehicle Status Distribution</h2>
      <Pie data={data} />
    </div>
  );
}

export default VehicleStatusPie;
