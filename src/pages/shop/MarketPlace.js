import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BottomNavigation from "../../components/bottom navigation/BottomNavigation";
import Toolbar from "../../components/toolbar/Toolbar";
import PageWrapper from "../wrapper/PageWrapper";
import ImageThumbnail from "../../components/thumbnail/ImageThumbnail";
import "./MarketPlace.css";
import ItemFullView from "./views/ItemFullView";
import PageTitle from "../../components/page title/PageTitle";
import { generateMarketContent } from "../../factory/make";
import DateHandler from "../../shared/classes/DateHandler";
const products = generateMarketContent();
export default function MarketPlace() {
  console.log("I am the producst", products);
  return (
    <PageWrapper>
      <PageTitle
        title="Market"
        subtitle="I am sure you know what happens in markets. Just a reminder, the experience  is way better when you have a lot of money!"
      />
      <Market products={products} />
      {/* <ItemFullView /> */}
    </PageWrapper>
  );
}

const Market = ({ products }) => {
  return (
    <div className="shop-page-container">
      {products?.map((prod, ind) => (
        <React.Fragment key={ind?.toString()}>
          <ShopItem {...prod} />
        </React.Fragment>
      ))}
    </div>
  );
};

const ShopItem = ({ name, price, created_at }) => {
  return (
    <div className="shop-item">
      <div style={{ position: "relative" }}>
        <div className="add-btn elevate-1">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <ImageThumbnail />
        {/* <small className="s-badge">3</small> */}
      </div>
      <div className="s-dets">
        <small className="price">Rs {Number(price)}</small>
        <br />
        <small className="name">{name}</small>
        <br />
        <small className="date">{DateHandler.makeTimeAgo(created_at)}</small>
      </div>
    </div>
  );
};
