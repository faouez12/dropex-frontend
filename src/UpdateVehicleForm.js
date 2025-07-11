import React, { useState } from "react";

function UpdateVehicleForm({ vehicle, onUpdate }) {
  const [kilometrageToday, setKilometrageToday] = useState(
    vehicle.kilometrageToday || 0
  );
  const [litresConsumed, setLitresConsumed] = useState(
    vehicle.litresConsumed || 0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const litresPer100km = (litresConsumed / (kilometrageToday / 100)).toFixed(
      2
    );

    fetch(`http://localhost:5000/api/vehicles/${vehicle._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kilometrageToday,
        litresConsumed,
        litresPer100km,
      }),
    })
      .then(() => onUpdate())
      .catch((error) => console.error("Error updating vehicle:", error));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input
        type="number"
        placeholder="KM Today"
        value={kilometrageToday}
        onChange={(e) => setKilometrageToday(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Litres Consumed"
        value={litresConsumed}
        onChange={(e) => setLitresConsumed(Number(e.target.value))}
        required
      />
      <button type="submit">Update KM & Fuel</button>
    </form>
  );
}

export default UpdateVehicleForm;
