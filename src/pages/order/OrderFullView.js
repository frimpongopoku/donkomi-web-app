import {
  faCheckCircle,
  faHourglass,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CartItem, OrderViewItem } from "../cart/CartItem";
import "./OrderFullView.css";
function OrderFullView({ close, closeText, data }) {
  const {
    id,
    quantity,
    totalPrice,
    product_orders,
    seller,
    customer,
    completed,
    shop
  } = data || {};
  return (
    <div className="order-full-root slide-anime-right">
      <div>
        <div className="elevate-float order-full-phone-header ">
          <span
            onClick={() => close && close()}
            className="touchable-opacity"
            style={{
              padding: "15px",
              fontWeight: "bold",
              fontSize: 20,
              color: "var(--app-color-darker)",
            }}
          >
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
            <small style={{ marginLeft: 10 }}>{closeText || "Back"}</small>
          </span>
        </div>
        {/* ---------------------- NOW ORDER CONTENT --------------- */}
        <div className="order-full-container">
          <div className="head-stone">
            <div className="order-dets">
              <h3>Order Number #{id || "..."}</h3>
              <h2 style={{ color: "green" }}>Rs {totalPrice || "..."}</h2>
              <h5>
                {quantity === 1
                  ? " 1 Item Ordered"
                  : quantity + " Items Ordered"}
              </h5>
            </div>
            <div className="order-status">
              <center style={{ margin: "15px 0px" }}>
                <span style={{ fontSize: 20, color: "green" }}>
                  <FontAwesomeIcon
                    icon={completed ? faCheckCircle : faHourglass}
                  />
                </span>
                <br />
                <small style={{ color: "green", fontWeight: "bold" }}>
                  {completed ? "Completed" : "In Progress.."}
                </small>
              </center>
            </div>
          </div>
          <div className="order-content">
            <p className="subtitle">
              Here is a list of all the products you selected in this order
            </p>
            <div>
              {product_orders?.map((order, id) => {
                return (
                  <React.Fragment key={id.toString()}>
                    <OrderViewItem {...order} />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="caller-details">
            <p className="subtitle">
              You may contact the buyer/seller via the line provided
            </p>
            <div>
              <span>
                <span>Name: </span> Frimpong Opoku Agyemang
              </span>
            </div>
            <div>
              <span>
                <span>Phone Number: </span> +233 243 98 33 64
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderFullView;
