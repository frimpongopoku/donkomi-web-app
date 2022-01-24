import React, { Component } from "react";
import {
  isArrayOfObjects,
  lowKeyValidation,
  NAME,
} from "../shared/utils/useful";
import PropTypes from "prop-types";
import { cx } from "@emotion/css";
import { radioGroupCSS } from "./_style.radio-group";
import {
  commonStyleProps,
  commonStylePropValues,
} from "../shared/_shared.proptypes";
import { putElementInline, raise } from "../shared/_shared.styles";

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_item: undefined,
    };
    this.handleOnItemSelected = this.handleOnItemSelected.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({ selected_item: undefined });
  }

  handleOnItemSelected(value) {
    const { onItemSelected } = this.props;
    const valueIsSelectedAlready = value === this.state.selected_item;
    if (valueIsSelectedAlready) {
      this.setState({ selected_item: null });
      if (onItemSelected) onItemSelected(null);
      return;
    }
    this.setState({ selected_item: value });
    if (onItemSelected) onItemSelected(value);
  }
  componentDidMount() {
    if (this.props.onMount) this.props.onMount(this.reset);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.selected_item === undefined && props.defaultValue) {
      return { selected_item: props.defaultValue };
    }
    return null;
  }

  itemIsChecked(value) {
    return value === this.state.selected_item;
  }
  renderContent() {
    lowKeyValidation(this.props);
    const { data, valueFieldName, labelFieldName, groupStyle, groupClassName } =
      this.props;
    const dealingWithObjs = isArrayOfObjects(data);
    if (!data) return <small>Please provide data for radio group...</small>;
    return data.map((item, index) => {
      var label, value;
      if (dealingWithObjs) {
        value = item[valueFieldName || labelFieldName];
        label = item[labelFieldName];
      } else {
        label = item;
        value = item;
      }
      return (
        <div
          key={index.toString()}
          className={`${cx(putElementInline)} ${groupClassName}`}
          style={groupStyle}
        >
          <RadioButton
            onItemSelected={this.handleOnItemSelected}
            checked={this.itemIsChecked(value)}
            label={label}
            value={value}
          />
        </div>
      );
    });
  }

  render() {
    return <> {this.renderContent()}</>;
  }
}

RadioGroup.propTypes = {
  ...commonStyleProps,
  /** Data to be displayed displayed in the form of radio buttons */
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])
  ),

  /** Should be provided if an array objects is passed into @data instead of an array of strings */
  labelFieldName: PropTypes.string,
  /** Should be provided if an array objects is passed into @data instead of an array of strings. Used to retrive the value from object onItemSelected. f this is not provided, labelFieldName is used  */
  valueFieldName: PropTypes.string,
  /** Provides selected value when any item is selected */
  onItemSelected: PropTypes.func,
  /**  Value of item that should be pre-marked on load */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  groupClassName: PropTypes.string,
  groupStyle: PropTypes.object,
  /**
   * Function that exports a function that resets the component
   */
  onMount: PropTypes.func
};

RadioGroup.defaultProps = {
  ...commonStylePropValues,
  data: ["Orange", "Banana", "Mangoes", "Pineaples", "Lettuce"],
  labelFieldName: NAME,
  valueFieldName: NAME,
  defaultValue: null,
  groupStyle: {},
  groupClassName: "",
};

const RadioButton = (props) => {
  const {
    containerStyle,
    containerClassName,
    style,
    className,
    onItemSelected,
    checked,
    value,
    label,
  } = props;
  const { emptyCircle, defaultContainer, hoveringCheckMarkCss } = radioGroupCSS;

  return (
    <div className={`${containerClassName}`} style={containerStyle}>
      <div
        className={cx(defaultContainer)}
        onClick={() => onItemSelected(value)}
      >
        <div style={{ position: "relative" }}>
          <div className={`${cx(emptyCircle)} box`}></div>
          {checked && (
            <div
              className={`${cx(hoveringCheckMarkCss, raise)} check-mark`}
            ></div>
          )}
        </div>

        <p style={style} className={`${className}`}>
          {label && label.toString()}
        </p>
      </div>
    </div>
  );
};
