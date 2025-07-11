import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import AddTripLog from "./AddTripLog";
import Historique from "./Historique";
import "./AppStyles.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-trip-log" element={<AddTripLog />} />
          <Route path="/historique" element={<Historique />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
