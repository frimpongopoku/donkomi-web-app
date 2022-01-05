import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkBoxCss } from "./_style.checkbox";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { commonStylePropValues } from "../shared/_shared.proptypes";

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_checked: undefined,
    };
    this.onCheckBoxSelected = this.onCheckBoxSelected.bind(this);
  }

  onCheckBoxSelected(e) {
    e.preventDefault();
    const { onItemSelected, label, value } = this.props;
    const { is_checked } = this.state;
    this.setState({ is_checked: !is_checked });
    if (!onItemSelected) return;
    onItemSelected(value || label);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.is_checked === undefined && props.checked)
      return { is_checked: props.checked };
    return null;
  }
  render() {
    const { containerStyle, containerclassName, style, className, label } =
      this.props;
    const { emptyBox, defaultContainer, hoveringCheckMarkCss } = checkBoxCss;

    return (
      <div className={containerclassName} style={containerStyle}>
        <div className={cx(defaultContainer)} onClick={this.onCheckBoxSelected}>
          <div style={{ position: "relative" }}>
            <div className={`${cx(emptyBox)} box`}></div>
            {this.state.is_checked && (
              <FontAwesomeIcon
                icon={faCheck}
                className={`${cx(hoveringCheckMarkCss)} check-mark`}
              />
            )}
          </div>

          <p style={style} className={`${className}`}>
            {label}
          </p>
        </div>
      </div>
    );
  }
}

CheckBox.propTypes = {
  /** Inline style for the root container of the entire textbox */
  containerStyle: PropTypes.object,
  /** Classnames for the root container of the entire textbox */
  containerClassName: PropTypes.string,
  /** Inline style for input textbox element itself */
  style: PropTypes.object,
  /** Classnames for the input textbox element itself */
  className: PropTypes.string,
  /** Text to be shown by checkbox */
  label: PropTypes.string,
  /** Value of checkbox when selected */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool,
  ]),
};

CheckBox.defaultProps = {
  ...commonStylePropValues,
  label: "Select me please...",
  value: null,
};
