import { combineReducers } from "redux";
import {
  doNothingReducer,
  reducerForAddingNewProduct,
  reducerForAddingNewShop,
  reducerForHoldingFormContent,
  reducerForSettingActiveShop,
  reducerForUpdatingCart,
} from "./reducers";

export default combineReducers({
  testStore: doNothingReducer,
  cart: reducerForUpdatingCart,
  form: reducerForHoldingFormContent,
  userShops: reducerForAddingNewShop,
  userProducts: reducerForAddingNewProduct,
  activeShop: reducerForSettingActiveShop,
});
