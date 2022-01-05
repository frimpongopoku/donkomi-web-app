import React, { Component } from "react";
import PropTypes from "prop-types";
import selectorCss from "./_style.image-selector";
import { cx } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { base64StringtoFile } from "../shared/utils/useful";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "./../button/Button";
import { JPEG, JPG, PNG } from "./ImageConstants";

const { container, iconCss, previewImageCss } = selectorCss;
const MEGA = 1000000;
const KILO = 1000;
export default class ImageSlector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      processedFile: null,
      src: null,
      cropMode: false,
      croppedSrc: null,
      crop: {
        aspect: props.ratioWidth / props.ratioHeight,
        unit: "%",
        x: 5,
        y: 5,
      },
    };
    this.cropperRef = null;
    this.fileOpener = React.createRef();
    this.handleOnFileSelected = this.handleOnFileSelected.bind(this);
    this.searchForImage = this.searchForImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.finaliseCropping = this.finaliseCropping.bind(this);
    this.onCropComplete = this.onCropComplete.bind(this);
  }

  /**
   * Activates the invisible file selector
   * For a user to select an image
   * @param {*} e
   * @returns
   */
  searchForImage(e) {
    e.preventDefault();
    this.fileOpener.current.click();
    return false;
  }
  /**
   * A protected way of reading the content of a file selected
   * @param {*} file
   * @returns
   */
  readContentOfSelectedFile(file) {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      this.setState({ src: reader.result })
    );
    return reader.readAsDataURL(file);
  }

  /**
   * Creates a 2d canvas that is used to draw a smaller version
   * of the  selected image
   * @param {Element} img
   * @returns
   */
  createACanvas(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width > 300 ? 300 : img.width;
    canvas.height = canvas.width * (img.height / img.width);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/jpeg");
    return data;
  }

  /**
   * Removes selected image and clears out state fields that
   * have values related to the user's selected image.
   * Also passes a null value as @data to the @onFileSelected function
   * This function is also passed outside in order to enable components outside of this component
   * To reset the whole image selection process
   * @param {*} e
   */
  removeImage(e) {
    if (e) e.preventDefault();
    const { onFileSelected } = this.props;
    this.setState({
      selectedFile: null,
      src: null,
      processedFile: null,
      croppedSrc: null,
    });

    if (onFileSelected) onFileSelected(null, this.removeImage);
  }

  /**
   * Reads the content of the selected file
   * and sets a viewable base64 string version of the file to the state
   * as well as a normal object version
   * @param {object} file
   */
  processSelectedFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = (ev) => {
        const data = this.createACanvas(img);
        const image = base64StringtoFile(data, file.name);
        this.shipProcessedFile(file, image);
        this.setState({ processedFile: image, selectedFile: file, src: data });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  /**
   * Fires initial processing functions
   * Sets selected file to state,
   * sends file object into processing to create a preview image
   * @param {*} e
   * @returns
   */
  handleOnFileSelected(e) {
    e.preventDefault();
    const theFiles = e.target.files;
    if (!theFiles || theFiles.length < 1) return;
    const file = theFiles[0];
    this.processSelectedFile(file);
  }
  /**
   * Renders the default state of the file selector.
   * No image selected
   * @returns
   */
  renderDefaultUntouchedState() {
    return (
      <>
        <center>
          <span onClick={this.searchForImage}>
            <FontAwesomeIcon icon={faUpload} className={cx(iconCss)} />
          </span>
          <p style={{}}>
            {this.props.placeholder || "Select An Image To Upload"}
          </p>
        </center>
      </>
    );
  }
  /**
   * Uses the state object & props to determine which elements to
   * show
   * untouched state, preview mode, cropping mode
   * @returns
   */
  renderDifferentUploaderStates() {
    const { selectedFile, src, cropMode, croppedSrc } = this.state;
    if ((this.props.defaultValue || this.props.value) && !croppedSrc && !src)
      return this.showImagePreviewFromExternalSource();
    if (cropMode) return this.renderCroppingMode();
    if (croppedSrc || src) return this.renderImagePreviewMode();
    if (!selectedFile) return this.renderDefaultUntouchedState();
  }

  /**
   * Loads an image from an external source incase an image link is provided as default value
   * on load
   * @returns
   */
  showImagePreviewFromExternalSource() {
    return (
      <>
        <center>
          <img
            src={this.props.defaultValue || this.props.value}
            alt="selected media"
            className={cx(previewImageCss)}
            onClick={this.searchForImage}
            style={{
              width: 300,
              height: 300,
              objectFit: "contain",
              borderRadius: 6,
            }}
          />
          <br />
          <small>
            Loaded image from external source, as default image. Click to change
          </small>
        </center>
      </>
    );
  }
  /**
   * Renders the preview image
   * with tools to allow the user crop their selected image
   * @returns
   */
  renderImagePreviewMode() {
    const { allowCrop } = this.props;
    const size = this.getFileSize(this.state.selectedFile);
    const imageSizeIsOk =
      this.state.selectedFile.size <= this.props.maxSize * MEGA;
    return (
      <>
        <center>
          <img
            src={this.state.croppedSrc || this.state.src}
            alt="selected media"
            className={cx(previewImageCss)}
            onClick={this.searchForImage}
          />
          <br />
          <small>
            <span>
              Max Size:{" "}
              <span style={{ color: "green" }}>
                <b>{this.props.maxSize + " Mbs  " || "..."}</b>
              </span>
            </span>
          </small>
          <small>
            <span style={{}}>
              File Size:{" "}
              <span style={{ color: imageSizeIsOk ? "green" : "maroon" }}>
                <b>{size}</b>
              </span>
            </span>{" "}
          </small>
          <br />
          <br />
          <small>
            {" "}
            A preview of your image, click the photo to change <br />
            <a href="#void" onClick={this.removeImage}>
              Remove
            </a>
            {allowCrop && (
              <a
                href="#void"
                onClick={() => this.setState({ cropMode: true })}
                style={{ marginLeft: 7 }}
              >
                Crop
              </a>
            )}
          </small>
        </center>
      </>
    );
  }

  /**
   * Fired when user finalises cropping.
   * The funtion deactivates crop mode, and ships the newly recreated image
   * based on the crop dimensions and sends to the @onFileSelected method if available
   * NB: This function is not what does the cropping, the real cropping is done. This function is just a way
   * to pass the cropped values to the  @onFileSelected function only when the user is happy with the area they have selected
   * on their image.
   * @returns
   */
  finaliseCropping() {
    const { onFileSelected } = this.props;
    this.setState({ cropMode: false });
    if (!onFileSelected) return;
    const { selectedFile, croppedFile } = this.state;
    const originalSize = this.getFileSize(selectedFile);
    const data = {
      original: selectedFile,
      originalSize: { size: selectedFile.size, text: originalSize },
      file: croppedFile,
      size: { size: croppedFile.size, text: this.getFileSize(croppedFile) },
    };

    return onFileSelected(data, this.removeImage);
  }

  /**
   * Returns the selected image  to the @onFileSelected function
   * when an image is selected
   * If @compress is enabled, the compressed version of the selected file is put in the "file" field
   * of the object.
   * NB: The originally selected file is always availble in the "origina" field of the object for
   * reference and comparisons just in case there is a need.
   * @param {*} original
   * @param {*} processedFile
   * @returns
   */
  shipProcessedFile(original, processedFile) {
    const { onFileSelected, compress } = this.props;
    if (!onFileSelected) return;
    const originalSize = this.getFileSize(original);
    const data = {
      original: original,
      originalSize: { size: original.size, text: originalSize },
      file: original,
      size: { size: original.size, text: originalSize },
    };

    if (compress) {
      data.file = processedFile;
      data.size = {
        size: processedFile.size,
        text: this.getFileSize(processedFile),
      };
    }
    onFileSelected(data, this.removeImage);
    return;
  }

  renderCroppingMode() {
    const { src, crop } = this.state;
    const { maxHeight, maxWidth } = this.props;
    return (
      <center>
        {" "}
        <p>Hold and drag your cursor over the parts you wish to use</p>
        <br />
        <ReactCrop
          src={src}
          crop={crop}
          onImageLoaded={(ref) => (this.cropperRef = ref)}
          onComplete={this.onCropComplete}
          onChange={(newCrop) => this.whenCropChanges(newCrop)}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
        />
        <br />
        <Button onClick={this.finaliseCropping}>Crop</Button>
      </center>
    );
  }

  getAcceptedFileTypes() {
    const { accept } = this.props;
    if (!accept) return {};
    return { accept: accept.join(", ") };
  }
  render() {
    return (
      <div className={`${cx(container)}`}>
        <input
          type="file"
          ref={this.fileOpener}
          style={{ display: "none" }}
          onChange={this.handleOnFileSelected}
          {...this.getAcceptedFileTypes()}
        />
        {this.renderDifferentUploaderStates()}
      </div>
    );
  }

  /**
   * Just a function the updates the new crop size frame that
   * the user has specified
   * @param {object} crop
   */
  whenCropChanges = (crop) => {
    this.setState({ crop });
  };

  /**
   * Collects the crop dimensions that a user has marked
   * and checks for requirement then passes it to @getCroppedImg
   * for a new image to be drawn
   * @param {object} crop
   */
  onCropComplete(crop) {
    if (this.cropperRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(
        this.cropperRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedSrc: croppedImageUrl });
    }
  }
  /**
   * Uses crop dimensions as blue print to create a canvas that
   * draws the preferred area of the image after crop
   *
   * @param {HTMLImageElement} image - Image File Object
   * @param {Object} crop - crop Object
   * @param {String} fileName - Name of the returned file in Promise
   * @returns {base64String} Return a base64 string of an image file provided, based on a crop frame
   */
  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    // As Base64 string
    const base64Image = canvas.toDataURL("image/jpeg");
    this.setState({
      croppedFile: base64StringtoFile(base64Image, fileName || "new_image"),
    });
    return base64Image;
  }
  /**
   * Calculates and returns a user friendly numerical value that represents
   * The size of the Image File Object provided as a parameter
   * @param {File} file
   * @returns {Number} file size
   */
  getFileSize(file) {
    if (!file) return "";

    var size = file.size;
    // var unit = size < MEGA ? "KB" : "MB";
    if (size < MEGA) return Math.round(size / KILO).toString() + " KB";
    return Math.round(size / MEGA).toString() + " MB";
  }
}

