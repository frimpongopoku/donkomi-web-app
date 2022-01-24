import {
  DO_NOTHING,
  UPDATE_CART,
  PUT_CONTENT_IN_FORM_HOLDER,
  ADD_NEW_SHOP,
  ADD_NEW_PRODUCT,
  SET_ACTIVE_SHOP,
} from "../ReduxConstants";

export const testReduxAction = (someValue) => {
  return { type: DO_NOTHING, payload: someValue };
};

export const reduxUpdateFormHolder = (form) => {
  return { type: PUT_CONTENT_IN_FORM_HOLDER, payload: form };
};
export const reduxAddToShoppingBasket = (basket) => {
  return (dispatch) => {
    dispatch(reduxUpdateCart({ shop: basket }));
  };
};
export const reduxSetActiveShop = (shop = null) => {
  return { type: SET_ACTIVE_SHOP, payload: shop };
};
export const reduxUpdateCart = (cart = {}) => {
  return { type: UPDATE_CART, payload: cart };
};
export const reduxAddNewShop = (shops = []) => {
  return { type: ADD_NEW_SHOP, payload: shops };
};
export const reduxAddNewProduct = (products = []) => {
  return { type: ADD_NEW_PRODUCT, payload: products };
};
