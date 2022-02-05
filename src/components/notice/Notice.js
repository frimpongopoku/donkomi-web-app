import React from "react";
import { NotFoundImage } from "./exports";

function Notice({ style, image, label, imageStyle }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...(style || {}),
      }}
    >
      <img
        src={image || NotFoundImage}
        style={{ height: 300, objectFit: "contain", ...(imageStyle || {}) }}
      />
      <p style={{ color: "var(--app-color-darker)" }}>
        {label || "A notice is meant to be here..."}
      </p>
    </div>
  );
}

export default Notice;
