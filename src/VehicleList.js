// src/VehicleList.js
import React, { useEffect, useState } from "react";
import AddVehicleForm from "./AddVehicleForm";
import VehicleRow from "./VehicleRow"; // ✅ import correctly

function VehicleList() {
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
    <div>
      <AddVehicleForm onVehicleAdded={fetchVehicles} />
      <h2>Vehicle List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Type</th>
            <th>Branch</th>
            <th>Fuel Type</th>
            <th>Status</th>
            <th>Actions</th> {/* for edit/delete */}
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <VehicleRow
              key={vehicle._id}
              vehicle={vehicle}
              onUpdate={fetchVehicles}
              onDelete={fetchVehicles}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleList;
