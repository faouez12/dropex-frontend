import React, { useEffect, useState } from "react";
import AddVehicleForm from "./AddVehicleForm";
import VehicleRow from "./VehicleRow";
import TripLogForm from "./TripLogForm"; // ✅ Import TripLogForm

function VehicleTable() {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = () => {
    fetch("http://localhost:5000/api/vehicles")
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🚚 Dropex Vehicle Tracker</h1>
      {/* Add Vehicle Form */}
      <AddVehicleForm onVehicleAdded={fetchVehicles} />
      {/* Download PDF Report */}
      <button
        onClick={() =>
          window.open(
            "http://localhost:5000/api/vehicles/generate-pdf-report",
            "_blank"
          )
        }
        style={{
          margin: "10px 0",
          padding: "10px 15px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        📄 Download Vehicle PDF Report
      </button>
      {/* Download QR Codes PDF */}
      <button
        onClick={() =>
          window.open(
            "http://localhost:5000/api/vehicles/generate-qrs",
            "_blank"
          )
        }
        style={{
          margin: "10px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        📥 Download QR Codes PDF
      </button>
      {/* Trip Log Form */}
      <TripLogForm /> {/* ✅ Adds trip logging under vehicle management */}
      {/* Vehicle Table */}
      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Type</th>
            <th>Branch</th>
            <th>Fuel Type</th>
            <th>Status</th>
            <th>KM Today</th>
            <th>Litres</th>
            <th>L/100KM</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <VehicleRow
              key={vehicle._id}
              vehicle={vehicle}
              onDelete={fetchVehicles}
              onUpdate={fetchVehicles}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleTable;
