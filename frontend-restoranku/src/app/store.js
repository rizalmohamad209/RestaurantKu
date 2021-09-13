import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import productReducer from "../features/Products/reducer";
import cartsReducer from "../features/Carts/reducer";
import authReducer from "../features/Auth/reducer";

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  products: productReducer,
  carts: cartsReducer,
  auth: authReducer,
});
const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);
export default store;
