import React from "react";
import { getDetailsFromProductOrders } from "../../shared/js/utils";
import OrderItem from "./OrderItem";
function SellerOrderHistory({ ordersCompleted, showFullView }) {
  return (
    <div>
      <p style={{ marginTop: 20, marginBottom: 20 }}>
        Here, you can go back in time and look for an old order. Just in case
        you need any form of clarification
      </p>

      <div>
        {ordersCompleted.map((order, i) => {
          const { totalPrice, quantity, shopString } =
            getDetailsFromProductOrders(order.product_orders);
          return (
            <React.Fragment key={i.toString()}>
              <OrderItem
                onClick={() =>
                  showFullView({ ...order, totalPrice, quantity, shopString })
                }
                {...order}
                {...{ totalPrice, quantity, shopString }}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default SellerOrderHistory;
