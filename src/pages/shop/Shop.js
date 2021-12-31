import React from "react";
import Toolbar from "../../components/toolbar/Toolbar";
import PageWrapper from "../wrapper/PageWrapper";
import "./Shop.css";
export default function Shop() {
  return (
    <PageWrapper>
      <div className="shop-page-container">
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
      </div>
    </PageWrapper>
  );
}

const ShopItem = () => {
  return (
    <div className="shop-item">
      <div>
        <small>This is a shop item bro</small>
      </div>
      <div className="shop-item-details">
        <small>Here it is and so what</small>
      </div>
    </div>
  );
};
