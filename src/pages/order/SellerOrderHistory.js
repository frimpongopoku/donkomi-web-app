import React from "react";
import OrderItem from "./OrderItem";
function SellerOrderHistory() {
  return (
    <div>
      <p style={{ marginTop: 20, marginBottom: 20 }}>
        Here, you can go back in time and look for an old order. Just in case
        you need any form of clarification
      </p>

      <div>
        {[1, 2, 3, 4, 4, 55].map((x, i) => {
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

export default SellerOrderHistory;
