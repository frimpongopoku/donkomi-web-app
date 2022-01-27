import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function CoverLoader({ label }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        background: "antiquewhite",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "10",
        padding: 20,
      }}
    >
      <span className="spin" style={{ fontSize: 30, marginRight: 10 }}>
        <FontAwesomeIcon icon={faSpinner} />
      </span>

      <p>{label || "Loading..."}</p>
    </div>
  );
}
