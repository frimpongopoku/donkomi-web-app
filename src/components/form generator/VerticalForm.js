import React, { useEffect } from "react";
import { FieldTypes } from "./reducer";
import { makeClass } from "./shared/_shared.styles";
import Textbox from "./textbox/TextBox";
import Checkbox from "./checkbox/CheckBox";
import CheckboxGroup from "./checkbox/CheckBoxGroup";
import RadioGroup from "./radio-group/RadioGroup";
import Dropdown from "./dropdown/Dropdown";
import Button from "./button/Button";
import FileSelector from "./file picker/ImageSelector";
import AutoComplete from "./autocomplete/AutoComplete";
const styles = {
  container: {
    padding: 10,
  },
  content: {},
};

export default function VerticalForm(props) {
  const {
    className,
    style,
    fields,
    setState,
    state,
    title,
    subtitle,
    onSubmit,
    setFormState,
    actionText,
    setResetor,
  } = props;

  const renderLabel = (field) => {
    const error = getError(field);
    if (field.label)
      return (
        <div style={{ marginTop: 6, marginBottom: 6 }}>
          <small>{field.label}</small>
          <br />
          {error && (
            <small style={{ color: "red", fontWeight: "bold" }}>{error}</small>
          )}
        </div>
      );
  };

  const handleOnChange = (field, value) => {
    setFormState({ [field.dbName || field.name]: value });
  };

  const getStateValue = (field) => {
    return (state?.form || {})[field.dbName || field.name];
  };

  const getError = (field) => {
    return (state?.errors || {})[field.name || field.dbName] || "";
  };

  const renderInput = (field, isTextarea) => {
    const value = getStateValue(field);
    const obj = {
      ...field,
      value,
      onChange: (e) => handleOnChange(field, e.target.value),
    };

    if (isTextarea) return <Textbox {...obj} textarea />;
    return <Textbox {...obj} />;
  };

  const renderCheckbox = (field, isGroup) => {
    const value = getStateValue(field);
    if (isGroup)
      return (
        <CheckboxGroup
          {...field}
          defaultValue={value}
          onItemSelected={(data) => handleOnChange(field, data)}
        />
      );
    return <Checkbox {...field} />;
  };

  const renderRadios = (field) => {
    const value = getStateValue(field);
    return (
      <RadioGroup
        {...field}
        defaultValue={value}
        onItemSelected={(data) => handleOnChange(field, data)}
        onMount={(reset) => setResetor(reset)}
      />
    );
  };

  const renderDropdown = (field) => {
    const value = getStateValue(field);
    return (
      <Dropdown
        {...field}
        defaultValue={value}
        onItemSelected={(data) => handleOnChange(field, data)}
        onMount={(reset) => setResetor(reset)}
      />
    );
  };

  const renderMediaSelector = (field) => {
    const value = getStateValue(field);
    return (
      <FileSelector
        {...field}
        defaultValue={value}
        onFileSelected={(data, reset) => {
          handleOnChange(field, data);
          setResetor(reset);
        }}
      />
    );
  };

  const renderAutoComplete = (field) => {
    const value = getStateValue(field);
    return (
      <AutoComplete
        {...field}
        value={value}
        onItemSelected={(items) => handleOnChange(field, items)}
        onMount={(reset) => setResetor(reset)}
      />
    );
  };

  const getComponentWithType = (field) => {
    switch (field.fieldType) {
      case FieldTypes.INPUT:
        return renderInput(field);
      case FieldTypes.TEXTAREA:
        return renderInput(field, true);
      case FieldTypes.CHECKBOX:
        return renderCheckbox(field);
      case FieldTypes.CHECKBOXGROUP:
        return renderCheckbox(field, true);
      case FieldTypes.RADIO:
        return renderRadios(field);
      case FieldTypes.RADIOGROUP:
        return renderRadios(field);
      case FieldTypes.DROPDOWN:
        return renderDropdown(field);
      case FieldTypes.MEDIAUPLOAD:
        return renderMediaSelector(field);
      case FieldTypes.AUTOCOMPLETE:
        return renderAutoComplete(field);
      default:
        <small>Item is not available in form...</small>;
    }
  };

  return (
    <div
      className={` ${makeClass(styles.container)} ${className}`}
      style={style || {}}
    >
      {title && <h2 style={{ margin: "5px 0px" }}>{title}</h2>}
      {subtitle && <h4 style={{ margin: "5px 0px" }}>{subtitle}</h4>}

      <div className={`${makeClass(styles.content)}`}>
        {(fields || []).map((field, index) => {
          return (
            <div key={index.toString()}>
              {renderLabel(field)}
              {getComponentWithType(field)}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", width: "100%" }}>
        <Button style={{ marginLeft: "auto" }} onClick={onSubmit}>
          {actionText}
        </Button>
      </div>
    </div>
  );
}
