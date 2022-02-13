import React from "react";
import NotFound from "../../components/not found/NotFound";
import { getDetailsFromProductOrders } from "../../shared/js/utils";
import "./order.css";
import OrderItem from "./OrderItem";
function OrderHistory({ orders }) {
  return (
    <div className="order-history-container" style={{ marginTop: 15 }}>
      <p style={{ marginBottom: 15 }}>
        Here is a list of all the orders you have made since the beginning of
        time...{" "}
      </p>
      <div>
        {orders?.map((order, i) => {
          const { shopString, quantity, totalPrice } =
            getDetailsFromProductOrders(order.product_orders);
          return (
            <React.Fragment key={i.toString()}>
              <OrderItem
                {...order}
                shopString={shopString}
                totalPrice={totalPrice}
                quantity={quantity}
              />
            </React.Fragment>
          );
        })}
      </div>

      {!orders?.length && (
        <NotFound label="Want to see what happens here? Order something..." />
      )}
    </div>
  );
}

export default OrderHistory;
