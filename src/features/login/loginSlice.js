import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authenticate } from "./loginAPI";
import { getCookie, setCookie, removeCookie } from "../../helper/cookie";
import { loginInfoAsync } from "./loginInfoSlice";

const initialState = {
  response: { result: { accessToken: getCookie("token") } },
  status: "idle",
};
const cookieName = "token";

export const status = (state) => state.auth.status;
export const auth = (state) => state.auth.response;
export const isVerified = (state) => state.auth.isEmailVerified;
export const accessToken = (state) =>
  state.auth.response?.result?.accessToken || getCookie("token");

export const authenticateAsync = createAsyncThunk(
  "login/authenticate",
  async (props, { dispatch }) => {
    const response = await authenticate(props);

    if (response?.error) {
      return {
        status: "error",
        ...response.error,
      };
    } else {
      const { accessToken, expireInSeconds } = response?.result;
      setCookie(cookieName, accessToken, expireInSeconds);
      dispatch(loginInfoAsync(accessToken));
    }

    return response;
  }
);

export const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.response = {};
      removeCookie(cookieName);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenticateAsync.fulfilled, (state, action) => {
        state.status = action.payload.status || "idle";
        state.response = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
