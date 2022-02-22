import React from "react";
import TabView from "../../components/TabView/TabView";
import OrdersForShop from "./OrdersForShop";
import SellerOrderHistory from "./SellerOrderHistory";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function SellerOrders({ showFullView, ordersForShop, ordersCompleted }) {
  const TABS = [
    {
      name: "Orders for you",
      id: "orders-for-your",
      component: (
        <OrdersForShop showFullView={showFullView} orders={ordersForShop} />
      ),
    },
    {
      name: "History",
      id: "order-history",
      component: (
        <SellerOrderHistory
          showFullView={showFullView}
          ordersCompleted={ordersCompleted}
        />
      ),
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

const mapStateToProps = (state) => ({
  ordersForShop: state.sellerOrders,
  ordersCompleted: state.sellerOrdersCompleted,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerOrders);
