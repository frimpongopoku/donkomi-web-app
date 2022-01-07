import React from "react";

import "./Cart.css";
import { CartItem } from "./CartItem";


function Basket() {
  return (
    <div>
      <div className="flex cart-total" style={{ padding: "0px 20px" }}>
        <h2 style={{ marginLeft: "auto" }}>
          Total Amount : <span style={{ color: "green" }}>Rs 3893</span>
        </h2>
      </div>
      <div className="cart-content">
        {[1, 2, 3, 4, 5, 5].map((x, i) => {
          return (
            <React.Fragment key={i.toString()}>
              <CartItem />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Basket;
