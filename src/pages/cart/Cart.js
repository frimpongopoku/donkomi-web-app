import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PageTitle from "../../components/page title/PageTitle";
import OrderHistory from "../order/OrderHistory";
import PageWrapper from "../wrapper/PageWrapper";
import Basket from "./Basket";
import "./Cart.css";
import ItemFrame from "./item frame/ItemFrame";

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
        <TabView data={TABS} />
      </div>
    </PageWrapper>
  );
}

export default Cart;
