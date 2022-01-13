import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../auth.css";
function Login() {
  const goto = useNavigate();
  return (
    <div className="auth-container">
      <h2>DONKOMI</h2>
      <p>Who are you please? Remind me...</p>
      <div className="auth-content-box">
        <div>
          <small>
            Do you remember the email you signed up with? Type that!
          </small>
          <input
            className="auth-textbox"
            placeholder="Enter your email"
            name="email"
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
          />
        </div>
        <br />

        <p
          style={{ color: "green", marginBottom: 6 }}
          className="touchable-opacity"
          onClick={() => goto("/register")}
        >
          <FontAwesomeIcon icon={faPenAlt} /> <i>I want to register instead</i>
        </p>
        <Link to="/reset-password" style={{ color: "green", marginLeft: 24 }}>
          <i>Reset Password</i>
        </Link>
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
  );
}

export default Login;
