import { FireToast } from "@/lib/FireToast";
import axios from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const index = createAsyncThunk(
  "Restaurants/index",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.post("Restaurants", params);
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
      const res = await axios.get(`Restaurants/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create = createAsyncThunk(
  "Restaurants/create",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("Restaurants/Create", item);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const removeRestaurant = createAsyncThunk(
  "Restaurants/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`Restaurants/destroy/${id}`);
      dispatch(index());
      return { message: "success" };
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

export const update = createAsyncThunk(
  "Restaurants/update",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(`Restaurants/Update/${item.id}`, item);
      return res.data;
    } catch (error) {
      FireToast("error", error.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  all: [],
  restaurants: [],
  one: {},
  loading: false,
  error: null,
  success: null,
};

const Restaurantslice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(index.fulfilled, (state, action) => {
      state.all = action.payload.restaurants;
      state.restaurants = action.payload.restaurants;
      state.count = action.payload.total;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      FireToast("success", "Restaurant Created Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeRestaurant.fulfilled, (state, action) => {
      FireToast("warning", "Restaurant Deleted Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      FireToast("success", "Restaurant Updated Successfully");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(show.fulfilled, (state, action) => {
      state.one = action.payload.Restaurants;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = Restaurantslice.actions;
export default Restaurantslice.reducer;
