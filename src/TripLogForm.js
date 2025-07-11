import React, { useState, useEffect } from "react";

function TripLogForm() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    vehicleId: "",
    driverId: "", // optional, skip for now if drivers not yet added
    kmYesterday: "",
    kmToday: "",
    fuelAmount: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/triplogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Trip log added successfully!");
        setFormData({
          vehicleId: "",
          driverId: "",
          kmYesterday: "",
          kmToday: "",
          fuelAmount: "",
        });
      } else {
        alert("❌ Error adding trip log.");
      }
    } catch (error) {
      console.error("Error submitting trip log:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>🛣️ Add Trip Log</h3>
      <form onSubmit={handleSubmit}>
        <select
          name="vehicleId"
          value={formData.vehicleId}
          onChange={handleChange}
          required
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
              {vehicle.matricule} - {vehicle.type}
            </option>
          ))}
        </select>{" "}
        <input
          type="number"
          name="kmYesterday"
          placeholder="KM Yesterday"
          value={formData.kmYesterday}
          onChange={handleChange}
          required
        />{" "}
        <input
          type="number"
          name="kmToday"
          placeholder="KM Today"
          value={formData.kmToday}
          onChange={handleChange}
          required
        />{" "}
        <input
          type="number"
          name="fuelAmount"
          placeholder="Fuel Amount (L)"
          value={formData.fuelAmount}
          onChange={handleChange}
          required
        />{" "}
        <button type="submit">Add Trip Log</button>
      </form>
    </div>
  );
}

export default TripLogForm;
