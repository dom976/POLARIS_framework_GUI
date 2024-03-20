import { Outlet, Link, NavLink } from "react-router-dom";
import Contact from "./Contact";
import Homepage from "./Homepage";
import Catalogue from "./Catalogue";

function Navbar() {
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
      <nav
        className="navbar navbar-expand-md sticky-top py-3"
        style={{ background: "#b39ddb", height: 137 }}
      >
        <style
          /* Sottolineatura dell'oggetto all'interno della navbar quando ci si trova all'interno di una pagina o quando si passa sopra
     col cursore del mouse ai vari oggetti della navbar */
          dangerouslySetInnerHTML={{
            __html:
              ".nav-link:hover {\n            text-decoration: underline;\n          }\n          \n          .nav-link.active {\n            text-decoration: underline;\n          }",
          }}
        />

        <div className="container">
          <button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-5"
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navcol-5"
            style={{ height: 130 }}
          >
            <img src="assets/img/NAVBAR%20LOGO.png" width={165} height={162} />
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/Homepage"
                  style={({ isActive }) => ({
                    ...baseStyle,
                    ...(isActive ? activeHoverStyle : {}), // Applica stile attivo se il link è attivo
                  })}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = "underline"; // Aggiunge sottolineatura on hover
                  }}
                  onMouseLeave={(e) => {
                    // Rimuove la sottolineatura on hover se il link non è attivo
                    e.target.style.textDecoration = e.target.getAttribute(
                      "aria-current"
                    )
                      ? "underline"
                      : "none";
                  }}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/Contact"
                  style={({ isActive }) => ({
                    ...baseStyle,
                    ...(isActive ? activeHoverStyle : {}), // Applica stile attivo se il link è attivo
                  })}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = "underline"; // Aggiunge sottolineatura on hover
                  }}
                  onMouseLeave={(e) => {
                    // Rimuove la sottolineatura on hover se il link non è attivo
                    e.target.style.textDecoration = e.target.getAttribute(
                      "aria-current"
                    )
                      ? "underline"
                      : "none";
                  }}
                >
                  Contact
                </NavLink>
                <a
  href="https://www.il-tuo-sito.com"
  style={baseStyle} // Applica lo stile di base
  onMouseEnter={(e) => {
    e.target.style.textDecoration = "underline"; // Aggiunge sottolineatura on hover
  }}
  onMouseLeave={(e) => {
    e.target.style.textDecoration = "none"; // Rimuove la sottolineatura on hover
  }}
>
  Forum
</a>

              </li>
              <li className="nav-item" />
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
