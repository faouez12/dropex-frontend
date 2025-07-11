import React, { useState } from "react";
import "./AppStyles.css";

function AddTripLog() {
  const [formData, setFormData] = useState({
    branch: "",
    matricule: "",
    vehicleType: "",
    driverName: "",
    kmToday: "",
    fuelCost: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://dropex-backend.onrender.com/api/triplogs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("✅ Trip log added successfully!");
        setFormData({
          branch: "",
          matricule: "",
          vehicleType: "",
          driverName: "",
          kmToday: "",
          fuelCost: "",
        });
      } else {
        alert("❌ Failed to add trip log. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ An error occurred. Please try again.");
    }
  };

  return (
    <div className="page">
      <h2>🛣️ Add Trip Log</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Branch</label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
        />

        <label>Matricule</label>
        <input
          type="text"
          name="matricule"
          value={formData.matricule}
          onChange={handleChange}
          required
        />

        <label>Vehicle Type</label>
        <input
          type="text"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          required
        />

        <label>Driver Name</label>
        <input
          type="text"
          name="driverName"
          value={formData.driverName}
          onChange={handleChange}
          required
        />

        <label>KM Today</label>
        <input
          type="number"
          name="kmToday"
          value={formData.kmToday}
          onChange={handleChange}
          required
        />

        <label>Fuel Cost (TND)</label>
        <input
          type="number"
          name="fuelCost"
          value={formData.fuelCost}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-button">
          Add Trip Log
        </button>
      </form>
    </div>
  );
}

export default AddTripLog;
