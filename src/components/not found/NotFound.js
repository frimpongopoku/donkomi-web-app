import React from "react";
import notfoundimage from "./../../shared/images/not_found.png";
function NotFound({ label = "No items available yet...", image }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={image || notfoundimage}
        style={{ height: 140, width: 140, objectFit: "contain", margin: 20 }}
      />
      <p style={{ color: "grey" }}>{label}</p>
    </div>
  );
}

export default NotFound;
