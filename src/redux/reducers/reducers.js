import { DO_NOTHING, UPDATE_CART } from "../ReduxConstants";

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
