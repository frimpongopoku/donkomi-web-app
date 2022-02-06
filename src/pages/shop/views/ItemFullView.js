import React from "react";
import "./ItemFullView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ImageThumbnail from "./../../../components/thumbnail/ImageThumbnail";

function ItemFullView({ content, setFullView, add, remove, cart }) {
  const { product } = content || {};

  const inCart = (cart?.shop || []).find((i) => i.product.id === product?.id);
  return (
    <div>
      <div className="item-full-container anime-show-from-left">
        <div style={{ position: "relative" }}>
          <div className="item-full-header pc-vanish">
            <span
              style={{ padding: "15px" }}
              className="touchable-opacity"
              onClick={() => setFullView(null)}
            >
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
              <small style={{ marginLeft: 10 }}>Back</small>
            </span>
            <span style={{ marginLeft: "auto", padding: 15 }}>
              <small>Rs {product?.price || 0}</small>
            </span>
          </div>

          <div className="item-full-content">
            <ImageThumbnail className="full-view-img" src={product?.image} />

            <div className="phone-vanish">
              <p
                onClick={() => setFullView(null)}
                className="touchable-opacity"
                style={{
                  width: "100%",
                  background: "var(--app-color-darkest)",
                  padding: 15,
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  marginTop: -5,
                  marginLeft: -0.5,
                }}
              >
                CLOSE
              </p>
              <Footer
                qty={inCart?.qty}
                add={() => add(product)}
                remove={() => remove(product?.id)}
              />
            </div>
            <div className="full-details">
              <h3>First Item Here Bro</h3>
              <p className="f-det-item">
                <span>Size:</span> {product?.size || "No size specified"}
              </p>
              <p className="f-det-item">
                <span>Variant:</span>{" "}
                {product?.variant || "No variant specified"}
              </p>
              <p className="f-det-item">
                <span>Price:</span>
                <span style={{ color: "var(--app-color-darker)" }}>
                  {" "}
                  Rs {product?.price || 0}
                </span>
              </p>
              <p className="f-det-item">
                <span>Shop:</span> {product?.shops[0]?.name}
              </p>
              <p className="f-det-item">
                <span>Shop Owner: </span>{" "}
                {product?.creator?.preferred_name || "..."}
              </p>
              {inCart && (
                <small style={{ color: "green" }}>
                  <i>
                    You have <b>{inCart?.qty}</b> of this item in your cart
                  </i>
                </small>
              )}
            </div>
          </div>
          <div className="pc-vanish">
            <Footer
              qty={inCart?.qty}
              add={() => add(product)}
              remove={() => remove(product?.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Footer = ({ add, remove, qty }) => {
  return (
    <div className="item-full-footer">
      <span
        style={{ flex: 1, color: "red" }}
        className="touchable-opacity"
        onClick={() => remove()}
      >
        <FontAwesomeIcon icon={faMinus} />
      </span>
      <span style={{ flex: 1 }}>
        <small>{qty || 0}</small>
      </span>
      <span
        style={{ flex: 1, color: "green" }}
        className="touchable-opacity"
        onClick={() => add()}
      >
        <FontAwesomeIcon icon={faPlus} />
      </span>
    </div>
  );
};
export default ItemFullView;
