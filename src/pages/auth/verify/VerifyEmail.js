import { sendEmailVerification } from "firebase/auth";
import React from "react";

export default function VerifyEmail({ fireAuth }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "antiquewhite",
      }}
    >
      <center
        style={{
          background: "white",
          padding: 20,
          margin: 10,
          borderRadius: 4,
        }}
        className="elevate-float"
      >
        <h2>Almost there</h2>
        <h3 style={{ fontWeight: "300" }}>
          Please verify that
          <b style={{ color: "var(--app-color)" }}> {fireAuth?.email}</b> is
          your email.
          <br /> Use the link we have sent you.
        </h3>

        <small
          onClick={() => sendEmailVerification(fireAuth)}
          style={{ textDecoration: "underline", color: "green" }}
          className="touchable-opacity"
        >
          Send Verification Email Again
        </small>
        <br />
        <br />
        <small
          onClick={() => window.location.reload()}
          style={{ textDecoration: "underline", color: "green" }}
          className="touchable-opacity"
        >
          When you verify, you can use this to refresh
        </small>
      </center>
    </div>
  );
}
