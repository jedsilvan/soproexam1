import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchBookmarks,
  createBookmark,
  deleteBookmark,
  updateBookmark,
} from "./bookmarkAPI";

const initialState = {
  items: [],
  totalCount: 0,
  status: "idle",
};

export const bookmarkList = (state) => state.bookmark.items;
export const bookmarkTotal = (state) => state.bookmark.totalCount;
export const bookmarkStatus = (state) => state.bookmark.status;

export const fetchBookmarkAsync = createAsyncThunk(
  "bookmarks/list",
  async (props, { getState }) => {
    const state = getState();
    const response = await fetchBookmarks(
      state.auth.response?.result?.accessToken
    );
    return response;
  }
);

export const createBookmarkAsync = createAsyncThunk(
  "bookmarks/create",
  async (props, { getState, dispatch }) => {
    const state = getState();
    const create = await createBookmark(
      props,
      state.auth.response?.result?.accessToken
    );
    dispatch(fetchBookmarkAsync());
    return create;
  }
);

export const updateBookmarkAsync = createAsyncThunk(
  "bookmarks/update",
  async (props, { getState, dispatch }) => {
    const state = getState();
    const params = {
      ...state.bookmark.items.find((i) => i.id === props.id),
      ...props,
      category: state.category.items.find((i) => i.id === props.categoryId),
    };

    const update = await updateBookmark(
      params,
      state.auth.response?.result?.accessToken
    );
    dispatch(fetchBookmarkAsync());
    return update;
  }
);

export const deleteBookmarkAsync = createAsyncThunk(
  "bookmarks/delete",
  async (props, { getState, dispatch }) => {
    const state = getState();
    const create = await deleteBookmark(
      props,
      state.auth.response?.result?.accessToken
    );
    dispatch(fetchBookmarkAsync());
    return create;
  }
);

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    bookmarkReset: (state) => {
      state = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarkAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookmarkAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload?.result?.items;
        state.totalCount = action.payload?.result?.totalCount;
      });
  },
});

export const { bookmarkReset } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
