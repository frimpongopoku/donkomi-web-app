import React from "react";
import "./../ShopManagement.css";
import { ShopCard } from "./SeeAllShops";
import Dropdown from "./../../../components/form generator/dropdown/Dropdown";
import NotFound from "../../../components/not found/NotFound";

function SeeAllShopItems() {
  return (
    <div className="all-shop-items-container">
      <p>
        Use the dropdown to go through your shops. The items in your chosen shop
        will be shown below
      </p>
      <div className="drop-area">
        <Dropdown type="full" placeholder="Choose a shop to view items" />
      </div>
      <div style={{ marginTop: 20 }}>
        {[1, 2, 3, 4, 5].map((s, i) => {
          return (
            <React.Fragment key={i?.toString()}>
              <ShopCard>
                <h5 style={{ color: "var(--app-color)" }}>Rs 500</h5>
              </ShopCard>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default SeeAllShopItems;
