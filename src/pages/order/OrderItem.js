import React from "react";
import ItemFrame from "./../cart/item frame/ItemFrame";
function OrderItem({ onClick }) {
  return (
    <div className="touchable-opacity" onClick={() => onClick && onClick()}>
      <ItemFrame
        right={
          <p style={{ color: "green", fontWeight: "bold", textAlign: "right" }}>
            Rs 93,598
          </p>
        }
        noImage
      >
        <div>
          <h3 style={{ color: "var(--app-color-darker)", fontWeight: "300" }}>
            Order #2345
          </h3>
          <h5>From Pongo's lair, Lizstyles, Gbemi</h5>
          <h6 style={{ color: "green" }}>Complete</h6>
        </div>
      </ItemFrame>
    </div>
  );
}

export default OrderItem;
