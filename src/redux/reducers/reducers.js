import {
  DO_NOTHING,
  PUT_CONTENT_IN_FORM_HOLDER,
  UPDATE_CART,
} from "../ReduxConstants";

export const doNothingReducer = (state = [], action = {}) => {
  if (action.type === DO_NOTHING) {
    return action.payload;
  }
  return state;
};

export const reducerForUpdatingCart = (state = {}, action) => {
  if (action.type === UPDATE_CART) {
    return action.payload;
  }
  return state;
};
export const reducerForHoldingFormContent = (state = {}, action) => {
  if (action.type === PUT_CONTENT_IN_FORM_HOLDER) {
    return action.payload;
  }
  return state;
};
