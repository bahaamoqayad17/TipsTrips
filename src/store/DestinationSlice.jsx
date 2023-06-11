import { FireToast } from "@/lib/FireToast";
import axios from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Router from "next/router";

export const index = createAsyncThunk(
  "Destinations/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.post("Destinations", params);
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
      const res = await axios.get(`Destinations/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "Destinations/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("Destinations/Create", item);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const removeDestination = createAsyncThunk(
  "Destinations/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`Destinations/destroy/${id}`);
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
      const res = await axios.post(`Destinations/Update/${item.id}`, item);
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
      state.all = action.payload.destinations;
      state.count = action.payload.total;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      FireToast("success", "Destination Created Successfully");
      Router.push("/admin/destinations");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeDestination.fulfilled, (state, action) => {
      FireToast("warning", "Destination Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      FireToast("success", "Destination Updated Successfully");
      Router.push("/admin/destinations");
      state.loading = false;
      state.error = null;
    });

    builder.addCase(show.fulfilled, (state, action) => {
      state.one = action.payload.Destinations;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = Destinationslice.actions;
export default Destinationslice.reducer;
