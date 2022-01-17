import React from "react";
import Modal from "../modal/Modal";
import "./DialogBox.css";
function DialogBox({
  close,
  children,
  onConfirm,
  onCancel,
  okText,
  cancelText,
}) {
  return (
    <>
      <Modal close={close} sizeValue="25" style={{ height: 180 }} customSize>
        <div style={{ width: "100%", height: "100%" }}>
          <div>{children}</div>
          <div className="dialog-footer">
            {/* <div
              style={{
                marginLeft: "auto",
                display: "flex",
                flexDirection: "row",
              }}
            > */}
            <div
              className="dialog-btn"
              style={{ background: "var(--app-color-darkest)" }}
              onClick={() => onCancel && onCancel()}
            >
              {cancelText || "Cancel"}
            </div>
            <div
              onClick={() => onConfirm && onConfirm()}
              className="dialog-btn"
              style={{ background: "green" }}
            >
              {okText || "Ok"}
            </div>
            {/* </div> */}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DialogBox;
