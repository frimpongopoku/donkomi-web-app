import React from "react";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer, faHome, faLock } from "@fortawesome/free-solid-svg-icons";
import { MENU } from "./values";
import { useNavigate, useParams } from "react-router-dom";
import ImageThumbnail from "../thumbnail/ImageThumbnail";
import createImageFromInitials from "../../shared/js/utils";

function Sidebar(props) {
  const { animate, updateFireState, updateUserState, user } = props;
  const params = useParams();
  const goto = useNavigate();
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
      <div
        className="upper"
        style={{ filter: `blur(${user ? "0px" : "5px"})` }}
      >
        <ImageThumbnail
          src={
            user?.profilePicture ||
            createImageFromInitials("red", user?.preferred_name, 2800)
          }
        />

        <h5>{user?.preferred_name || "..."}</h5>
        <small>@Customer @Seller</small>
      </div>
      <div className="mid">
        {MENU.map((menu, index) => {
          const isLogout = menu.key === "logout";
          const signOutClick = isLogout
            ? {
                onClick: () => {
                  menu.onClick();
                  if (user) signOutOfRedux();
                  else goto("/login");
                },
              }
            : {};
          return (
            <div key={index?.toString()}>
              <SideMenuItem
                {...menu}
                label={isLogout ? (user ? "Logout" : "Sign In") : menu.name}
                icon={menu.icon}
                locked={!user && menu.locked}
                active={params.page === menu.key}
                {...signOutClick}
                goto={goto}
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
  goto,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`side-menu-item ${className || ""} ${
        active && "side-menu-active"
      }`}
      onClick={() => {
        if (locked) return goto("/login");
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
