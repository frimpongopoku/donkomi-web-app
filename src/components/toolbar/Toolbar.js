import {
  faBackward,
  faBars,
  faBell,
  faCartArrowDown,
  faHamburger,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Toolbar.css";

export default function Toolbar(props) {
  const { back, showSidebar } = props;
  return (
    <div className=" elevate-float toolbar-container">
      <div className="left">
        <div className="flex " style={{ padding: "0px 0px" }}>
          <span
            className="tool-icon pc-vanish"
            onClick={() => {
              if (showSidebar) showSidebar(true);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </span>
          {back && <FontAwesomeIcon icon={faLongArrowAltLeft} />}
          <p style={{ margin: 0, marginLeft: 7, fontWeight: "bold" }}>
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
