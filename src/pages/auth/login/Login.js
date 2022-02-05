import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Notification from "../../../components/form generator/notification/Notification";
import { loginWithEmailAndPassword } from "../../../firebase/config";
import {
  reduxSetDonkomiAuth,
  reduxSetFirebaseAUth,
} from "../../../redux/actions/actions";
import AuthLoader from "../AuthLoader";
import "./../auth.css";
function Login({ putFirebaseAuthInRedux, putUserInRedux }) {
  const goto = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const authenticate = () => {
    setLoading(false);
    if (!email || !password)
      return makeNotification(
        "Please provide both your email, and your password!"
      );
    setLoading(true);
    loginWithEmailAndPassword({ email, password }, (auth, error) => {
      if (error) {
        makeNotification(error, false);
        setLoading(false);
        return;
      }
      putFirebaseAuthInRedux(auth);
      goto("/browse/market-place");
      setLoading(false);
    });
  };

  const makeNotification = (message, good) => {
    setNotification({ type: good ? "good" : "bad", msg: message });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>DONKOMI</h2>
        <p>Who are you please? Remind Us...</p>
        <center style={{ marginBottom: 10 }}>
          <small
            className="touchable-opacity"
            onClick={() => goto(-1)}
            style={{ color: "green", marginLeft: 24 }}
          >
            Take me where I came from ( Go Back)
          </small>
        </center>
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
              onChange={(e) => setPassword(e.target.value)}
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

          {loading && <AuthLoader />}
        </div>
        {notification?.msg && (
          <div style={{ padding: 15, width: "100%" }}>
            <Notification
              {...notification}
              close={() => setNotification(null)}
            />
          </div>
        )}
        <div className="auth-bottom-div">
          <div
            onClick={() => !loading && authenticate()}
            className="flat-btn touchable-opacity"
            style={{ background: "green", color: "white", marginBottom: 0 }}
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
