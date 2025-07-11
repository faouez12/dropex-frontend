import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#007bff",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "22px", marginRight: "8px" }}>🚚</span>
        <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>
          Dropex
        </span>
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/add-trip-log"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Add Trip Log
        </Link>
        <Link
          to="/historique"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Historique
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
