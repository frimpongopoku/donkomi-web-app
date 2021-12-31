import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BottomNavigation from "../../components/bottom navigation/BottomNavigation";
import Toolbar from "../../components/toolbar/Toolbar";
import PageWrapper from "../wrapper/PageWrapper";
import ImageThumbnail from "./../../components/thumbnail/ImageThumbnail";
import "./Shop.css";
export default function Shop() {
  return (
    <PageWrapper>
      <div className="shop-page-container">
        {[1, 2, 3, 4, 5, 6, 5, 6, 7].map((itm, ind) => (
          <React.Fragment key={ind?.toString()}>
            <ShopItem />
          </React.Fragment>
        ))}
      </div>
      <BottomNavigation />
    </PageWrapper>
  );
}

const ShopItem = ({}) => {
  return (
    <div className="shop-item">
      <div style={{ position: "relative" }}>
        <div className="add-btn elevate-1">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <ImageThumbnail />
        <small className="s-badge">3</small>
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
