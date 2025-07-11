// src/VehicleRow.js

import React from "react";

function VehicleRow({ vehicle, onUpdate, onDelete }) {
  const handleDelete = () => {
    fetch(`http://localhost:5000/api/vehicles/${vehicle._id}`, {
      method: "DELETE",
    })
      .then(() => onDelete())
      .catch((error) => console.error("Error deleting vehicle:", error));
  };

  const handleGenerateQR = () => {
    window.open(
      `http://localhost:5000/api/vehicles/generate-qr/${vehicle._id}`,
      "_blank"
    );
  };

  return (
    <tr>
      <td>{vehicle.matricule}</td>
      <td>{vehicle.type}</td>
      <td>{vehicle.branch}</td>
      <td>{vehicle.fuelType}</td>
      <td>{vehicle.status}</td>
      <td>{vehicle.kilometrageToday}</td>
      <td>{vehicle.litresConsumed}</td>
      <td>{vehicle.litresPer100km}</td>
      <td>
        <button onClick={handleGenerateQR}>QR</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default VehicleRow;
