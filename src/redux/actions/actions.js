import { DO_NOTHING, UPDATE_CART } from "../ReduxConstants";

export const testReduxAction = (someValue) => {
  return { type: DO_NOTHING, payload: someValue };
};

export const reduxAddToShoppingBasket = (basket) => {
  return (dispatch) => {
    dispatch(reduxUpdateCart({ shop: basket }));
  };
};
export const reduxUpdateCart = (cart = {}) => {
  return { type: UPDATE_CART, payload: cart };
};
