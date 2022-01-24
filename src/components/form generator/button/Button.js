import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx } from "@emotion/css";
import { default_btn, remove_defaults, round_me } from "./_style.button";
import { elevate } from "../shared/_shared.styles";
export default class Button extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    const { onClick } = this.props;
    if (!onClick) return;
    onClick(e);
  }
  render() {
    const { className, style, elevation, rounded, _generics } = this.props;
    return (
      <button
        className={`${cx(
          remove_defaults,
          default_btn,
          elevate(elevation),
          rounded && round_me
        )}${className}`}
        style={style}
        onClick={this.handleOnClick}
        {..._generics}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  /** Css inline styling for button element */
  style: PropTypes.object,
  /** Css classes for button element */

  className: PropTypes.string,
  /** Inline onClick function for button element */
  onClick: PropTypes.func,
  /** Use this field to add box-shadow elevation to your button when needed */
  elevate: PropTypes.number,
  /** A true value gives the button rounded edges */
  rounded: PropTypes.bool,
  /** Use this field to pass in normal HTML properties that are available in normal HTML but have not been stated as props here */
  _generics: PropTypes.object,
};

Button.defaultProps = {
  style: {},
  className: "",
  elevation: 3,
  rounded: false,
  _generics: {},
};
