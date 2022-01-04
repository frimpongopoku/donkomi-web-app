import React from "react";
import PageWrapper from "../wrapper/PageWrapper";
import ImageThumbnail from "./../../components/thumbnail/ImageThumbnail";
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
      </div>
    </PageWrapper>
  );
}

export default UserProfile;
