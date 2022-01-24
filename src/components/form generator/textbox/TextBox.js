import React, { Component } from "react";
import PropTypes from "prop-types";
import { cx } from "@emotion/css";
import { input } from "./_styles.textbox";
/**
 *
 * Modified Input/TextArea
 * @param {string} className
 * @param {string} containerClassName
 * @param {string} placeholder
 * @param {object} style
 * @param {object} containerStyle
 * @param {bool} textarea
 * @param {bool} _generics
 */
export default class TextBox extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(e) {
    const { onChange } = this.props;
    if (!onChange) return;
    onChange(e);
  }
  render() {
    const { textarea } = this.props;
    if (textarea)
      return (
        <TextAreaComponent {...this.props} onChange={this.handleOnChange} />
      );
    return <InputBoxComponent {...this.props} onChange={this.handleOnChange} />;
  }
}
TextBox.defaultProps = {
  placeholder: "Enter text...",
  containerStyle: {},
  containerClassName: "",
  className: "",
  style: {},
  _generics: {},
  textArea: false,
};
TextBox.propTypes = {
  /** A function that will receive all keystrokes of the textbox */
  onChange: PropTypes.func,
  /** Inline style for the root container of the entire textbox */
  containerStyle: PropTypes.object,
  /** Classnames for the root container of the entire textbox */
  containerClassName: PropTypes.string,
  /** Inline style for input textbox element itself */
  style: PropTypes.object,
  /** Classnames for the input textbox element itself */
  className: PropTypes.string,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Properties of normal HTML input boxes that are used but have not been targeted by the custom defined props Eg. required, max, min, onKeyDown etc */
  _generics: PropTypes.object,
  /** An indicator that an HTML text area should be shown instead of a normal input */
  textArea: PropTypes.bool,
};

export const InputBoxComponent = (props) => {
  const {
    placeholder,
    style,
    className,
    _generics,
    onChange,
    containerClassName,
    containerStyle,
    value,
    defaultValue,
  } = props;
  return (
    <div style={containerStyle} className={containerClassName}>
      <input
        onChange={onChange}
        style={style}
        className={`${cx(input)} ${className}`}
        placeholder={placeholder}
        value={value || defaultValue || ""}
        {..._generics}
      />
    </div>
  );
};

export const TextAreaComponent = (props) => {
  const {
    placeholder,
    style,
    className,
    _generics,
    onChange,
    containerStyle,
    containerClassName,
    value,
    defaultValue,
  } = props;
  return (
    <div style={containerStyle} className={containerClassName}>
      <textarea
        style={style}
        className={`${cx(input)} ${className}`}
        onChange={onChange}
        placeholder={placeholder}
        rows={7}
        value={value || defaultValue || ""}
        {..._generics}
      ></textarea>
    </div>
  );
};
