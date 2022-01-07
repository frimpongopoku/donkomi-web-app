import {
  faHourglass,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./OrderFullView.css";
function OrderFullView() {
  return (
    <div className="order-full-root">
      <div style={{ position: "relative" }}>
        <div
          className="elevate-float order-full-phone-header pc-vanish"
          style={{ width: "100%", padding: 15 }}
        >
          <span
            className="touchable-opacity"
            style={{
              padding: "15px",
              fontWeight: "bold",
              fontSize: 20,
              color: "var(--app-color-darker)",
            }}
          >
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
            <small style={{ marginLeft: 10 }}>Back</small>
          </span>
        </div>

        {/* ---------- NOW ORDER CONTENT --------------- */}
        <div className="order-full-container">
          <div className="head-stone">
            <div className="order-dets">
              <h3>Order Number #3445</h3>
              <h2 style={{ color: "green" }}>Rs 5345</h2>
              <h5>Your ordered (6) Items</h5>
            </div>
            <div className="order-status">
              <center>
                <span style={{ fontSize: 20, color: "green" }}>
                  <FontAwesomeIcon icon={faHourglass} />
                </span>
                <br />
                <small style={{ color: "green", fontWeight: "bold" }}>
                  In Progress
                </small>
              </center>
            </div>
          </div>
          <div className="order-content"></div>
          <div className="caller-details"></div>
        </div>
      </div>
    </div>
  );
}

export default OrderFullView;
