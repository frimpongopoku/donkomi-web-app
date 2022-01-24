import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
} from "react";
import { ACTIONS, FieldTypes, formStateReducer } from "./reducer";
import MultiStepForm from "./MultiStepForm";
import VerticalForm from "./VerticalForm";
import Notification from "./notification/Notification";
import { useRef } from "react";

const initialFormState = { form: {}, resetors: [] };
function FormGenerator(props) {
  const {
    multiStep = false,
    onSubmit,
    notification,
    fields,
    onChange,
    formWillUnMount,
  } = props;
  const [state, dispatch] = useReducer(formStateReducer, initialFormState);
  const stateRef = useRef({});
  const setState = (payload = {}) => {
    dispatch({ type: ACTIONS.UPDATE, payload });
  };

  const setFormState = (payload = {}) => {
    dispatch({ type: ACTIONS.ADD_TO_FORM, payload });
  };

  const setResetor = (payload) => {
    dispatch({ type: ACTIONS.ADD_TO_RESETORS, payload });
  };
  const setDefaults = () => {
    var obj = {};
    fields?.forEach((field) => {
      obj = {
        ...obj,
        [field.dbName || field.name]: field.value || field.defaultValue || null,
      };
      delete field.value;
      delete field.defaultValue;
    });
    setFormState(obj);
  };

  const getStateValue = (field) => {
    return (state?.form || {})[field.dbName || field.name];
  };
  const requiredFieldIsEmpty = (field) => {
    const stateValue = getStateValue(field);
    if ((field.isRequired || field.required) && !stateValue)
      return [
        true,
        `${field.name || field.dbName} is required but no value is provided`,
      ];
    return [false, null];
  };

  const requirementsFailed = () => {
    const failed = {};
    var count = 0;
    fields.forEach((field) => {
      const name = field.name || field.dbName;
      const [empty, message] = requiredFieldIsEmpty(field);
      if (empty) {
        failed[name] = message;
        count++;
      }
      if (field.validator) {
        // all field items can have a validator field that takes in the state value of the field
        // in the form,
        // the validator function must return an array whose first item is the status of validation, and the second
        //item is the error message if validation failed
        const [passed, msg] = field.validator(getStateValue(field));
        if (!passed) {
          failed[name] = msg;
          count++;
        }
      }
    });
    return [count, failed];
  };

  const handleOnSubmit = () => {
    if (!onSubmit)
      return console.log("You have not provided a submit function...");
    setState({ errors: null });
    const [failed, info] = requirementsFailed();
    if (failed) return setState({ errors: info });
    onSubmit(state?.form, resetForm);
  };

  const resetForm = () => {
    setState({ form: {} });
    if (state.resetors) state.resetors.forEach((reset) => reset());
  };

  // ------------------------------- EFFECTS ---------------------------------------
  useEffect(() => setDefaults(), [fields]);

  useEffect(
    () => setState({ notification: notification || null }),
    [notification]
  );

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useLayoutEffect(
    () => () => formWillUnMount && formWillUnMount(stateRef.current),
    []
  );

  useEffect(() => {
    if (!onChange) return;
    onChange(state);
  }, [state]);
  // ------------------------------------- END EFFECTS ----------------------------------

  if (!fields || !fields?.length)
    return (
      <p style={{ color: "deeporange" }}>
        Please add <i>fields</i> to generate form...
      </p>
    );
  var Form;
  if (multiStep) Form = MultiStepForm;
  else Form = VerticalForm;
  return (
    <>
      <Form
        state={state}
        setState={setState}
        setFormState={setFormState}
        setResetor={setResetor}
        {...props}
        onSubmit={handleOnSubmit}
      />

      {notification && (
        <Notification
          {...(notification || {})}
          close={() => setState({ notification: null })}
        />
      )}
    </>
  );
}

FormGenerator.FieldTypes = FieldTypes;
FormGenerator.propTypes = {};

FormGenerator.defaultProps = {
  actionText: "Submit",
  fields: [],
};

export default FormGenerator;
