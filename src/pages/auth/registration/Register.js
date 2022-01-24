import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FlatButton from "../../../components/flat button/FlatButton";
import Notification from "../../../components/form generator/notification/Notification";
import AuthLoader from "../AuthLoader";
import "./../auth.css";
function Register() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const makeError = (key, error) => {
    setErrors({ ...errors, [key]: error, empty: false });
  };
  const formHasRightValues = () => {
    const items = Object.entries(form);
    if (!items?.length) {
      setNotification({
        type: "bad",
        msg: "Please fill out the form, thanks.",
      });
    }
    console.log("I amt h eitems'< ", items);
    items.forEach(([key, value]) => {
      if (!value) {
        makeError(key, `You did not provide '${key}'`);
        console.log("NONSENSE", key);
        return false;
       
      }

      if (key === "password" && value.length < 6) {
        makeError(key, "Your password is too weak, at least use 6 characters!");
        return false;
      }
      if (key === "password" && value !== form["confirm_password"]) {
        makeError(
          key,
          "Do you now see why you were asked to confirm? Your passwords do not match please try again..."
        );
        return false;
      }
    });
    return true;
  };

  const submitForm = () => {
    setLoading(true);
    setErrors({ empty: true });
    if (!formHasRightValues()) {
      setLoading(false);
      return false;
    }
    console.log("NOW YOU FILLED THE FORM QUITE NICELY, WELL DONE");
    setLoading(false);
  };
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
        "This isnt mean't to be bae's name. Enter a secure code only you will remember!",
      contentType: "password",
    },
    {
      type: "input",
      name: "password",
      placeholder: "Confirm Password",
      label: "Enter the password again, just in case!",
      contentType: "password",
    },
  ];

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
                {!errors?.empty && (
                  <small style={{ color: "maroon" }}>
                    {errors[field.name]}
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
            <i>Already have an account, I want to login instead</i>
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
            style={{ background: "green", color: "white" }}
          >
            Done, Sign Me Up!
          </div>
          {/* <div className="flat-btn">Use Google Instead</div> */}
        </div>
      </div>
    </div>
  );
}

export default Register;
