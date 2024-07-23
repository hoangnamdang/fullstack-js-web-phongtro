import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import postReducer from "./postReducer";
import filterReducer from "./filterReducer";
import provinceReducer from "./provinceReducer";

const persistConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const authPersistReducer = {
  ...persistConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistReducer, authReducer),
  user: userReducer,
  app: appReducer,
  post: postReducer,
  filter: filterReducer,
  province: provinceReducer,
});

export default rootReducer;
