import { FireToast } from "@/lib/FireToast";
import axios from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Router from "next/router";

export const index = createAsyncThunk(
  "articles/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.post("Articles", params);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const show = createAsyncThunk(
  "articles/show",
  async (id, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get(`Articles/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "articles/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("Articles/Create", item);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const removeArticle = createAsyncThunk(
  "articles/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`Articles/destroy/${id}`);
      dispatch(index());
      return { message: "success" };
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const update = createAsyncThunk(
  "articles/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`Articles/Update/${item.id}`, item);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  all: [],
  one: {},
  loading: false,
  error: null,
  success: null,
};

const ArticleSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(index.fulfilled, (state, action) => {
      state.all = action.payload.articles;
      state.count = action.payload.total;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      FireToast("success", "Article Created Successfully");
      Router.push("/admin/articles");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeArticle.fulfilled, (state, action) => {
      FireToast("warning", "Article Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      FireToast("success", "Article Updated Successfully");
      Router.push("/admin/articles");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(show.fulfilled, (state, action) => {
      state.one = action.payload.Article;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = ArticleSlice.actions;
export default ArticleSlice.reducer;
