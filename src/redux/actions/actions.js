import { GET_MARKET_NEWS, GET_REGISTERED_USER, WHO_AM_I } from "../../api/urls";
import { checkAuthenticationState } from "../../firebase/config";
import InternetExplorer from "../../shared/classes/InternetExplorer";
import { LOADING } from "../reducers/reducers";
import {
  DO_NOTHING,
  UPDATE_CART,
  PUT_CONTENT_IN_FORM_HOLDER,
  ADD_NEW_SHOP,
  ADD_NEW_PRODUCT,
  SET_ACTIVE_SHOP,
  SET_FIREBASE_AUTH,
  SET_DONKOMI_AUTH,
  SET_MARKET_NEWS,
  SET_MARKET_NEWS_DETAILS,
  INSTANTIATE_EXPLORER,
} from "../ReduxConstants";

export const fetchMarketNews = (requestObj, cb) => {
  var body = {};
  if (requestObj) body = { ...body, ...requestObj };
  return async (dispatch, getState) => {
    var feed = getState().marketNews;
    feed = feed === LOADING ? [] : feed;
    try {
      const response = await InternetExplorer.roamAndFind(
        GET_MARKET_NEWS,
        "POST",
        body
      );
      if (!response.success) {
        console.log(
          "Sorry, something happened we could not load your news feed..."
        );
        if (cb) cb();
        return;
      }
      const data = response?.data || {};
      if (cb) cb(data);
      dispatch(reduxSetMarketNews([...feed, ...(response?.data?.feed || [])]));
      dispatch(
        reduxSetMarketDetails({
          count: data?.count,
          max: data?.max,
          min: data?.min,
        })
      );
    } catch (e) {
      if (cb) cb();
      console.log("NEWS_FETCH_ERROR : ", e?.toString());
    }
  };
};

export const setInternetExplorer = (exp) => {
  return { type: INSTANTIATE_EXPLORER, payload: exp };
};

export const reduxSetMarketDetails = (dets) => {
  return { type: SET_MARKET_NEWS_DETAILS, payload: dets };
};

export const reduxSetMarketNews = (news) => {
  return { type: SET_MARKET_NEWS, payload: news };
};

export const fetchAuthencationInformation = () => {
  return (dispatch) =>
    checkAuthenticationState((auth) => {
      if (!auth) return;
      dispatch(reduxSetFirebaseAUth(auth));
      InternetExplorer.roamAndFind(WHO_AM_I, "POST", {
        user_id: auth?.uid,
      }).then((response) => {
        if (!response?.success)
          return console.log(
            "Sorry, we could not retrieve your profile from our system!",
            response?.error?.message
          );
        const content = response.data;
        dispatch(setInternetExplorer(InternetExplorer.newInstance(auth?.uid)));
        dispatch(reduxSetDonkomiAuth(content.user));
        dispatch(reduxAddNewShop(content.shops));
        dispatch(reduxAddNewProduct(content.products));
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
