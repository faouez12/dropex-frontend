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
        alert("❌ Failed to add trip log.");
      }
    } catch (error) {
      alert("❌ Error occurred.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>🛣️ Add Trip Log</h2>
        <form onSubmit={handleSubmit} className="form">
          {[
            "branch",
            "matricule",
            "vehicleType",
            "driverName",
            "kmToday",
            "fuelCost",
          ].map((field) => (
            <React.Fragment key={field}>
              <label>
                {field === "kmToday"
                  ? "KM Today"
                  : field === "fuelCost"
                  ? "Fuel Cost (TND)"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={
                  field === "kmToday" || field === "fuelCost"
                    ? "number"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </React.Fragment>
          ))}
          <button type="submit" className="submit-button">
            Add Trip Log
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTripLog;
