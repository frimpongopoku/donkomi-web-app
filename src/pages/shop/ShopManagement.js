import React from "react";
import PageTitle from "../../components/page title/PageTitle";
import PageWrapper from "../wrapper/PageWrapper";
import TabView from "./../../components/TabView/TabView";
import "./ShopManagement.css";
import SeeAllShopItems from "./views/SeeAllShopItems";
import SeeAllShops from "./views/SeeAllShops";
function ShopManagement() {
  const TABS = [
    {
      name: "All Shops",
      id: "shop-listing",
      component: <SeeAllShops />,
    },
    {
      name: "All Shop Items",
      id: "item-listing",
      component: <SeeAllShopItems />,
    },
  ];
  return (
    <PageWrapper>
      <div className="shop-management-container">
        <PageTitle
          title="Manage your shop"
          subtitle="All your shops and shop items are here. Move things around and make changes here!"
        />
      </div>
      <div className="management-content-area">
        <TabView data={TABS} />
      </div>
    </PageWrapper>
  );
}

export default ShopManagement;
