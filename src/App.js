import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddTripLog from "./AddTripLog";
import Historique from "./Historique";
import Navbar from "./components/Navbar";
import "./AppStyles.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-trip-log" element={<AddTripLog />} />
        <Route path="/historique" element={<Historique />} />
      </Routes>
    </Router>
  );
}

export default App;
