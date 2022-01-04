import { faCaretRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PageWrapper from "../wrapper/PageWrapper";
import ImageThumbnail from "./../../components/thumbnail/ImageThumbnail";
import { CONTROLS, TOGGLES } from "./profile-values";
import "./UserProfile.css";

function UserProfile() {
  const pcUserImageBtnStyles = {
    flex: 1,
    background: "green",
    color: "white",
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
  };
  return (
    <PageWrapper>
      <div className="profile-container">
        <div className="user-details-div">
          <div>
            <ImageThumbnail className="profile-img" />
            <div className="phone-vanish">
              <div
                className=" flex"
                style={{ flexDirection: "row", flex: "2" }}
              >
                <small
                  className="touchable-opacity"
                  style={{ ...pcUserImageBtnStyles }}
                >
                  Change
                </small>
                <small
                  className="touchable-opacity"
                  style={{ ...pcUserImageBtnStyles, background: "maroon" }}
                >
                  Remove
                </small>
              </div>
            </div>
          </div>
          <div className="user-info-box">
            <h3 className="user-name">Frimpong Opoku Agyemang</h3>
            <div className="profile-small pc-vanish">
              <small style={{ color: "maroon" }} className="touchable-opacity">
                Change
              </small>
              <small className="touchable-opacity" style={{ color: "green" }}>
                Remove
              </small>
            </div>
            <p className="profile-roles">@Delivery Guy, @Customer, @Seller</p>
          </div>
        </div>
        <div className="controls-container">
          {CONTROLS.map((c, index) => {
            return (
              <div
                key={index.toString()}
                className="one-control-option flex touchable-opacity"
              >
                <FontAwesomeIcon
                  icon={c?.icon}
                  style={{ marginRight: 20, color: "var(--app-color)" }}
                />
                <p>{c?.name}</p>
                <span style={{ marginLeft: "auto" }}>
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    style={{ color: "var(--app-color-grey)" }}
                  />
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ width: "100%" }} className="setting-toggles">
          <h3>Notification Settings</h3>
          <div className="toggle-content">
            {TOGGLES.map((t) => {
              return (
                <div className="toggler" key={t.key}>
                  <div className="flex" style={{ flexDirection: "row" }}>
                    <p className="t-title">{t.title}</p>
                    <span style={{ marginLeft: "auto" }}>
                      <input type="Checkbox" />
                    </span>
                  </div>
                  <p className="t-desc">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default UserProfile;
