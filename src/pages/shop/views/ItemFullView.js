import React from "react";
import "./ItemFullView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ImageThumbnail from "./../../../components/thumbnail/ImageThumbnail";

function ItemFullView() {
  return (
    <div>
      <div className="item-full-container">
        <div style={{ position: "relative" }}>
          <div className="item-full-header">
            <span style={{ padding: "15px" }}>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
              <small style={{ marginLeft: 10 }}>Back</small>
            </span>
            <span style={{ marginLeft: "auto", padding: 15 }}>
              <small>Rs 4589</small>
            </span>
          </div>
          <div className="item-full-content">
            <ImageThumbnail className="full-view-img" />
            <div className="full-details">
              <h3>First Item Here Bro</h3>
              <p className="f-det-item">
                <span>Size:</span> Large, Medium
              </p>
              <p className="f-det-item">
                <span>Variant:</span> Omicron, Delta
              </p>
              <p className="f-det-item">
                <span>Price:</span>
                <span style={{ color: "var(--app-color-darker)" }}>
                  {" "}
                  Rs 4589
                </span>
              </p>
              <p className="f-det-item">
                <span>Shop:</span> Pongo's Thrift Shop
              </p>
              <p className="f-det-item">
                <span>Shop Owner: </span> Pongo
              </p>

              <small style={{ color: "green" }}>
                <i>You have this item in your cart</i>
              </small>
            </div>
          </div>
          <div className="item-full-footer">
            <span
              style={{ flex: 1, color: "red" }}
              className="touchable-opacity"
            >
              <FontAwesomeIcon icon={faMinus} />
            </span>
            <span style={{ flex: 1 }}>
              <small>3</small>
            </span>
            <span
              style={{ flex: 1, color: "green" }}
              className="touchable-opacity"
            >
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemFullView;
