import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./App.css";

const Historique = () => {
  const [tripLogs, setTripLogs] = useState([]);

  useEffect(() => {
    fetchTripLogs();
  }, []);

  const fetchTripLogs = async () => {
    try {
      const res = await axios.get(
        "https://dropex-backend.onrender.com/api/triplogs"
      );
      setTripLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTripLog = async (id) => {
    if (window.confirm("Are you sure you want to delete this trip log?")) {
      try {
        await axios.delete(
          `https://dropex-backend.onrender.com/api/triplogs/${id}`
        );
        fetchTripLogs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Historique des Trip Logs", 14, 20);

    const tableColumn = [
      "Branch",
      "Matricule",
      "Vehicle Type",
      "Driver Name",
      "KM Today",
      "Fuel Cost (TND)",
      "Frais/100 KM",
    ];
    const tableRows = [];

    tripLogs.forEach((log) => {
      const logData = [
        log.branch || "-",
        log.matricule || "-",
        log.vehicleType || "-",
        log.driverName || "-",
        log.kmToday || "-",
        log.fuelCost || "-",
        log.fraisPer100Km ? log.fraisPer100Km.toFixed(2) : "-",
      ];
      tableRows.push(logData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("Historique_TripLogs.pdf");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>📜 Historique des Trip Logs</h2>
        <button className="download-button" onClick={downloadPDF}>
          📥 Download PDF
        </button>
        <table>
          <thead>
            <tr>
              <th>Branch</th>
              <th>Matricule</th>
              <th>Vehicle Type</th>
              <th>Driver Name</th>
              <th>KM Today</th>
              <th>Fuel Cost (TND)</th>
              <th>Frais/100 KM</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tripLogs.map((log) => (
              <tr key={log._id}>
                <td>{log.branch}</td>
                <td>{log.matricule}</td>
                <td>{log.vehicleType}</td>
                <td>{log.driverName}</td>
                <td>{log.kmToday}</td>
                <td>{log.fuelCost}</td>
                <td>
                  {log.fraisPer100Km ? log.fraisPer100Km.toFixed(2) : "0.00"}
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteTripLog(log._id)}
                  >
                    🗑️ Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historique;
