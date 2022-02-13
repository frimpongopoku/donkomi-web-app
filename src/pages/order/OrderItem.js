import React from "react";
import ItemFrame from "./../cart/item frame/ItemFrame";
function OrderItem({
  onClick,
  id,
  items,
  completed,
  quantity,
  totalPrice,
  shopString,
}) {
  return (
    <div className="touchable-opacity" onClick={() => onClick && onClick()}>
      <ItemFrame
        right={
          <p style={{ color: "green", fontWeight: "bold", textAlign: "right" }}>
            Rs {totalPrice || 0}
          </p>
        }
        noImage
      >
        <div>
          <h3 style={{ color: "var(--app-color-darker)", fontWeight: "300" }}>
            Order #{id || "..."}
          </h3>
          <h5>{shopString || "..."}</h5>
          <h6>
            <span style={{ color: "green", marginRight: 5 }}>
              {completed ? "Complete" : "In Progress"}
            </span>
            <span>{quantity === 1 ? "1 Item" : quantity + " Items"}</span>
          </h6>
        </div>
      </ItemFrame>
    </div>
  );
}

export default OrderItem;
