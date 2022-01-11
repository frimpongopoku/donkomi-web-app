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
import { useNavigate } from "react-router-dom";
import "./Toolbar.css";

export default function Toolbar(props) {
  const { back, showSidebar } = props;
  const goto = useNavigate();
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
            Donkomi
          </p>
        </div>
      </div>
      <div className="right">
        <span className="tool-icon">
          <FontAwesomeIcon icon={faBell} />
        </span>
        <span
          className="tool-icon"
          onClick={() => goto("/user/control/shop-management/show-my-cart")}
        >
          <FontAwesomeIcon icon={faCartArrowDown} className="" />
        </span>
      </div>
    </div>
  );
}
