import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DialogBox from "../../components/dialog/DialogBox";
import PageTitle from "../../components/page title/PageTitle";
import OrderFullView from "../order/OrderFullView";
import SellerOrders from "../order/SellerOrders";
import PageWrapper from "../wrapper/PageWrapper";
import TabView from "./../../components/TabView/TabView";
import "./ShopManagement.css";
import SeeAllShopItems from "./views/SeeAllShopItems";
import SeeAllShops from "./views/SeeAllShops";

// const dummyShops = makeShops();
function ShopManagement() {
  const pageParams = useParams();
  const [itemToView, setShowFullView] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteProps, setDeleteProps] = useState({});
  // const [activeShop, setActiveShop] = useState(null);

  
  const confirmDelete = (del, delProps) => {
    setDeleteConfirmation(del);
    setDeleteProps(delProps);
  };

  const doDelete = (id, arr, reduxFxn) => {
    const rest = arr?.filter((item) => item?.id !== id);
    reduxFxn(rest);
    setDeleteConfirmation(false);
  };
  const TABS = [
    {
      name: "Shops",
      id: "shop-listing",
      component: (
        <SeeAllShops confirmDelete={confirmDelete} doDelete={doDelete} />
      ),
    },
    {
      name: "Products",
      id: "item-listing",
      component: (
        <SeeAllShopItems confirmDelete={confirmDelete} doDelete={doDelete} />
      ),
    },
    {
      name: "Orders",
      id: "seller-order",
      component: <SellerOrders showFullView={setShowFullView} />,
    },
  ];

  return (
    <>
      {deleteConfirmation && (
        <DialogBox
          onConfirm={deleteProps?.onConfirm}
          onCancel={() => {
            setDeleteConfirmation(false);
            const cancel = deleteProps?.onCancel;
            cancel && cancel();
          }}
        >
          {deleteProps?.children}
        </DialogBox>
      )}
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
              data={itemToView}
            />
          </div>
        )}
      </PageWrapper>
    </>
  );
}

export default ShopManagement;
