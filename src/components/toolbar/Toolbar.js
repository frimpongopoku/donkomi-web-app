import {
  faBackward,
  faBars,
  faBell,
  faCartArrowDown,
  faHamburger,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PREVIOUS_PAGE } from "../../redux/ReduxConstants";
import { makeCartSummary } from "../../shared/js/utils";
import "./Toolbar.css";

function Toolbar(props) {
  const { back, showSidebar, cart, showBack } = props;
  const goto = useNavigate();
  const basket = cart?.shop || [];
  const { numberOfItems } = makeCartSummary(basket);

  return (
    <>
      <div className=" elevate-float toolbar-container">
        <div className="left">
          <div className="flex " style={{ padding: "0px 0px" }}>
            <span
              className="tool-icon pc-vanish"
              onClick={() => {
                if (showSidebar) showSidebar(true);
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </span>
            {back && <FontAwesomeIcon icon={faLongArrowAltLeft} />}
            <p style={{ margin: 0, marginLeft: 7, fontWeight: "bold" }}>
              Donkomi
            </p>
          </div>
        </div>
        <div className="right">
          <span className="tool-icon">
            <FontAwesomeIcon icon={faBell} />
          </span>
          <span
            className="tool-icon"
            onClick={() => goto("/user/control/my-cart/show")}
          >
            <FontAwesomeIcon icon={faCartArrowDown} className="" />
            {numberOfItems ? (
              <span className="tool-icon-badge">{numberOfItems}</span>
            ) : (
              <></>
            )}
          </span>
        </div>
      </div>
      {showBack && (
        <div className="toolbar-back" style={{}}>
          <p
            onClick={() => goto(PREVIOUS_PAGE)}
            className="touchable-opacity"
            style={{ fontWeight: "bold", color: "var(--app-color-darker)" }}
          >
            {" "}
            <FontAwesomeIcon icon={faLongArrowAltLeft} />{" "}
            <span style={{ marginLeft: 6 }}>Go Back</span>
          </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
export default connect(mapStateToProps)(Toolbar);
