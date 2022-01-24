import React, { Component } from "react";
import { lowKeyValidation, isArrayOfObjects } from "../shared/utils/useful";
import PropTypes from "prop-types";
import CheckBox from "./CheckBox";
import { cx } from "@emotion/css";
import { putElementInline } from "../shared/_shared.styles";

export default class CheckBoxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_items: [],
    };
    this.handleOnItemSelected = this.handleOnItemSelected.bind(this);
    this.itemIsSelected = this.itemIsSelected.bind(this);
  }

  handleOnItemSelected(value) {
    const { onItemSelected } = this.props;
    const { selected_items } = this.state;
    const notInIt = selected_items?.filter((itm) => itm !== value) || [];
    const itemExists = selected_items?.filter((itm) => itm === value)[0];
    if (!itemExists) {
      var together = [...notInIt, value];
      this.setState({ selected_items: together });
      if (onItemSelected) onItemSelected(together, value);
      return;
    }
    this.setState({ selected_items: notInIt });
    if (onItemSelected)
      onItemSelected(notInIt.length !== 0 ? notInIt : [], value);
  }

  componentDidMount() {
    // const { defaultValue, value } = this.props;
    // if (defaultValue || value)
    //   this.setState({ selected_items: defaultValue || value });
    // console.log("I am the the did mount", defaultValue, value);
  }

  static getDerivedStateFromProps(props, state) {
    const { selected_items } = state;
    if (
      selected_items &&
      selected_items.length === 0 &&
      (props.defaultValue || props.value)
    ) {
      // first time this component mounts, set the state with the default value provided, if available
      return { selected_items: props.defaultValue };
    }
    return null;
  }

  itemIsSelected(value) {
    const { selected_items } = this.state;

    const k = selected_items?.filter((itm) => itm === value)[0];
    return value === k;
  }

  renderContent() {
    lowKeyValidation(this.props);
    const { data, groupClassName, groupStyle, valueFieldName, labelFieldName } =
      this.props;
    if (!data) return <small> Provide data for this checkbox group...</small>;
    const dealingWithObjs = isArrayOfObjects(data);
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
          className={`${cx(putElementInline)} ${groupClassName}`}
          style={groupStyle}
          key={index.toString()}
        >
          <CheckBox
            {...this.props.childProps}
            label={label}
            value={value}
            onItemSelected={this.handleOnItemSelected}
            checked={this.itemIsSelected(value)}
          />
        </div>
      );
    });
  }

  render() {
    return <>{this.renderContent()}</>;
  }
}

CheckBoxGroup.propTypes = {
  /** Data to be displayed displayed in the form of checkboxes */
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),

  /** Should be provided if an array objects is passed into @data instead of an array of strings */
  labelFieldName: PropTypes.string,
  /** Should be provided if an array objects is passed into
   * @data instead of an array of strings.
   *  Used to retrive the value from object onItemSelected.
   * If this is not provided, labelFieldName is used */
  valueFieldName: PropTypes.string,
  /** Provides selected value when any item is selected */
  onItemSelected: PropTypes.func,
  /**  Value of items that should be pre-marked on load */
  defaultValue: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  /** inline style to be attached to main wrapping div of the checkbox group */
  groupStyle: PropTypes.object,
  /** classes to be attched to main wrapping div of the checkbox group */
  groupClassName: PropTypes.string,
  /** Properties that should be passed on to each checkbox that is being displayed */
  childProps: PropTypes.object,
};

CheckBoxGroup.defaultProps = {
  data: ["Select Me Please..."],
  groupStyle: {},
  groupClassName: "",
  childProps: {},
  defaultValue: [],
  value: [],
};
