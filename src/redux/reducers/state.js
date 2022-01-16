import { combineReducers } from "redux";
import { doNothingReducer, reducerForUpdatingCart } from "./reducers";

export default combineReducers({
  testStore: doNothingReducer,
  cart: reducerForUpdatingCart,
});
