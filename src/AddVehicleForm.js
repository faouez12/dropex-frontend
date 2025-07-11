import React, { useState } from "react";

function AddVehicleForm({ onVehicleAdded }) {
  const [matricule, setMatricule] = useState("");
  const [type, setType] = useState("");
  const [branch, setBranch] = useState("");
  const [fuelType, setFuelType] = useState("Essence");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matricule, type, branch, fuelType }),
    })
      .then((res) => res.json())
      .then(() => {
        setMatricule("");
        setType("");
        setBranch("");
        setFuelType("Essence");
        onVehicleAdded();
      })
      .catch((err) => console.error("Add vehicle error:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Vehicle</h3>
      <input
        type="text"
        placeholder="Matricule"
        value={matricule}
        onChange={(e) => setMatricule(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        required
      />
      <select
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value)}
        required
      >
        <option value="Essence">Essence</option>
        <option value="Diesel">Diesel</option>
      </select>
      <button type="submit">Add Vehicle</button>
    </form>
  );
}

export default AddVehicleForm;
