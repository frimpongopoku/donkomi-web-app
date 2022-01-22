import { combineReducers } from "redux";
import {
  doNothingReducer,
  reducerForAddingNewProduct,
  reducerForAddingNewShop,
  reducerForHoldingFormContent,
  reducerForUpdatingCart,
} from "./reducers";

export default combineReducers({
  testStore: doNothingReducer,
  cart: reducerForUpdatingCart,
  form: reducerForHoldingFormContent,
  userShops: reducerForAddingNewShop,
  userProducts: reducerForAddingNewProduct,
});
