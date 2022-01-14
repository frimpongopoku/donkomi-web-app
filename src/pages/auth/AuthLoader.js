import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
function AuthLoader({ label = "Authenticating..." }) {
  return (
    <div className="flex" style={{ padding: 10 }}>
      <span className="fa spin" style={{ marginRight: 6 }}>
        <FontAwesomeIcon className="spin" icon={faSpinner} color="green" />
      </span>
      <small style={{ color: "green", fontWeight: "bold" }}>{label}</small>
    </div>
  );
}

export default AuthLoader;
