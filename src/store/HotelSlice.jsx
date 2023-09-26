import { FireToast } from "@/lib/FireToast";
import axios from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Router from "next/router";

export const index = createAsyncThunk(
  "hotels/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("admin/hotels", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const indexHotels = createAsyncThunk(
  "hotels/indexHotels",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("admin/hotels", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const show = createAsyncThunk(
  "hotels/show",
  async (id, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get(`admin/hotels/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "hotels/create",
  async (item, { rejectWithValue, dispatch }) => {
    const res = await axios.post("admin/hotels", item);
    return res.data;
  }
);

export const removeHotel = createAsyncThunk(
  "hotels/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`admin/hotels/${id}`);
      dispatch(index());
      return { message: "success" };
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const update = createAsyncThunk(
  "hotels/update",
  async (item, { rejectWithValue, dispatch }) => {
    if (!item.image.startsWith("data:image")) {
      delete item.image;
    }
    const res = await axios.post(`admin/hotels/${item.id}`, item);
    return res.data;
  }
);

const initialState = {
  all: [],
  hotels: [],
  hotel: {},
  loading: false,
  error: null,
  success: null,
  count: 0,
};

const HotelSlice = createSlice({
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
    builder.addCase(create.fulfilled, (state, action) => {
      if (action.payload.status) {
        FireToast("success", "Hotel Created Successfully");
        Router.push("/admin/hotels");
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeHotel.fulfilled, (state, action) => {
      FireToast("warning", "Hotel Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      if (action.payload.status) {
        FireToast("success", "Hotel Updated Successfully");
        Router.push("/admin/hotels");
        state.hotel = {};
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(show.fulfilled, (state, action) => {
      action.payload.data.image = null;

      state.hotel = action.payload.data;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = HotelSlice.actions;
export default HotelSlice.reducer;
