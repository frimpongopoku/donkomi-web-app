import { DO_NOTHING, UPDATE_CART, PUT_CONTENT_IN_FORM_HOLDER } from "../ReduxConstants";

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
export const reduxUpdateCart = (cart = {}) => {
  return { type: UPDATE_CART, payload: cart };
};
