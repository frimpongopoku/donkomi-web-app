import React from "react";
import TabView from "../../components/TabView/TabView";
import OrdersForShop from "./OrdersForShop";
import SellerOrderHistory from "./SellerOrderHistory";

function SellerOrders() {
  const TABS = [
    {
      name: "Orders for you",
      id: "orders-for-your",
      component: <OrdersForShop />,
    },
    {
      name: "History",
      id: "order-history",
      component: <SellerOrderHistory />,
    },
  ];
  return (
    <div>
      <TabView
        data={TABS}
        headerRender={(item, isSelected, onClick) => (
          <div
            onClick={() => onClick()}
            className={`sec-tab-item touchable-opacity ${
              isSelected && "sec-tab-selected"
            }`}
          >
            <p>{item?.name}</p>
          </div>
        )}
      />
    </div>
  );
}

export default SellerOrders;
