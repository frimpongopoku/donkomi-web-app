import React from "react";
import "./../ShopManagement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageThumbnail from "./../../../components/thumbnail/ImageThumbnail";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import NotFound from "./../../../components/not found/NotFound";
function SeeAllShops() {
  return <NotFound />;
  return (
    <div className="all-shops-container">
      <p style={{ marginTop: 15 }}>
        If you have created shops, all your shops will show up below
      </p>
      <div style={{ marginTop: 20 }}>
        {[1, 2, 3, 4, 5].map((s, i) => {
          return (
            <React.Fragment key={i?.toString()}>
              <ShopCard />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export const ShopCard = ({ children }) => {
  return (
    <div className="shop-card flex">
      <ImageThumbnail className="shop-image" />
      <div className="shop-mid-part">
        <h4>The main shop</h4>
        {children}
      </div>
      <div style={{ marginLeft: "auto" }}>
        <div className="right-items" style={{ padding: "0px 10px" }}>
          <small
            className="touchable-opacity"
            style={{ fontWeight: "bold", color: "var(--app-accent-color-2)" }}
          >
            Edit
          </small>
          <span
            className="touchable-opacity"
            style={{
              fontWeight: "bold",
              color: "var(--app-color-darkest)",
              marginLeft: 15,
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeeAllShops;
