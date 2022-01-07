import React from "react";
import PageTitle from "../../components/page title/PageTitle";
import OrderFullView from "../order/OrderFullView";
import SellerOrders from "../order/SellerOrders";
import PageWrapper from "../wrapper/PageWrapper";
import TabView from "./../../components/TabView/TabView";
import "./ShopManagement.css";
import SeeAllShopItems from "./views/SeeAllShopItems";
import SeeAllShops from "./views/SeeAllShops";
function ShopManagement() {
  const TABS = [
    {
      name: "Shops",
      id: "shop-listing",
      component: <SeeAllShops />,
    },
    {
      name: "Products",
      id: "item-listing",
      component: <SeeAllShopItems />,
    },
    {
      name: "Orders",
      id: "seller-order",
      component: <SellerOrders />,
    },
  ];

  return (
    <PageWrapper>
      <div className="shop-management-container">
        <PageTitle
          title="Manage your shops"
          subtitle="All your shops and shop items are here. Move things around and make changes here!"
        />
      </div>
      <OrderFullView />
      <div className="management-content-area">
        <TabView data={TABS} />
      </div>
    </PageWrapper>
  );
}

export default ShopManagement;
