import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import AuthLoader from "../AuthLoader";
import "./../auth.css";
function Register() {
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
      name: "password",
      placeholder: "Enter password",
      label:
        "This isnt mean't to be bae's name. Enter a secure code only you will remember!",
    },
    {
      type: "input",
      name: "password",
      placeholder: "Confirm Password",
      label: "Enter the password again, just in case!",
      contentType: "password",
    },
    {
      type: "input",
      name: "password",
      placeholder: "Confirm password",
      label:
        "This isnt mean't to be bae's name. Enter a secure code only you will remember!",
      contentType: "password",
    },
  ];
  return (
    <div className="auth-container">
      <h2>DONKOMI</h2>
      <p>
        It just takes a minute! Pro the following, and get started right away!
      </p>
      <div className="auth-content-box">
        {fields.map((field, i) => {
          return (
            <div>
              <small>{field.label}</small>
              <input
                className="auth-textbox"
                placeholder={field.placeholder}
                name={field.name}
                type={field.contentType || "text"}
                {...(field.max ? { maxLength: field.max } : {})}
              />
              <br />
            </div>
          );
        })}

        <AuthLoader />
      </div>

      <div className="auth-bottom-div">
        <div
          className="flat-btn touchable-opacity"
          style={{ background: "green", color: "white" }}
        >
          Done, Sign Me Up!
        </div>
        {/* <div className="flat-btn">Use Google Instead</div> */}
      </div>
    </div>
  );
}

export default Register;
