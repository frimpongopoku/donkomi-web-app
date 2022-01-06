import React from "react";
import "./order.css";
import OrderItem from "./OrderItem";
function OrderHistory() {
  return (
    <div className="order-history-container" style={{ marginTop: 15 }}>
      <p style={{ marginBottom: 15 }}>
        Here is a list of all the orders you have made since the beginning of
        time...{" "}
      </p>
      <div>
        {[1, 3, 4, 5, 5, 5].map((x, i) => {
          return (
            <React.Fragment key={i.toString()}>
              <OrderItem />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default OrderHistory;
