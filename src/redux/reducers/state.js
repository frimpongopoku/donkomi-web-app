import { combineReducers } from "redux";
import {
  doNothingReducer,
  reducerForAddingNewProduct,
  reducerForAddingNewShop,
  reducerForHoldingFormContent,
  reducerForSettingActiveShop,
  reducerForSettingDonkomiAuth,
  reducerForSettingFirebaseAuth,
  reducerForUpdatingCart,
} from "./reducers";

export default combineReducers({
  testStore: doNothingReducer,
  cart: reducerForUpdatingCart,
  form: reducerForHoldingFormContent,
  userShops: reducerForAddingNewShop,
  userProducts: reducerForAddingNewProduct,
  activeShop: reducerForSettingActiveShop,
  fireAuth: reducerForSettingFirebaseAuth,
  user: reducerForSettingDonkomiAuth,
});
