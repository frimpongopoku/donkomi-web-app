import { faCog, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./BottomNavigation.css";
import { NAV_MENU } from "./values";
export default function BottomNavigation() {
  return (
    <div className="bottom-nav-container">
      <div className="bottom-nav-content">
        {NAV_MENU.map((menu, index) => {
          return (
            <React.Fragment key={index?.toString()}>
              <TabItem {...menu} label={menu.name} icon={menu.icon} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

const TabItem = ({ icon = faHome, label = "Home", url, onClick }) => {
  const navigate = useNavigate();
  return (
    <div
      className="tab-item"
      onClick={() => {
        if (url) return navigate(url);
        if (onClick) return onClick();
      }}
    >
      <FontAwesomeIcon icon={icon} style={{ fontSize: 18 }} />
      <small style={{ fontWeight: "bold", marginTop: 5 }}>{label}</small>
    </div>
  );
};
