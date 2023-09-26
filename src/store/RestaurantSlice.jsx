import { FireToast } from "@/lib/FireToast";
import axios from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Router from "next/router";

export const index = createAsyncThunk(
  "Restaurants/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());

    const res = await axios.get("admin/restaurants", { params });
    return res.data;
  }
);

export const show = createAsyncThunk(
  "restaurants/show",
  async (id, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get(`admin/restaurants/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "restaurants/create",
  async (item, { rejectWithValue, dispatch }) => {
    const res = await axios.post("admin/restaurants", item);
    return res.data;
  }
);

export const removeRestaurant = createAsyncThunk(
  "restaurants/delete",
  async (id, { rejectWithValue, dispatch }) => {
    const res = await axios.delete(`admin/restaurants/${id}`);
    dispatch(index());
    return { message: "success" };
  }
);

export const update = createAsyncThunk(
  "restaurants/update",
  async (item, { rejectWithValue, dispatch }) => {
    const res = await axios.post(`admin/restaurants/${item.id}`, item);
    return res.data;
  }
);

const initialState = {
  all: [],
  restaurants: [],
  restaurant: {},
  loading: false,
  error: null,
  success: null,
};

const RestaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(index.fulfilled, (state, action) => {
      state.all = action.payload.data.data;
      state.restaurants = action.payload.data.data;
      state.count = action.payload.data.total;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      if (action.payload.status) {
        FireToast("success", "Restaurant Created Successfully");
        Router.push("/admin/restaurants");
        state.restaurant = {};
      }
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeRestaurant.fulfilled, (state, action) => {
      FireToast("warning", "Restaurant Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      if (action.payload.status) {
        FireToast("success", "Restaurant Updated Successfully");
        Router.push("/admin/restaurants");
        state.restaurant = {};
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
      state.restaurant = action.payload.data;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = RestaurantSlice.actions;
export default RestaurantSlice.reducer;
