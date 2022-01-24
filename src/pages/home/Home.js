import React, { useState } from "react";
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
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  return (
    <div>
      <div className="home-back-image"></div>
      <div className="home-floating-container"></div>
      <div className="home-content-div">
        <h1>DONKOMI</h1>
        <h3>Official ALC Market Place Online</h3>
        <div
          className="home-get-in-there touchable-opacity"
          onClick={() => goto("/browse/market-place")}
        >
          <span>Get In There Now!</span>
        </div>
      </div>

      {showJoinTeam && (
        <div className="join-info-board anime-come-up">
          <h5>
            By now we are sure you've already figured out 4 million ways our
            landing page could be better? <br />
            Join the team and come do it yourself.
          </h5>
          <a href="mailto:donkomisales@gmail.com" target="_blank">
            Send us an email here
          </a>
        </div>
      )}
      <div className="home-footer">
        <div style={{ padding: "0px 15px" }}>
          <small
            style={{
              fontSize: 11,
              fontWeight: "bold",
              color: "rgb(251 207 142 / 31%)",
            }}
          >
            Made with{" "}
            <FontAwesomeIcon icon={faHeart} style={{ marginRight: 4 }} />
            by {"<MaroonHoody />"}
          </small>
        </div>
        <div
          className="join-dev-team touchable-opacity"
          onClick={() => setShowJoinTeam(!showJoinTeam)}
        >
          <small>Join Dev Team?</small>
        </div>
      </div>
    </div>
  );
}

export default Home;

const PCHomePage = () => (
  <div
    style={{
      background: "var(--app-color-darker)",
      filter: "blur(10px)",
      height: "100vh",
      width: "100vw",
    }}
  ></div>
);

const MobileHomePage = () => <small>Another phone mode bro</small>;
