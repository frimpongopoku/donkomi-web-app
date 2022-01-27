import React, { useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../../../components/form generator/notification/Notification";
import AuthLoader from "../AuthLoader";
import "./../auth.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  reduxSetDonkomiAuth,
  reduxSetFirebaseAUth,
} from "../../../redux/actions/actions";
import {
  registerUserWithEmailAndPassword,
  signOut,
} from "../../../firebase/config";
import { sendEmailVerification } from "firebase/auth";

const EMPTY = { empty: true };
const fields = [
  {
    type: "input",
    name: "preferred_name",
    placeholder: "Enter preferred name",
    max: 20,
    label:
      "What do you want people to know you by? 'Nation Seller', 'apuskeleke Shop', 'Native Shlong' are all valid usernames. Get creative, be proffessional!  ",
  },
  {
    type: "input",
    name: "email",
    contentType: "email",
    label:
      "Preferrably one that belongs to you, and is very close to heart. We will keep it safe!",
    placeholder: "Enter you email",
  },
  {
    type: "input",
    name: "phone",
    placeholder: "Enter phone number",
    label: "Enter a working phone number",
    max: 12,
  },
  {
    type: "input",
    name: "password",
    placeholder: "Enter password",
    label:
      "We want to make sure no one orders food on your behalf, so add a password.",
    contentType: "password",
  },
  {
    type: "input",
    name: "confirm_password",
    placeholder: "Confirm Password",
    label: "Enter the password again, just in case!",
    contentType: "password",
  },
];
function Register({ putAuthInRedux, putUserInRedux }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});

  const makeError = (key, error, _err) => {
    return { ..._err, [key]: error, empty: false };
  };
  const makeNotification = (message, good) => {
    setNotification({ type: good ? "good" : "bad", msg: message });
  };

  const formHasRightValues = () => {
    setErrors(EMPTY);
    var err = {};
    var valid = true;
    fields.forEach((field) => {
      const key = field.name;
      const value = form[key];
      if (!value) {
        err = makeError(key, `You did not provide '${key}'`, err);
        valid = false;
      } else {
        if (key === "password" && value < 6) {
          err = makeError(
            key,
            "Your password is too weak, at least use 6 characters!",
            err
          );
          valid = false;
        } else if (key === "password" && value !== form["confirm_password"]) {
          err = makeError(
            key,
            "See why you were asked to confirm? Your passwords do not match please try again...",
            err
          );
          valid = false;
        }
      }
    });
    return [valid, err];
  };

  const submitForm = () => {
    setLoading(true);
    setErrors({ empty: true });
    setNotification(null);
    const [yes, err] = formHasRightValues();
    if (!yes) {
      setLoading(false);
      setErrors(err);
      return;
    }

    authenticate(form);
  };

  const authenticate = (data) => {
    registerUserWithEmailAndPassword(
      data,
      (authenticationInformation, error) => {
        if (error) makeNotification(error?.toString(), false);
        else {
          const fireUser = authenticationInformation?.user;
          putAuthInRedux(fireUser);
          sendEmailVerification(fireUser);
          setForm({});
        }
        setLoading(false);
      }
    );
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>DONKOMI</h2>
        <p>
          It just takes a minute! Provide the following, and get started right
          away!
        </p>
        <br />
        <div className="auth-content-box">
          {fields.map((field, i) => {
            return (
              <React.Fragment key={i?.toString()}>
                <small>{field.label}</small>
                <br />
                {!errors?.empty && (
                  <small
                    style={{ color: "maroon", marginLeft: 5, fontSize: 13 }}
                  >
                    <i>{errors[field.name]}</i>
                  </small>
                )}
                <input
                  className="auth-textbox"
                  placeholder={field.placeholder}
                  name={field.name}
                  type={field.contentType || "text"}
                  {...(field.max ? { maxLength: field.max } : {})}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.value })
                  }
                />
                <br />
              </React.Fragment>
            );
          })}

          <Link to="/login" style={{ color: "green" }}>
            <br />
            Already have an account, I want to login instead
          </Link>
          {loading && <AuthLoader />}
          <div style={{ padding: 10, width: "100%" }}>
            {notification?.msg && (
              <Notification
                {...notification}
                close={() => setNotification(null)}
              />
            )}
          </div>
        </div>
        <div className="auth-bottom-div" style={{ marginTop: 20 }}>
          <div
            onClick={() => submitForm()}
            className="flat-btn touchable-opacity"
            style={{ background: "green", color: "white", marginBottom: 0 }}
          >
            Done, Sign Me Up!
          </div>
          {/* <button onClick={() => signOut()}>Sign out bruh</button> */}
          {/* <div className="flat-btn">Use Google Instead</div> */}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      putAuthInRedux: reduxSetFirebaseAUth,
      putUserInRedux: reduxSetDonkomiAuth,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Register);
