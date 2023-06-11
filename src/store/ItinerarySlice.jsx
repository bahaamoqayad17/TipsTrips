import { FireToast } from "@/lib/FireToast";
import axios from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Router from "next/router";

export const index = createAsyncThunk(
  "Itineraries/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.post("Itineraries", params);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const show = createAsyncThunk(
  "Itineraries/show",
  async (id, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get(`Itineraries/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "Itineraries/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("Itineraries/Create", item);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const removeItinerary = createAsyncThunk(
  "Itineraries/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`Itineraries/destroy/${id}`);
      dispatch(index());
      return { message: "success" };
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const update = createAsyncThunk(
  "Itineraries/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`Itineraries/Update/${item.id}`, item);
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

const Itinerarieslice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(index.fulfilled, (state, action) => {
      state.all = action.payload.Itineraries;
      state.count = action.payload.total;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      FireToast("success", "Itinerary Created Successfully");
      Router.push("/admin/itineraries");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeItinerary.fulfilled, (state, action) => {
      FireToast("warning", "Itinerary Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      FireToast("success", "Itinerary Updated Successfully");
      Router.push("/admin/itineraries");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(show.fulfilled, (state, action) => {
      state.one = action.payload.Itinerarie;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = Itinerarieslice.actions;
export default Itinerarieslice.reducer;
