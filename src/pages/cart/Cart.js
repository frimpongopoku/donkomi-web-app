import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PageTitle from "../../components/page title/PageTitle";
import PageWrapper from "../wrapper/PageWrapper";
import "./Cart.css";
import ItemFrame from "./item frame/ItemFrame";

function Cart() {
  return (
    <PageWrapper>
      <div className="cart-container">
        <PageTitle
          title="Your Cart"
          subtitle="All the items you have selected from the shops will be shown here"
        />
        <div className="flex cart-total" style={{ padding: "0px 20px" }}>
          <h2 style={{ marginLeft: "auto" }}>
            Total Amount : <span style={{ color: "green" }}>Rs 3893</span>
          </h2>
        </div>
        <div className="cart-content">
          {[1, 2, 3, 4, 5, 5].map((x, i) => {
            return (
              <React.Fragment key={i.toString()}>
                <CartItem />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Cart;

const CartItem = ({}) => {
  return (
    <ItemFrame
      right={
        <div className="right-wrap">
          <div className="flex my-frame-right" style={{ textAlign: "center" }}>
            <span>
              <FontAwesomeIcon
                className="touchable-opacity"
                icon={faMinus}
                style={{ color: "var(--app-color-darkest)" }}
              />
            </span>
            <span>
              {" "}
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "green" }}
                className="touchable-opacity"
              />
            </span>
          </div>
          <p
            style={{ color: "var(--app-color-darkest)", marginTop: 6 }}
            className="touchable-opacity"
          >
            <b> Remove</b>
          </p>
        </div>
      }
    >
      <div className="cart-item-container">
        <h3>Burger One</h3>
        <h5>
          Rs 4598 <span>X 4</span>
        </h5>
        <h6 style={{ color: "Green" }}>Pongos' lair</h6>
      </div>
    </ItemFrame>
  );
};
