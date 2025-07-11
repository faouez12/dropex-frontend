import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./App.css";

function Historique() {
  const [tripLogs, setTripLogs] = useState([]);

  useEffect(() => {
    fetchTripLogs();
  }, []);

  const fetchTripLogs = async () => {
    try {
      const response = await axios.get(
        "https://dropex-backend.onrender.com/api/triplogs"
      );
      setTripLogs(response.data);
    } catch (error) {
      console.error("Error fetching trip logs:", error);
    }
  };

  const deleteTripLog = async (id) => {
    try {
      await axios.delete(
        `https://dropex-backend.onrender.com/api/triplogs/${id}`
      );
      fetchTripLogs();
    } catch (error) {
      console.error("Error deleting trip log:", error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Historique des Trip Logs", 14, 15);

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
        log.branch,
        log.matricule,
        log.vehicleType,
        log.driverName,
        log.kmToday,
        log.fuelCost,
        log.frais100km,
      ];
      tableRows.push(logData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
    });

    doc.save("Historique_TripLogs.pdf");
  };

  return (
    <div className="container">
      <h2>📜 Historique des Trip Logs</h2>
      <button className="download-btn" onClick={downloadPDF}>
        Download PDF
      </button>
      <div className="table-container">
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
                <td>{log.frais100km}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTripLog(log._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Historique;
