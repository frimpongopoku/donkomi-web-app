import {
  faCaretRight,
  faHammer,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import PageWrapper from "../wrapper/PageWrapper";
import ImageThumbnail from "./../../components/thumbnail/ImageThumbnail";
import { CONTROLS, TOGGLES } from "./profile-values";
import "./UserProfile.css";
import ImageSelector from "./../../components/form generator/file picker/ImageSelector";
import FlatButton from "../../components/flat button/FlatButton";
import Loader from "../../components/cover loader/Loader";
import Notification from "../../components/form generator/notification/Notification";
import { UPDATE_USER_PROFILE } from "../../api/urls";
import FirebaseImageUploader from "../../shared/classes/ImageUploader";
import { reduxSetDonkomiAuth } from "../../redux/actions/actions";
function UserProfile({ user, explorer, setUserInRedux }) {
  const [userImage, setUserImage] = useState(null);
  const [changeImage, setChangeImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectNewImage = (e) => {};

  const goto = useNavigate();
  const pcUserImageBtnStyles = {
    flex: 1,
    background: "green",
    color: "white",
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
  };

  const updateUserInBackend = (data) => {
    explorer
      .send(UPDATE_USER_PROFILE, "POST", data)
      .then((response) => {
        setLoading(false);
        if (!response.success)
          return setError({ message: response.error.message });
        setUserInRedux(response.data);
        setChangeImage(false);
      })
      .catch((e) => {
        setLoading(false);
        setError({ message: e?.toString() });
        console.log("PROFILE_UPLOAD_ERROR:", e?.toString());
      });
  };

  const updateProfile = () => {
    const oldPicture = user?.profilePicture;
    setLoading(true);
    setError(null);
    FirebaseImageUploader.uploadProfilePhoto(
      userImage,
      (url) => {
        if (oldPicture)
          FirebaseImageUploader.deleteImageFromStorage(oldPicture);
        updateUserInBackend({
          user_id: user?.user_id,
          data: { profilePicture: url },
        });
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
  };

  const onNewImageSelected = (data, reset) => {
    setUserImage(data?.file);
  };
  return (
    <PageWrapper>
      <div className="profile-container">
        {!changeImage && (
          <div className="user-details-div">
            <div>
              <ImageThumbnail
                src={user?.profilePicture}
                className="profile-img"
              />
              <div className="phone-vanish">
                <div
                  className=" flex"
                  style={{ flexDirection: "row", flex: "2" }}
                >
                  <small
                    className="touchable-opacity"
                    style={{ ...pcUserImageBtnStyles }}
                    onClick={() => setChangeImage(true)}
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
                <small
                  style={{ color: "maroon" }}
                  className="touchable-opacity"
                  onClick={() => setChangeImage(true)}
                >
                  Change
                </small>
                <small className="touchable-opacity" style={{ color: "green" }}>
                  Remove
                </small>
              </div>
              <p className="profile-roles">@Delivery Guy, @Customer, @Seller</p>
            </div>
          </div>
        )}
        {changeImage && (
          <div>
            <p
              style={{
                fontWeight: "bold",
                color: "var(--app-color-darker)",
                margin: "15px 0px",
              }}
            >
              Select an image from your device
            </p>
            {error && <Notification type="bad" message={error?.message} />}
            <ImageSelector
              allowCrop
              onFileSelected={onNewImageSelected}
              forceCrop
              circleCrop
              maxHeight={150}
              maxWidth={150}
              ratioWidth={1}
              ratioHeight={1}
              previewStyle={{ borderRadius: "100%" }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "15px 0px",
              }}
            >
              <FlatButton
                style={{ flex: "1", background: "var(--app-color-darkest)" }}
                disabled={loading}
                onClick={() => setChangeImage(true)}
              >
                Cancel
              </FlatButton>
              <FlatButton
                onClick={() => updateProfile()}
                loading={loading}
                style={{ flex: "1" }}
                disabled={loading}
              >
                {loading ? "Changing Picture" : " Change Picture"}
              </FlatButton>
            </div>
          </div>
        )}
        <div className="controls-container">
          {CONTROLS.map((c, index) => {
            return (
              <div
                onClick={() => c?.url && goto("update-my-profile")}
                key={index.toString()}
                className="one-control-option flex touchable-opacity"
              >
                <FontAwesomeIcon
                  icon={c?.icon}
                  style={{ marginRight: 20, color: "var(--app-color)" }}
                />
                <p>
                  {c?.name}{" "}
                  {c.underConstruction && (
                    <FontAwesomeIcon
                      icon={faHammer}
                      style={{
                        color: "var(--app-color-grey)",
                        marginLeft: 10,
                      }}
                    />
                  )}{" "}
                </p>
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

const mapStateToProps = (state) => ({
  explorer: state.explorer,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setUserInRedux: reduxSetDonkomiAuth }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
