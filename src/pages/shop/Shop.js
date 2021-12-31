import React from "react";
import Toolbar from "../../components/toolbar/Toolbar";
import PageWrapper from "../wrapper/PageWrapper";
import ImageThumbnail from "./../../components/thumbnail/ImageThumbnail";
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
        <ImageThumbnail />
      </div>
      <div className="s-dets">
        <small className="price">Rs 9500</small>
        <br />
        <small className="name">Big Mac Burger</small>
        <br />
        <small className="date">2nd July 2020</small>
      </div>
    </div>
  );
};