ImageSlector.propTypes = {
  /** Will enable cropping functionalities when set to true */
  allowCrop: PropTypes.bool,
  /** Will include a compressed version of the selected image if selected to true */
  compress: PropTypes.bool,
  /** A link, or an object that should prefil the uploader on start */
  defaultValue: PropTypes.string,
  /** Width of aspect ratio */
  ratioWidth: PropTypes.number,
  /** Height of aspect ratio */
  ratioHeight: PropTypes.number,
  /** Maximum allowed width  the crop frame if cropping is allowed  */
  maxWidth: PropTypes.number,
  /** Maximum allowed height of the crop frame if cropping is allowed */
  maxHeight: PropTypes.number,
  /** Provides ( data ,reset ) that corresponds to latest changes based on selected image, cropping, and compression whenever any happen. A reset function
   * is added to enable outside components to reset the ImageSelector
   * @param data
   * @param reset
   */
  onFileSelected: PropTypes.func.isRequired,

  /** Specify accepted file types in an array. Eg. ["image/png", "image/gif"] */
  accepts: PropTypes.arrayOf(PropTypes.string),
  /** Specifies the file size limit of the user's selected media in Megabytes */
  maxSize: PropTypes.number,
};
ImageSlector.defaultProps = {
  allowCrop: false,
  compress: false,
  defaultValue: null,
  ratioWidth: 4,
  ratioHeight: 3,
  maxHeight: 300,
  maxWidth: 300,
  accept: [PNG, JPEG, JPG],
  maxSize: 2,
};
