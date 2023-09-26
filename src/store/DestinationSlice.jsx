import { FireToast } from "@/lib/FireToast";
import axios from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Router from "next/router";

export const index = createAsyncThunk(
  "Destinations/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("admin/destinations", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const show = createAsyncThunk(
  "Restaurants/show",
  async (id, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get(`admin/destinations/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "Destinations/create",
  async (item, { rejectWithValue, dispatch }) => {
    const res = await axios.post("admin/destinations", item);
    return res.data;
  }
);

export const removeDestination = createAsyncThunk(
  "Destinations/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`admin/destinations/${id}`);
      dispatch(index());
      return { message: "success" };
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const update = createAsyncThunk(
  "Destinations/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`admin/destinations/${item.id}`, item);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  all: [],
  destination: {},
  loading: false,
  error: null,
  success: null,
};

const Destinationslice = createSlice({
  name: "Destinations",
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
        FireToast("success", "Destination Created Successfully");
        Router.push("/admin/destinations");
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeDestination.fulfilled, (state, action) => {
      FireToast("warning", "Destination Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      if (action.payload.status) {
        FireToast("success", "Destination Updated Successfully");
        Router.push("/admin/destinations");
        state.destination = {};
      }
      state.loading = false;
      state.error = null;
    });

    builder.addCase(show.fulfilled, (state, action) => {
      action.payload.data.image = null;
      state.destination = action.payload.data;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = Destinationslice.actions;
export default Destinationslice.reducer;
