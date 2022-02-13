import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ItemFrame from "./item frame/ItemFrame";
export const CartItem = ({
  name,
  price,
  qty,
  shops,
  image,
  add,
  remove,
  reduce,
}) => {

  const shop = (shops || [])[0]
  return (
    <ItemFrame
      imageSource={image}
      right={
        <div className="right-wrap">
          <div className="flex my-frame-right" style={{ textAlign: "center" }}>
            <span onClick={() => reduce && reduce()}>
              <FontAwesomeIcon
                className="touchable-opacity"
                icon={faMinus}
                style={{ color: "var(--app-color-darkest)" }}
              />
            </span>
            <span onClick={() => add && add()}>
              {" "}
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "green" }}
                className="touchable-opacity"
              />
            </span>
          </div>
          <p
            onClick={() => remove && remove()}
            style={{ color: "var(--app-color-darkest)", marginTop: 6 }}
            className="touchable-opacity"
          >
            <b> Remove</b>
          </p>
        </div>
      }
    >
      <div className="cart-item-container">
        <h3>{name || "..."}</h3>
        <h5>
          Rs {price || 0} <span>X {qty || 1}</span>
        </h5>
        <h6 style={{ color: "Green" }}>{shop?.name || "..."}</h6>
      </div>
    </ItemFrame>
  );
};

export const OrderViewItem = (props) => {
  const { quantity, product, total_price } = props;
  const shop = (product.shops || [])[0]

  return (
    <ItemFrame
      right={
        <div className="right-wrap">
          <p
            style={{ color: "var(--app-color-darkest)", marginTop: 6 }}
            className="touchable-opacity"
          >
            <b>Rs {total_price}</b>
          </p>
        </div>
      }
    >
      <div className="cart-item-container">
        <h3>{product?.name || "..."}</h3>
        <h5>
          Rs {product?.price || "0"} <span>X {quantity || "1"}</span>
        </h5>
        <h6 style={{ color: "Green" }}>{shop?.name || "..."}</h6>
      </div>
    </ItemFrame>
  );
};
