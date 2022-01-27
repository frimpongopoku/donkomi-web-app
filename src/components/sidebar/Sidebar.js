import React from "react";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer, faHome, faLock } from "@fortawesome/free-solid-svg-icons";
import { MENU } from "./values";
import { useNavigate, useParams } from "react-router-dom";

function Sidebar(props) {
  const { animate, updateFireState, updateUserState, user } = props;
  const params = useParams();

  const signOutOfRedux = () => {
    updateFireState(null);
    updateUserState(null);
  };
  return (
    <div
      className={`sidebar-wrapper elevate-float ${
        animate ? "slide-anime" : "just-show"
      }`}
    >
      <div className="upper">
        <img src="https://i.pravatar.cc/300" />
        <h5>Frimpong Opoku Agyemang</h5>
        <small>@Merchant, @Seller, @Driver</small>
      </div>
      <div className="mid">
        {MENU.map((menu, index) => {
          const signOutClick =
            menu.key === "logout"
              ? {
                  onClick: () => {
                    menu.onClick();
                    signOutOfRedux();
                  },
                }
              : {};
          return (
            <div key={index?.toString()}>
              <SideMenuItem
                {...menu}
                label={menu.name}
                icon={menu.icon}
                locked={!user && menu.locked}
                active={params.page === menu.key}
                {...signOutClick}
              />
            </div>
          );
        })}
      </div>
      <div className="lower"></div>
    </div>
  );
}

const SideMenuItem = ({
  icon = faHome,
  label = "Home",
  className,
  locked,
  onClick,
  url,
  active,
  construction,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`side-menu-item ${className || ""} ${
        active && "side-menu-active"
      }`}
      onClick={() => {
        if (url) return navigate(url);
        if (onClick) onClick();
      }}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{label}</p>
      <div
        style={{ marginLeft: "auto", display: "flex", flexDirection: "row" }}
      >
        {locked && (
          <span>
            <FontAwesomeIcon
              icon={faLock}
              style={{ color: "var(--app-color-grey)" }}
            />
          </span>
        )}
        {construction && (
          <span style={{ marginLeft: 6 }}>
            <FontAwesomeIcon
              icon={faHammer}
              style={{ color: "var(--app-color-grey)" }}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
