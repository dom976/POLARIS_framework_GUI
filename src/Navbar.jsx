import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import Contact from "./Contact";
import Homepage from "./Homepage";
import Catalogue from "./Catalogue";
import Learning from "./Learning"; // Import the About component

function Navbar() {
  const [expanded, setExpanded] = useState(false); // State per gestire l'apertura e la chiusura della navbar su display più piccoli

  const baseStyle = {
    color: "black", // Colore di default dei link
    fontSize: "30px", // Dimensione del font
    textDecoration: "none", // Rimuove la sottolineatura di default
    padding: "10px",
    fontWeight: "bold", // Grassetto
  };

  // Stili quando il link è attivo o in hover
  const activeHoverStyle = {
    textDecoration: "underline", // Aggiunge la sottolineatura
  };

  return (
    <>
      <nav className="navbar navbar-expand-md sticky-top" style={{ background: "#b39ddb", }}>
        <div className="container">
          <nav className="navbar-brand">
            <img src="assets/img/NAVBAR%20LOGO.png" width={100} height={100} alt="Logo" />
          </nav>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setExpanded(!expanded)} // Cambia lo stato di espansione della navbar
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/Homepage"
                  style={({ isActive }) => ({
                    ...baseStyle,
                    ...(isActive ? activeHoverStyle : {}),
                  })}
                  className="nav-link"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/How"
                  style={({ isActive }) => ({
                    ...baseStyle,
                    ...(isActive ? activeHoverStyle : {}),
                  })}
                  className="nav-link"
                >
                  HowTo
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Contact"
                  style={({ isActive }) => ({
                    ...baseStyle,
                    ...(isActive ? activeHoverStyle : {}),
                  })}
                  className="nav-link"
                >
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  href="https://localhost/securedevai"
                  style={baseStyle}
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Forum
                </a>
              </li>
              {/* Add NavLink for the About page */}
              <li className="nav-item">
                <NavLink
                  to="/Learning"
                  style={({ isActive }) => ({
                    ...baseStyle,
                    ...(isActive ? activeHoverStyle : {}),
                  })}
                  className="nav-link"
                >
                  Learning
                </NavLink>
              </li>
            </ul>
            <NavLink
              to="/Catalogue"
              className="btn btn-primary ms-md-2"
              style={{ fontSize: 30 }}
              role="button"
            >
              <strong>Catalogue</strong>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
