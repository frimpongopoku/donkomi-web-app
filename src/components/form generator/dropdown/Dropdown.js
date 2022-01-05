import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  DEFAULT,
  elevate,
  FULL,
  LEGACY,
  THEME_COLOR,
} from "../shared/_shared.styles";
import { cx } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faLongArrowAltDown,
} from "@fortawesome/free-solid-svg-icons";
import { dropdownCSS } from "./_style.dropdown";
import { isArrayOfObjects, lowKeyValidation } from "./../shared/utils/useful";
const {
  ghostCurtainCss,
  defaultDropdownSelector,
  dropdownChildrenContainer,
  dropdownChildrenContainerFullCss,
  dropdownItemCss,
  selectedItemCss,
  fullWidthTogglerCss,
} = dropdownCSS;
export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorWidth: 0,
      isOpen: false,
      //field is intentionaly set to undefined to differentiate when the component has just been mounted, and when a scenario
      //has intentionally set the value to null
      selected_value: undefined,
    };
    this.defaultSelector = null;
    this.setDerivedSelectorWidth = this.setDerivedSelectorWidth.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({ selected_value: undefined });
  }
  setDerivedSelectorWidth(el) {
    if (el) this.setState({ selectorWidth: el.getBoundingClientRect().width });
  }
  renderDropdownToggler() {
    const { type } = this.props;
    if (type === DEFAULT)
      return (
        <div
          className={`${cx(defaultDropdownSelector)} `}
          ref={this.setDerivedSelectorWidth}
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          <span style={{ marginRight: 7 }}>{this.displayLabel()}</span>
          <FontAwesomeIcon
            style={{ marginLeft: "auto" }}
            icon={faCaretDown}
            color={THEME_COLOR}
          />
        </div>
      );

    return (
      <div
        className={`${cx(fullWidthTogglerCss)} `}
        onClick={() => this.setState({ isOpen: !this.state.isOpen })}
      >
        <span style={{ marginRight: 7 }}>{this.displayLabel()}</span>
        <FontAwesomeIcon
          style={{ marginLeft: "auto" }}
          icon={faLongArrowAltDown}
          color={THEME_COLOR}
        />
      </div>
    );
  }

  handleOnItemSelected(value) {
    const { multiple, onItemSelected } = this.props;
    var { selected_value } = this.state;
    if (!multiple) {
      this.setState({ selected_value: value, isOpen: false });
      if (onItemSelected) onItemSelected(value);
      return;
    }
    selected_value = selected_value || [];
    const isAlreadyIn = selected_value.filter((itm) => itm === value)[0];
    var data;
    if (isAlreadyIn) data = selected_value.filter((itm) => itm !== value);
    else data = [...selected_value, value];
    this.setState({ selected_value: data });
    if (onItemSelected) onItemSelected(data);
  }

  displayLabel() {
    var { selected_value } = this.state;
    if (this.props.multiple) {
      selected_value = selected_value || [];
      var s = selected_value.join(",");
      s = s.length > 40 ? s.slice(0, 40) + "..." : s;
      return s || this.props.placeholder;
    }
    return selected_value || this.props.placeholder;
  }

  showThatItemIsSelected(value) {
    var { selected_value } = this.state;
    if (this.props.multiple) {
      selected_value = selected_value || [];
      const isIn = selected_value.filter((itm) => itm === value)[0];
      if (isIn) return selectedItemCss;
    }
    if (selected_value === value) return selectedItemCss;
  }
  componentDidMount() {
    lowKeyValidation(this.props);
    if (this.props.onMount) this.props.onMount(this.reset);
  }

  static getDerivedStateFromProps(props, state) {
    //A mechanism to set the defaultValue that is provided as props to the state
    // But the value should only be set when its the first time the document has mounted,
    // and "defaultValue" is not null
    if (
      state.selected_value === undefined &&
      (props.defaultValue || props.value)
    ) {
      return { selected_value: props.defaultValue || props.value };
    }

    return null;
  }
  renderGhostCurtain() {
    const { isOpen } = this.state;
    if (isOpen)
      return (
        <div
          className={`${cx(ghostCurtainCss)} ghost-curtain`}
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        ></div>
      );
  }
  ejectChildren() {
    const {
      data,
      dropItemStyle,
      dropItemClassName,
      labelFieldName,
      valueFieldName,
    } = this.props;
    const dealingWithObjs = isArrayOfObjects(data);
    return (data || []).map((item, index) => {
      var label, value;
      if (dealingWithObjs) {
        label = item[labelFieldName];
        value = item[valueFieldName || labelFieldName];
      } else {
        label = item;
        value = item;
      }
      return (
        <div
          className={`${cx(dropdownItemCss)} ${cx(
            this.showThatItemIsSelected(value)
          )} ${dropItemClassName}`}
          key={index.toString()}
          style={dropItemStyle}
          onClick={() => this.handleOnItemSelected(value)}
        >
          {" "}
          {label}
        </div>
      );
    });
  }
  renderDropdownChildren() {
    const { type, dropBlanketStyle, dropBlanketClassName } = this.props;
    const { isOpen } = this.state;
    if (type === DEFAULT && isOpen)
      return (
        <div
          style={{
            maxWidth: this.state.selectorWidth || "100vw",
            minWidth: 200,
            minHeight: 100,
            ...dropBlanketStyle,
          }}
          className={`${cx(
            dropdownChildrenContainer,
            elevate(2)
          )} ${dropBlanketClassName}`}
        >
          {this.ejectChildren()}
        </div>
      );
    else if (type === FULL && isOpen)
      return (
        <div
          style={{
            ...dropBlanketStyle,
          }}
          className={`${cx(
            dropdownChildrenContainerFullCss,
            elevate(2)
          )} ${dropBlanketClassName}`}
        >
          {this.ejectChildren()}
        </div>
      );
    // legacy mode will be completed soon
    // else if (type === LEGACY && isOpen)
    //   return <p>I am the legacy dropdown bruh dont play with me bitches</p>;
  }

  render() {
    const { containerClassName, containerStyle, type } = this.props;

    return (
      <div style={containerStyle} className={containerClassName}>
        <div
          style={{
            position: "relative",
            display: type === DEFAULT ? "inline" : "block",
          }}
        >
          {this.renderDropdownToggler()}
          {this.renderGhostCurtain()}
          {this.renderDropdownChildren()}
        </div>
      </div>
    );
  }
}

