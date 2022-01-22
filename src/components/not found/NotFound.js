import React from "react";
import notfoundimage from "./../../shared/images/not_found.png";
function NotFound({
  label = "No items available yet...",
  image,
  actionText,
  action,
}) {
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
      {action && (
        <p
          className="touchable-opacity"
          style={{
            marginTop: 15,
            background: "var(--app-color-darker)",
            borderRadius: 55,
            padding: "10px 25px",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={() => action && action()}
        >
          {actionText || "Action Text"}
        </p>
      )}
    </div>
  );
}

export default NotFound;
