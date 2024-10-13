import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store);
export { store, persistor };
