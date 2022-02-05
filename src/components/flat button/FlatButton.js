import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./FlatButton.css";
function FlatButton({
  children,
  loading,
  style,
  className,
  onClick,
  textStyle,
  disabled,
}) {
  return (
    <div
      onClick={() => !disabled && onClick && onClick()}
      className={`flat-btn touchable-opacity ${className}`}
      style={{ ...(style || {}) }}
    >
      {loading && (
        <span style={{ marginRight: 6, ...(textStyle || {}) }}>
          <FontAwesomeIcon icon={faSpinner} className="spin" />
        </span>
      )}
      <span style={textStyle || {}}>{children || "Clicke Me"}</span>
    </div>
  );
}

export default FlatButton;
