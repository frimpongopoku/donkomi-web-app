import {
  ADD_NEW_PRODUCT,
  ADD_NEW_SHOP,
  DO_NOTHING,
  INSTANTIATE_EXPLORER,
  PUT_CONTENT_IN_FORM_HOLDER,
  SET_ACTIVE_SHOP,
  SET_DONKOMI_AUTH,
  SET_FIREBASE_AUTH,
  SET_MARKET_NEWS,
  SET_MARKET_NEWS_DETAILS,
  UPDATE_CART,
} from "../ReduxConstants";

export const LOADING = "LOADING";

export const reducerForInternetExplorer = (state = null, action = {}) => {
  if (action.type === INSTANTIATE_EXPLORER) {
    return action.payload;
  }
  return state;
};
export const reducerForMarketDetails = (state = {}, action = {}) => {
  if (action.type === SET_MARKET_NEWS_DETAILS) {
    return action.payload;
  }
  return state;
};
export const reducerForMarketNews = (state = LOADING, action = {}) => {
  if (action.type === SET_MARKET_NEWS) {
    return action.payload;
  }
  return state;
};
export const doNothingReducer = (state = [], action = {}) => {
  if (action.type === DO_NOTHING) {
    return action.payload;
  }
  return state;
};

export const reducerForSettingFirebaseAuth = (state = null, action) => {
  if (action.type === SET_FIREBASE_AUTH) {
    return action.payload;
  }
  return state;
};
export const reducerForSettingDonkomiAuth = (state = null, action) => {
  if (action.type === SET_DONKOMI_AUTH) {
    return action.payload;
  }
  return state;
};
export const reducerForSettingActiveShop = (state = {}, action) => {
  if (action.type === SET_ACTIVE_SHOP) {
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
