import { FireToast } from "@/lib/FireToast";
import axios from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const index = createAsyncThunk(
  "hotels/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.post("Hotels", params);
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
      const res = await axios.post("Hotels", params);
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
      const res = await axios.get(`Hotels/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "hotels/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("Hotels/Create", item);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const removeHotel = createAsyncThunk(
  "hotels/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`Hotels/destroy/${id}`);
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
  async ({ formData, id }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`Hotels/Update/${id}`, formData);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  all: [],
  hotels: [],
  one: {},
  loading: false,
  error: null,
  success: null,
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
      state.all = action.payload.hotels;
      state.count = action.payload.total;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      FireToast("success", "Hotel Created Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeHotel.fulfilled, (state, action) => {
      FireToast("warning", "Hotel Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      FireToast("success", "Hotel Updated Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(indexHotels.fulfilled, (state, action) => {
      state.hotels = action.payload.hotels;
      state.count = action.payload.total;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(show.fulfilled, (state, action) => {
      state.one = action.payload.Hotels;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = HotelSlice.actions;
export default HotelSlice.reducer;
