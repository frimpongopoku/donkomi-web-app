import { combineReducers } from "redux";
import {
  doNothingReducer,
  reducerForHoldingFormContent,
  reducerForUpdatingCart,
} from "./reducers";

export default combineReducers({
  testStore: doNothingReducer,
  cart: reducerForUpdatingCart,
  form: reducerForHoldingFormContent,
});
