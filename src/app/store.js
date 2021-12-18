import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import loginReducer from "../features/login/loginSlice";
import loginInfoReducer from "../features/login/loginInfoSlice";
import bookmarkReducer from "../features/bookmark/bookmarkSlice";
import categoryReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: loginReducer,
    user: loginInfoReducer,
    bookmark: bookmarkReducer,
    category: categoryReducer,
  },
});
