import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
import {
  faEnvelope,
  faHeart,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function Home() {
  const goto = useNavigate();
  return (
    <div className="home-container">
      <div className="top-half">
        <h1>DONKOMI</h1>
      </div>
      <div className="bottom-half">
        <h3>
          Welcome! <br /> We probably need a better intro but hey; <br />
          buy, sell, order a taxi, become a merchant etc. Lots of stuff, just
          check it out!
        </h3>
        <center>
          <br />
          <a
            onClick={(e) => {
              e.preventDefault();
              goto("/browse/market-place");
            }}
            href="#void"
            className="touchable-opacity"
            style={{
              background: "var(--app-color-darkest)",
              color: "white",
              padding: "10px 20px",
              borderRadius: 55,
              textDecoration: "none",
            }}
          >
            Take Me There Now!{" "}
            <span style={{ marginLeft: 6 }}>
              <FontAwesomeIcon icon={faLongArrowAltRight} />
            </span>
          </a>
          <br />
          <br />
          <a
            href="mailto:donkomisales@gmail.com"
            target="_blank"
            style={{ color: "var(--app-color-darkest)" }}
          >
            <span style={{ marginRight: 3 }}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            Have any intro suggestions? <br />
            Please send here!
          </a>
          <br />
          <br />
          <a
            href="mailto:mrfimpong@gmail.com"
            target="_blank"
            style={{ color: "var(--app-color-darkest)" }}
          >
            <span style={{ marginRight: 3 }}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            Would you like to contribute to this project? <br />
            Show you are interested via this email
          </a>

          <br />
          <br />
          <br />
          <br />
          <small style={{ color: "var(--app-color-darkest)" }}>
            <b>
              Made with <FontAwesomeIcon icon={faHeart} color="red" /> by
              {` <ThatGuyInTheMaroonHoody />`}
            </b>
          </small>
        </center>
      </div>
    </div>
  );
}

export default Home;
