import React from "react";
import PageTitle from "../../components/page title/PageTitle";
import OrderHistory from "../order/OrderHistory";
import PageWrapper from "../wrapper/PageWrapper";
import Basket from "./Basket";
import "./Cart.css";

import TabView from "./../../components/TabView/TabView";
function Cart() {
  const TABS = [
    { name: "Cart", id: "cart", component: <Basket /> },
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

export default Cart;
