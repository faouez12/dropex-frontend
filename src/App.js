import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddTripLog from "./AddTripLog";
import Historique from "./Historique";
import "./AppStyles.css";

function App() {
  return (
    <Router>
      <div className="navbar">
        <span className="logo">🚚 Dropex</span>
        <div className="links">
          <Link to="/">Dashboard</Link>
          <Link to="/add-trip-log">Add Trip Log</Link>
          <Link to="/historique">Historique</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-trip-log" element={<AddTripLog />} />
        <Route path="/historique" element={<Historique />} />
      </Routes>
    </Router>
  );
}

export default App;
