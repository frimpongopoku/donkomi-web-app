import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/page title/PageTitle";
import OrderFullView from "../order/OrderFullView";
import SellerOrders from "../order/SellerOrders";
import PageWrapper from "../wrapper/PageWrapper";
import TabView from "./../../components/TabView/TabView";
import "./ShopManagement.css";
import SeeAllShopItems from "./views/SeeAllShopItems";
import SeeAllShops from "./views/SeeAllShops";
function ShopManagement() {
  const pageParams = useParams();

  const [itemToView, setShowFullView] = useState(null);

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
      component: <SellerOrders showFullView={setShowFullView} />,
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

      <div className="management-content-area">
        <TabView data={TABS} defaultTab={pageParams.tab} />
      </div>
      {itemToView && (
        <div className="pc-vanish">
          <OrderFullView
            data={itemToView}
            close={() => setShowFullView(null)}
          />
        </div>
      )}
      {itemToView && (
        <div
          className="phone-vanish elevate-float"
          style={{
            position: "absolute",
            right: 0,
            top: 60,
            height: "100vh",
            width: 360,
            zIndex: 20,
            background: "white",
          }}
        >
          <OrderFullView
            close={() => setShowFullView(null)}
            closeText="Close This Panel"
          />
        </div>
      )}
    </PageWrapper>
  );
}

export default ShopManagement;
