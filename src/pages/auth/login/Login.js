import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Notification from "../../../components/form generator/notification/Notification";
import {
  reduxSetDonkomiAuth,
  reduxSetFirebaseAUth,
} from "../../../redux/actions/actions";
import "./../auth.css";
function Login({ putFirebaseAuthInRedux, putUserInRedux }) {
  const goto = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const authenticate = () => {};

  const makeNotification = (message, good) => {
    setNotification({ type: good ? "good" : "bad", msg: message });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>DONKOMI</h2>
        <p>Who are you please? Remind Us...</p> <br />
        <div className="auth-content-box">
          <div>
            <small>
              Do you remember the email you signed up with? Type that!
            </small>
            <input
              className="auth-textbox"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div>
            <small>Type the password you signed up with</small>
            <input
              className="auth-textbox"
              placeholder="Enter your password"
              type="password"
              name="password"
              onCHange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />

          <p
            style={{ color: "green", marginBottom: 6 }}
            className="touchable-opacity"
            onClick={() => goto("/register")}
          >
            <FontAwesomeIcon icon={faPenAlt} /> I have not been here before, I
            need an account
          </p>
          <Link to="/reset-password" style={{ color: "green", marginLeft: 24 }}>
            Reset Password
          </Link>
        </div>
        <div style={{ padding: 15, width: "100%" }}>
          <Notification />
        </div>
        <div className="auth-bottom-div">
          <div
            className="flat-btn touchable-opacity"
            style={{ background: "green", color: "white" }}
          >
            Let Me In
          </div>
          {/* <div className="flat-btn">Use Google Instead</div> */}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      putFirebaseAuthInRedux: reduxSetFirebaseAUth,
      putUserInRedux: reduxSetDonkomiAuth,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Login);
