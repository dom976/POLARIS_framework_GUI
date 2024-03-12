import React from "react";
import { useState } from "react";

function Hover() {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const boxStyle = {
    border: "none",
    outline: "none",
    color: "#fff",
    width: "100%",
    padding: "20px",
    background: "#8870FF",
    fontSize: "100%",
    fontWeight: "600",
    borderRadius: "6px",
    transition: "transform 300ms 0s cubic-bezier(0, 0.23, 0.29, 2.45)",
    background: isHover ? "#7F69EE" : "#8870FF", // Cambia il colore di sfondo in hover
    transform: isHover ? "translateY(-2px)" : "none",
  };

  return (
    <>
      <button
        className="submit"
        type="submit"
        style={boxStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Submit
      </button>
    </>
  );
}

export default Hover;
