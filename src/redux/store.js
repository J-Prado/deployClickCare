import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer.js";
import thunk from "redux-thunk";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import expireIn from "redux-persist-transform-expire-in";

// const expirIn = 3 * 60 * 60 * 1000;
// const expirationKey = "expirationKey";
// const persistConfig = {
//   key: "v1",
//   storage,
//   whitelist: ["userSession", "message"],
//   transforms: [expireIn(expirIn, expirationKey, [])],
// };
// const pReducer = persistReducer(persistConfig, reducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
// export const persistor = persistStore(store);
export default store;
