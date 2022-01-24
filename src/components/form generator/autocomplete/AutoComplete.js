import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { elevate, makeClass } from "../shared/_shared.styles";
import { Stylesheet } from "./styles.autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { pop } from "../shared/utils/utils";

function AutoComplete(props) {
  const {
    className,
    style,
    blanketClassName,
    placeholder,
    data,
    labelExtractor,
    valueExtractor,
    onItemSelected,
    multiple,
    defaultValue,
    value,
    onMount,
  } = props;

  const [text, setText] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [selected, setSelected] = useState([]);

  const transfer = (state, justSelected) => {
    if (!onItemSelected) return;
    onItemSelected(state, justSelected);
  };

  const handleSelection = (item) => {
    const value = getValue(item);
    if (!multiple) {
      const old = getValue(selected[0]);
      var transferData = [];
      if (value === old) transferData = [];
      else transferData = [item];
      setSelected(transferData);
      transfer(transferData, item);
      return;
    }

    const { found, rest } = pop(selected, (itm) => getValue(itm) === value);
    if (found) {
      setSelected(rest);
      transfer(rest, item);
      return;
    }
    const state = [...selected, item];
    setSelected(state);
    transfer(state, item);
  };

  const getLabel = (item) => {
    if (!item) return "";
    if (labelExtractor) return labelExtractor(item);
    return item?.toString();
  };

  const getValue = (item) => {
    if (!item) return "";
    if (valueExtractor) return valueExtractor(item);
    return item?.toString();
  };
  const renderDropItems = () => {
    var loopable;
    if (!text) loopable = data;
    const found = (data || []).filter((d) =>
      getLabel(d)?.toLowerCase().includes(text.toLowerCase())
    );

    if (text && found.length) loopable = found;

    if (text && !found.length)
      return <p style={{ color: "grey", padding: 15 }}>No items found...</p>;

    return (loopable || []).map((d) => {
      const label = getLabel(d);
      return (
        <p
          className={`${makeClass(Stylesheet.dropItem)}`}
          onClick={() => handleSelection(d)}
        >
          {label}
        </p>
      );
    });
  };

  const resetFunction = () => {
    setSelected([]);
  };
  useEffect(() => setSelected(defaultValue || value), []);

  useEffect(() => {
    if (onMount) onMount(resetFunction);
  }, []);

  return (
    <div>
      {selected?.length ? (
        <div style={{ padding: 15 }}>
          {selected?.map((item, index) => {
            const label = getLabel(item);
            return (
              <div key={index?.toString()} style={{ display: "inline-block" }}>
                <Chip label={label} close={() => handleSelection(item)} />
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      {showDrop && (
        <div
          className={makeClass(Stylesheet.ghostCurtain)}
          onClick={() => setShowDrop(false)}
        ></div>
      )}
      <div style={{ position: "relative", zIndex: 2 }}>
        <input
          onClick={() => setShowDrop(true)}
          className={`${makeClass(Stylesheet.input)} ${className || ""}`}
          style={style || {}}
          placeholder={placeholder}
          onChange={(e) => {
            setText(e.target.value);
            setShowDrop(true);
          }}
        />
        {showDrop && (
          <div
            className={`${makeClass(Stylesheet.dropContainer)} ${makeClass(
              elevate(2)
            )} ${blanketClassName}`}
          >
            {renderDropItems()}
          </div>
        )}
      </div>
    </div>
  );
}

const Chip = ({ close, label = "A Chip" }) => {
  return (
    <p
      className={`${makeClass(Stylesheet.chip)} ${makeClass(elevate(2))}`}
      onClick={() => close && close()}
    >
      <span>{label}</span>
      {close && <FontAwesomeIcon icon={faTimes} size="xs" />}
    </p>
  );
};
AutoComplete.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  /**
   * Css classname to style the dropdown container
   */
  blanketClassName: PropTypes.object,
  placeholder: PropTypes.string,
  /**
   * Data to fill up dropdown for auto complete
   */
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  /**
   * Function used to extract label to show in dropdown if array of Objects is passed
   */
  labelExtractor: PropTypes.func,
  /**
   * Function used to extract value of selected item if array of objects is passed
   */
  valueExtractor: PropTypes.func,
  /**
   * Exports all selected items when items change
   * @param items
   * @param justSelectedItem
   */
  onItemSelected: PropTypes.func.isRequired,
  /**
   * Determines if multiple items should be selected
   */
  multiple: PropTypes.bool,
  /**
   * Default value to preselect items
   */
  defaultValue: PropTypes.arrayOf(
    PropTypes.oneOf([PropTypes.string, PropTypes.object])
  ),
  value: PropTypes.arrayOf(
    PropTypes.oneOf([PropTypes.string, PropTypes.object])
  ),

  /**
   * Exports a function that resets the component
   * @param resetFunction
   */
  onMount: PropTypes.func,
};
AutoComplete.defaultProps = {
  placeholder: "Start typing here... ",
  data: ["Sheep", "goat", "police", "fanmilk"],
  multiple: true,
  defaultValue: [],
  value: [],
};
export default AutoComplete;
