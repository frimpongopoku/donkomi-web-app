import React from "react";
import PageTitle from "../../components/page title/PageTitle";
import OrderHistory from "../order/OrderHistory";
import PageWrapper from "../wrapper/PageWrapper";
import Basket from "./Basket";
import "./Cart.css";

import TabView from "./../../components/TabView/TabView";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxAddToShoppingBasket } from "../../redux/actions/actions";
import { add, remove } from "../../shared/js/utils";
function Cart({ cart, addToCart }) {
  const basket = cart?.shop || [];

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
