import { FireToast } from "@/lib/FireToast";
import axios from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Router from "next/router";

export const index = createAsyncThunk(
  "properties/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("admin/attractions", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const indexProperties = createAsyncThunk(
  "properties/indexProperties",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get("admin/attractions", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const show = createAsyncThunk(
  "properties/show",
  async (id, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get(`admin/attractions/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "properties/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("admin/attractions", item);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const removeProperty = createAsyncThunk(
  "properties/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`admin/attractions/${id}`);
      dispatch(index());
      return { message: "success" };
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const update = createAsyncThunk(
  "properties/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`admin/attractions/${item.id}`, item);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  all: [],
  property: {},
  loading: false,
  error: null,
  success: null,
};

const PropertieSlice = createSlice({
  name: "hotels",
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
    builder.addCase(indexProperties.fulfilled, (state, action) => {
      state.all = action.payload.Properties;
      state.count = action.payload.total;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      if (action.payload.status) {
        FireToast("success", "Property Created Successfully");
        Router.push("/admin/properties");
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeProperty.fulfilled, (state, action) => {
      FireToast("warning", "Property Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      if (action.payload.status) {
        FireToast("success", "Property Updated Successfully");
        Router.push("/admin/properties");
        state.property = {};
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(show.fulfilled, (state, action) => {
      if (action.payload.data && Array.isArray(action.payload.data.images)) {
        action.payload.data.image = null;

        action.payload.data.images = action.payload.data.images.map(
          (imageObj) => ({
            ...imageObj,
            image: null,
          })
        );
      }

      state.property = action.payload.data;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = PropertieSlice.actions;
export default PropertieSlice.reducer;
