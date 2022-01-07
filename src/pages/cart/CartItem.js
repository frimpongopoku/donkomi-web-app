import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ItemFrame from "./item frame/ItemFrame";
export const CartItem = ({}) => {
  return (
    <ItemFrame
      right={
        <div className="right-wrap">
          <div className="flex my-frame-right" style={{ textAlign: "center" }}>
            <span>
              <FontAwesomeIcon
                className="touchable-opacity"
                icon={faMinus}
                style={{ color: "var(--app-color-darkest)" }}
              />
            </span>
            <span>
              {" "}
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "green" }}
                className="touchable-opacity"
              />
            </span>
          </div>
          <p
            style={{ color: "var(--app-color-darkest)", marginTop: 6 }}
            className="touchable-opacity"
          >
            <b> Remove</b>
          </p>
        </div>
      }
    >
      <div className="cart-item-container">
        <h3>Burger One</h3>
        <h5>
          Rs 4598 <span>X 4</span>
        </h5>
        <h6 style={{ color: "Green" }}>Pongos' lair</h6>
      </div>
    </ItemFrame>
  );
};

export const OrderViewItem = ({}) => {
  return (
    <ItemFrame
      right={
        <div className="right-wrap">
          <p
            style={{ color: "var(--app-color-darkest)", marginTop: 6 }}
            className="touchable-opacity"
          >
            <b> 13,569</b>
          </p>
        </div>
      }
    >
      <div className="cart-item-container">
        <h3>Burger One</h3>
        <h5>
          Rs 4598 <span>X 4</span>
        </h5>
        <h6 style={{ color: "Green" }}>Pongos' lair</h6>
      </div>
    </ItemFrame>
  );
};
