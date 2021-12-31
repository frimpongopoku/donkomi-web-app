import React from "react";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { MENU } from "./values";

function Sidebar(props) {
  const {} = props;
  return (
    <div className="sidebar-wrapper elevate-float">
      <div className="upper">
        <img src="https://i.pravatar.cc/300" />
        <h5>Frimpong Opoku Agyemang</h5>
        <small>@Merchant, @Seller, @Driver</small>
      </div>
      <div className="mid">
        {MENU.map((menu, index) => {
          return (
            <div key={index?.toString()}>
              <SideMenuItem label={menu.name} icon={menu.icon} />
            </div>
          );
        })}
      </div>
      <div className="lower"></div>
    </div>
  );
}

const SideMenuItem = ({ icon = faHome, label = "Home", className }) => {
  return (
    <div className={`side-menu-item ${className || ""}`}>
      <FontAwesomeIcon icon={icon} />
      <p>{label}</p>
    </div>
  );
};

export default Sidebar;
