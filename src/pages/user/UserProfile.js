import { faCaretRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PageWrapper from "../wrapper/PageWrapper";
import ImageThumbnail from "./../../components/thumbnail/ImageThumbnail";
import { CONTROLS } from "./profile-values";
import "./UserProfile.css";
function UserProfile() {
  return (
    <PageWrapper>
      <div className="profile-container">
        <ImageThumbnail className="profile-img" />
        <h3>Frimpong Opoku Agyemang</h3>
        <div className="profile-small">
          <small style={{ color: "maroon" }} className="touchable-opacity">
            Change
          </small>{" "}
          <small className="touchable-opacity" style={{ color: "green" }}>
            Remove
          </small>
        </div>
        <p className="profile-roles">@Delivery Guy, @Customer, @Seller</p>
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
          <div className="toggles-content">
            
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default UserProfile;
