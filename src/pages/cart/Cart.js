import React, { useState } from "react";
import PageTitle from "../../components/page title/PageTitle";
import OrderHistory from "../order/OrderHistory";
import PageWrapper from "../wrapper/PageWrapper";
import Basket from "./Basket";
import "./Cart.css";

import TabView from "./../../components/TabView/TabView";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxAddToShoppingBasket } from "../../redux/actions/actions";
import { add, makeCartSummary, remove } from "../../shared/js/utils";
import DialogBox from "../../components/dialog/DialogBox";

function Cart({ cart, addToCart }) {
  const [showCheckoutConfirmation, setConfirmCheckout] = useState(false);
  const basket = cart?.shop || [];
  const { totalPrice } = makeCartSummary(basket);
  const TABS = [
    {
      name: "Cart",
      id: "cart",
      component: (
        <Basket
          add={(product) => add(product, cart, addToCart)}
          remove={(itemId) => remove(itemId, true, cart, addToCart)}
          reduce={(itemId) => remove(itemId, false, cart, addToCart)}
          basket={basket}
          confirmCheckout={() => setConfirmCheckout(true)}
        />
      ),
    },
    {
      name: "Order History",
      id: "order-history",
      component: <OrderHistory />,
    },
  ];

  return (
    <>
      {showCheckoutConfirmation && (
        <DialogBox
          close={() => setConfirmCheckout(false)}
          onCancel={() => setConfirmCheckout(false)}
          okText="Yes, Continue Checkout"
        >
          <div
            style={{
              padding: 15,
              textAlign: "center",
            }}
          >
            Are you sure you want to submit this order?
            <br /> You would have to pay{" "}
            <span style={{ color: "green" }}>
              <b> Rs {Number(totalPrice)}</b>
            </span>{" "}
            when you receive your items
          </div>
        </DialogBox>
      )}
      <PageWrapper>
        <div className="cart-container">
          <PageTitle
            title="Your Cart"
            subtitle="All the items you have selected from the shops will be shown here"
          />
          <div style={{ marginTop: 15 }}>
            <TabView data={TABS} />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addToCart: reduxAddToShoppingBasket,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
