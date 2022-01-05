export const ACTIONS = {
  UPDATE: "UPDATE",
  ADD_TO_FORM: "ADD_TO_FORM",
  ADD_TO_RESETORS: "ADD_TO_RESTORS",
};

export const FieldTypes = {
  RADIO: "RADIO",
  RADIOGROUP: "RADIOGROUP",
  CHECKBOXGROUP: "CHECKBOXGROUP",
  CHECKBOX: "CHECKBOX",
  INPUT: "TEXTBOX",
  TEXTAREA: "TEXTAREA",
  DROPDOWN: "DROPDOWN",
  MEDIAUPLOAD: "MEDIA_UPLOAD",
  AUTOCOMPLETE: "AUTOCOMPLETE",
};

export const formStateReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE:
      return { ...state, ...action.payload };
    case ACTIONS.ADD_TO_FORM:
      return { ...state, form: { ...state.form, ...action.payload } };
    case ACTIONS.ADD_TO_RESETORS:
      return { ...state, resetors: [...state.resetors, action.payload] };
    default:
      console.log(" am talking to the default");
      return state;
  }
};
