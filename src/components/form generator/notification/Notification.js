import React from "react";
import { makeClass } from "../shared/_shared.styles";

const styles = {
  alert: {
    padding: "15px",
    background: "antiquewhite",
    cursor: "pointer",
    borderRadius: 3,
    " & p": { margin: 0, color: "#ba7c20" },
    "&:hover": {
      opacity: ".8",
      transition: ".5s ease-out",
    },
  },
  greenNotification: {
    padding: "15px",
    background: "#d8ebd8",
    cursor: "pointer",
    borderRadius: 3,
    " & p": { margin: 0, color: "green" },
    "&:hover": {
      opacity: ".8",
      transition: ".5s ease-out",
    },
  },
  redNotification: {
    padding: "15px",
    background: "#ffdfdf",
    cursor: "pointer",
    borderRadius: 3,
    " & p": { margin: 0, color: "#a95353" },
    "&:hover": {
      opacity: ".8",
      transition: ".5s ease-out",
    },
  },
};
function Notification({ msg, message, type, close }) {
  var theme;
  if (type === "good") theme = styles.greenNotification;
  else theme = styles.redNotification;
  return (
    <div className={makeClass(theme)} onClick={() => close && close()}>
      <p>{msg || message}</p>
    </div>
  );
}
export function DonkomiAlert({ style, onClick, children }) {
  var theme = styles.alert;
  theme = { ...theme, ...(style || {}) };
  return (
    <div className={makeClass(theme)} onClick={() => onClick && onClick()}>
      <p>{children || "This is an alert"}</p>
    </div>
  );
}

Notification.propTypes = {};

Notification.defaultProps = {
  type: "good",
  // message: "This is your notification message",
};
export default Notification;
