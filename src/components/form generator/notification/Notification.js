import React from "react";
import { makeClass } from "../shared/_shared.styles";

const styles = {
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

Notification.propTypes = {};

Notification.defaultProps = {
  type: "good",
  msg: "This is your notification message",
};
export default Notification;
