import React from "react";
import VehicleTable from "./VehicleTable";
import TripLogForm from "./TripLogForm";
import TripLogTable from "./TripLogTable";
import TripLogCharts from "./TripLogCharts";
import VehicleStatusPie from "./VehicleStatusPie";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🚚 Dropex Vehicle & Trip Tracker</h1>

      {/* Vehicle Management */}
      <VehicleTable />

      {/* Trip Log Form */}
      <TripLogForm />

      {/* Trip Log Table */}
      <TripLogTable />

      {/* Trip Log Charts */}
      <TripLogCharts />

      {/* Vehicle Status Pie Chart */}
      <VehicleStatusPie />

      <footer
        style={{
          marginTop: "40px",
          textAlign: "center",
          fontSize: "14px",
          color: "#555",
        }}
      >
        © {new Date().getFullYear()} Dropex | Managed with ❤️ by Germik
      </footer>
    </div>
  );
}

export default App;
