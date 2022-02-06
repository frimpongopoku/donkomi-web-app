import { combineReducers } from "redux";
import {
  doNothingReducer,
  reducerForAddingNewProduct,
  reducerForAddingNewShop,
  reducerForHoldingFormContent,
  reducerForInternetExplorer,
  reducerForItemFullView,
  reducerForMarketDetails,
  reducerForMarketNews,
  reducerForSettingActiveShop,
  reducerForSettingDonkomiAuth,
  reducerForSettingFirebaseAuth,
  reducerForUpdatingCart,
} from "./reducers";

export default combineReducers({
  explorer: reducerForInternetExplorer, // The internet explorer API object instatiated with the authenticated user ID
  testStore: doNothingReducer,
  cart: reducerForUpdatingCart,
  form: reducerForHoldingFormContent,
  userShops: reducerForAddingNewShop,
  userProducts: reducerForAddingNewProduct,
  activeShop: reducerForSettingActiveShop,
  fireAuth: reducerForSettingFirebaseAuth,
  user: reducerForSettingDonkomiAuth,
  marketNews: reducerForMarketNews, // contains news items for market place ( array)
  marketDetails: reducerForMarketDetails, // contains response details for the last market news response // (obj)
  itemInView: reducerForItemFullView
});