Dropdown.Types = {
  DEFAULT: DEFAULT,
  FULL: FULL,
  LEGACY: LEGACY,
};
Dropdown.propTypes = {
  /** Placeholder text until an item is selected in dropdown */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  /** Determines which of the two dropdown designs should be used "default" or "full" */
  type: PropTypes.string,
  /** Content to be listed as dropdown */
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),
  /** Inline style for the dropdown sheet container */
  dropBlanketStyle: PropTypes.object,
  /** Classes for the dropdown sheet container */
  dropBlanketClassName: PropTypes.string,
  /** Inline style for each individual dropdown item */
  dropItemStyle: PropTypes.object,
  /** Classes for each individual dropdown item */
  dropItemClassName: PropTypes.string,
  /** Needed field if a an array of jsons/objects is passed instead of an array of strings.
   * Used to extract which text representation should be used as dropdown text from the objects passed
   */
  labelFieldName: PropTypes.string,
  /** This field is also required when an array of objects is passed.
   * It is used to extract the needed value that should be presented on click from each of the objects in the data array.
   */
  valueFieldName: PropTypes.string,
  /** Indicates whether or not multiple items should be able to be selected on the dropdown  */
  multiple: PropTypes.bool,

  /** Set the default value of the dropdown */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** Set the default value of the dropdown. "value" & "defaultValue" do the same thing. Use any you are comfortable with  */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /**
   * Function that exports a function that resets the component
   */
  onMount: PropTypes.func,
};

Dropdown.defaultProps = {
  placeholder: "Tap To Toggle...",
  type: "default",
  data: ["first", "second", "third"],
  dropBlanketStyle: {},
  dropBlanketClassName: "",
  dropItemStyle: {},
  dropItemClassName: "",
  labelFieldName: "",
  valueFieldName: "",
  multiple: false,
  defaultValue: null,
  value: null,
};
