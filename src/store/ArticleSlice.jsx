import { FireToast } from "@/lib/FireToast";
import axios from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Router from "next/router";

export const index = createAsyncThunk(
  "articles/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("admin/articles", { params });
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
      const res = await axios.get(`admin/articles/${id}`);
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
      const res = await axios.post("admin/articles", item);
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
      const res = await axios.delete(`admin/articles/${id}`);
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
      const res = await axios.post(`admin/articles/${item.id}`, item);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  all: [],
  article: {},
  loading: false,
  error: null,
  success: null,
};

const ArticleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(index.fulfilled, (state, action) => {
      state.all = action.payload.data.data;
      state.count = action.payload.data.total;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      if (action.payload.status) {
        FireToast("success", "Article Created Successfully");
        Router.push("/admin/articles");
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeArticle.fulfilled, (state, action) => {
      FireToast("warning", "Article Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      if (action.payload.status) {
        FireToast("success", "Article Updated Successfully");
        Router.push("/admin/articles");
        state.article = {};
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(show.fulfilled, (state, action) => {
      if (action.payload.data && Array.isArray(action.payload.data.images)) {
        action.payload.data.image = null;
        action.payload.data.head_image = null;

        action.payload.data.images = action.payload.data.images.map(
          (imageObj) => ({
            ...imageObj,
            image: null,
          })
        );
      }

      state.article = action.payload.data;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = ArticleSlice.actions;
export default ArticleSlice.reducer;
