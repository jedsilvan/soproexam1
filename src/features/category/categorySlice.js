import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "./categoryAPI";

const initialState = {
  items: [],
  totalCount: 0,
  status: "idle",
};

export const categoryList = (state) => state.category.items;
export const categoryTotal = (state) => state.category.totalCount;
export const categoryStatus = (state) => state.category.status;

export const fetchCategoryAsync = createAsyncThunk(
  "category/list",
  async (props, { getState }) => {
    const state = getState();
    const response = await fetchCategories(
      state.auth.response?.result?.accessToken
    );
    return response;
  }
);

export const createCategoryAsync = createAsyncThunk(
  "bookmarks/create",
  async (props, { getState, dispatch }) => {
    const state = getState();
    const create = await createCategory(
      props,
      state.auth.response?.result?.accessToken
    );
    dispatch(fetchCategoryAsync());
    return create;
  }
);

export const updateCategoryAsync = createAsyncThunk(
  "bookmarks/update",
  async (props, { getState, dispatch }) => {
    const state = getState();
    const params = {
      ...state.category.items.find((i) => i.id === props.id),
      ...props,
    };

    const update = await updateCategory(
      params,
      state.auth.response?.result?.accessToken
    );
    dispatch(fetchCategoryAsync());
    return update;
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "bookmarks/delete",
  async (props, { getState, dispatch }) => {
    const state = getState();
    const create = await deleteCategory(
      props,
      state.auth.response?.result?.accessToken
    );
    dispatch(fetchCategoryAsync());
    return create;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryReset: (state) => {
      state = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload?.result?.items;
        state.totalCount = action.payload?.result?.totalCount;
      });
  },
});

export const { categoryReset } = categorySlice.actions;

export default categorySlice.reducer;
