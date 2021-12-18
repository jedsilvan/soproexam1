import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getLoginInformation } from "./loginAPI";

const initialState = {
  response: {},
  status: "idle",
};

export const name = (state) =>
  state.user.response?.name
    ? `${state.user.response.name} ${state.user.response.surname}`
    : "";

export const role = (state) =>
  state.user.response?.userName === "soproadmin" ? "admin" : "user";

export const isConfirmedEmail = (state) =>
  state.user.response?.isEmailConfirmed;

export const loginInfoAsync = createAsyncThunk(
  "login/info",
  async (props, { getState }) => {
    const state = getState();
    const response = await getLoginInformation(
      props || state.auth.response?.result?.accessToken
    );
    return response?.result?.user;
  }
);

export const loginInfoSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    loginInfoReset: (state) => {
      state.response = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginInfoAsync.fulfilled, (state, action) => {
        state.status = action.payload?.status || "idle";
        state.response = action.payload;
      });
  },
});

export const { loginInfoReset } = loginInfoSlice.actions;

export default loginInfoSlice.reducer;
