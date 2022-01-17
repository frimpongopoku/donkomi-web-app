import React from "react";
import OrderItem from "./OrderItem";
function OrdersForShop({ showFullView }) {
  return (
    <div>
      <p style={{ marginTop: 20, marginBottom: 20 }}>
        The earlier your customers recieve their orders, the better. Keep this
        place empty, always!
      </p>

      <div>
        {[1, 2, 3, 4, 4, 55].map((x, i) => {
          return (
            <React.Fragment key={i.toString()}>
              <OrderItem onClick={() => showFullView({})} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default OrdersForShop;
