import {
  faBackward,
  faBell,
  faCartArrowDown,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Toolbar.css";
export default function Toolbar(props) {
  const { back } = props;
  return (
    <div className=" elevate-float toolbar-container">
      <div className="left">
        <div className="flex " style={{ padding: "0px 20px" }}>
          {back && <FontAwesomeIcon icon={faLongArrowAltLeft} />}
          <p
            style={{ magin: 0, marginLeft: 7, fontWeight: "bold" }}
            className=""
          >
            Homepage
          </p>
        </div>
      </div>
      <div className="right">
        <span className="tool-icon">
          <FontAwesomeIcon icon={faBell} />
        </span>
        <span className="tool-icon">
          <FontAwesomeIcon icon={faCartArrowDown} className="" />
        </span>
      </div>
    </div>
  );
}
