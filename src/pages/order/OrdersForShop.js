import React from "react";
import { getDetailsFromProductOrders } from "../../shared/js/utils";
import OrderItem from "./OrderItem";
function OrdersForShop({ showFullView, orders }) {
  return (
    <div>
      <p style={{ marginTop: 20, marginBottom: 20 }}>
        The earlier your customers recieve their orders, the better. Keep this
        place empty, always!
      </p>

      <div>
        {orders?.map((order, i) => {
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

export default OrdersForShop;
