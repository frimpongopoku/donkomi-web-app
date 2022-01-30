import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CoverLoader from "./CoverLoader";

export default function Loader(props) {
  const { cover, label, color } = props;
  if (cover) return <CoverLoader {...props} />;

  return (
    <div>
      <div
        style={{
          color: color || "green",
          fontWeight: "bold",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <span className="spin" style={{ fontSize: 30, marginRight: 10 }}>
          <FontAwesomeIcon icon={faSpinner} />
        </span>

        <p>{label || "Loading..."}</p>
      </div>
    </div>
  );
}
