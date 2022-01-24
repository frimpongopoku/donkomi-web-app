import React from "react";
import { NotFoundImage } from "./exports";

function Notice({ style, image, label }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "floralwhite",
        ...(style || {}),
      }}
    >
      <img
        src={image || NotFoundImage}
        style={{ height: 300, objectFit: "contain" }}
      />
      <p style={{ color: "var(--app-color-darker)" }}>
        {label || "A notice is meant to be here..."}
      </p>
    </div>
  );
}

export default Notice;
