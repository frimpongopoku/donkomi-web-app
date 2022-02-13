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
import Notification from "../../components/form generator/notification/Notification";
import { CHECKOUT_PRODUCTS } from "../../api/urls";

function Cart({ cart, addToCart, explorer }) {
  const [showCheckoutConfirmation, setConfirmCheckout] = useState(false);
  const [notification, setNotification] = useState({});
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

  const makeReadyForBackend = (shop) => {
    if (!shop) return {};
    const togo = {};
    shop.forEach((item) => {
      const { product, qty } = item;
      const { creator, price, shops } = product;
      const shop = (shops && shops[0]) || {};
      const list = togo[creator.user_id] || [];
      const obj = {
        product_id: product?.id,
        qty,
        total_price: (Number(price).toFixed(2) * qty).toFixed(2),
        shop: shop?.id,
      };
      list.push(obj);
      togo[creator.user_id] = list
    });
    return togo
  };
  const sendCartItemsToBackend = () => {
    const basket = makeReadyForBackend(cart.shop);
    console.log(" LE BASKET KORKO", basket)
    return;
    setNotification({});
    explorer
      .send(CHECKOUT_PRODUCTS, "POST", { order_type: "PRODUCT_ORDER" })
      .then((response) => {
        if (!response.success)
          return setNotification({ message: response?.error?.message });
      })
      .catch((e) => {
        console.log("CHECKOUT_ERROR", e?.toString());
        return setNotification({ message: e?.toString() });
      });
  };
  return (
    <>
      {showCheckoutConfirmation && (
        <DialogBox
          close={() => setConfirmCheckout(false)}
          onCancel={() => setConfirmCheckout(false)}
          onConfirm={sendCartItemsToBackend}
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

          {notification?.message && (
            <Notification message={notification?.message} type="bad" />
          )}
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
    explorer: state.explorer,
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
