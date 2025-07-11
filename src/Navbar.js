import React from "react";
import { Link } from "react-router-dom";
import "./AppStyles.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">🚚 Dropex</div>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/add-trip-log">Add Trip Log</Link>
        <Link to="/historique">Historique</Link>
      </div>
    </nav>
  );
}

export default Navbar;
