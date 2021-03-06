import React from "react";
import ImageThumbnail from "../../../components/thumbnail/ImageThumbnail";
import "./ItemFrame.css";
function ItemFrame({ children, right, imageSource, noImage }) {
  return (
    <div className="item-frame-container">
      {!noImage && (
        <ImageThumbnail
          src={imageSource}
          style={{ flex: 1, height: 80, width: 80, borderRadius: 5 }}
        />
      )}
      <div style={{ flex: 4, padding: "0px 10px" }}>{children}</div>
      <div
        style={{ flex: 2, padding: "0px 10px", textAlign: "center" }}
        className=""
      >
        {right}
      </div>
    </div>
  );
}

export default ItemFrame;
