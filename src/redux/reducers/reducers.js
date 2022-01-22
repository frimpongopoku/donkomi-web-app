import {
  ADD_NEW_PRODUCT,
  ADD_NEW_SHOP,
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
export const reducerForAddingNewShop = (state = [], action) => {
  if (action.type === ADD_NEW_SHOP) {
    return action.payload;
  }
  return state;
};
export const reducerForAddingNewProduct = (state = [], action) => {
  if (action.type === ADD_NEW_PRODUCT) {
    return action.payload;
  }
  return state;
};
