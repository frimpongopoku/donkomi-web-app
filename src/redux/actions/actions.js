import { GET_REGISTERED_USER } from "../../api/urls";
import { checkAuthenticationState } from "../../firebase/config";
import InternetExplorer from "../../shared/classes/InternetExplorer";
import {
  DO_NOTHING,
  UPDATE_CART,
  PUT_CONTENT_IN_FORM_HOLDER,
  ADD_NEW_SHOP,
  ADD_NEW_PRODUCT,
  SET_ACTIVE_SHOP,
  SET_FIREBASE_AUTH,
  SET_DONKOMI_AUTH,
} from "../ReduxConstants";

export const fetchAuthencationInformation = () => {
  return (dispatch) =>
    checkAuthenticationState((auth) => {
      console.log("I am the auth what are you saying", auth);
      if (!auth) return;
      dispatch(reduxSetFirebaseAUth(auth));
      InternetExplorer.roamAndFind(GET_REGISTERED_USER, "POST", {
        user_id: auth?.uid,
      }).then((response) => {
        if (!response?.success)
          return console.log(
            "Sorry, we could not retrieve your profile from our system!",
            response?.error?.message
          );
        dispatch(reduxSetDonkomiAuth(response?.data));
      });
    });
};

export const testReduxAction = (someValue) => {
  return { type: DO_NOTHING, payload: someValue };
};

export const reduxSetFirebaseAUth = (data) => {
  return { type: SET_FIREBASE_AUTH, payload: data };
};
export const reduxSetDonkomiAuth = (data) => {
  return { type: SET_DONKOMI_AUTH, payload: data };
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
