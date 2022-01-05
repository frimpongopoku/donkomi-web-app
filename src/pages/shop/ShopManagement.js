import React from "react";
import PageTitle from "../../components/page title/PageTitle";
import PageWrapper from "../wrapper/PageWrapper";
import TabView from "./../../components/TabView/TabView";
import "./ShopManagement.css";
function ShopManagement() {
  return (
    <PageWrapper>
      <div className="shop-management-container">
        <PageTitle
          title="Manage your shop"
          subtitle="All your shops and shop items are here. Move things around and make changes here!"
        />
      </div>
      <div className="management-content-area">
        <TabView />
      </div>
    </PageWrapper>
  );
}

export default ShopManagement;
