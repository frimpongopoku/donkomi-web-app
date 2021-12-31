import React, { useState } from "react";
import broken from "./img_broken.png";
import loadingGif from "./loading-gif.gif";
import PropTypes from "prop-types";

function ImageThumbnail({ onClick, imageSource, src, style = {}, className }) {
  const [showImage, setShowImage] = useState(false);
  const [source, setSrc] = useState(null);
  const noSelectionStyle = !onClick
    ? { boxShadow: "0 0 0", borderColor: "white" }
    : {};
  return (
    <div>
      {/*  This is what actually loads the image, but is always invisible */}
      <img
        src={imageSource || src}
        style={{ width: 0, opacity: 0 }}
        onLoad={(e) => {
          setShowImage(true);
          setSrc(e.target.src);
        }}
        onError={() => {
          setShowImage(true);
          setSrc(broken);
        }}
      />
      {!showImage && (
        <img
          src={loadingGif}
          style={{ objectFit: "contain", height: 60, width: 60, margin: 20 }}
          onError={(e) => (e.target.src = broken)}
        />
      )}
      {showImage && (
        <img
          onClick={() => onClick && onClick()}
          src={source}
          className={`m-thumb-image ${className}`}
          style={{ ...style, ...noSelectionStyle }}
          onError={(e) => (e.target.src = broken)}
        />
      )}
    </div>
  );
}
ImageThumbnail.propTypes = {
  imageSource: PropTypes.string,
  src: PropTypes.string,
};

ImageThumbnail.defaultProps = {
  src: "https://i.pravatar.cc/200",
};
export default ImageThumbnail;
