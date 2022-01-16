import React from "react";
import NotFound from "../../components/not found/NotFound";
import { NotFoundImage } from "../../components/notice/exports";
import Notice from "./../../components/notice/Notice";
import "./Cart.css";
import { CartItem } from "./CartItem";
import { makeCartSummary } from "./../../shared/js/utils";
import { useEffect } from "react";

function Basket({ add, remove, reduce, basket }) {
  const { totalPrice } = makeCartSummary(basket);
  return (
    <div>
      <div className="flex cart-total" style={{ padding: "0px 20px" }}>
        <h2 style={{ marginLeft: "auto" }}>
          Total Amount :{" "}
          <span style={{ color: "green" }}>Rs {Number(totalPrice) || 0}</span>
        </h2>
      </div>
      <div className="cart-content">
        {basket?.map((item, i) => {
          const { product, qty } = item;
          return (
            <React.Fragment key={i.toString()}>
              <CartItem
                {...product}
                qty={qty}
                add={() => add(product)}
                remove={() => remove(product?.id)}
                reduce={() => reduce(product?.id)}
              />
            </React.Fragment>
          );
        })}

        {!basket?.length && (
          <NotFound label="You have not added anything to your cart yet, start shopping!" />
        )}
      </div>
    </div>
  );
}

export default Basket;
