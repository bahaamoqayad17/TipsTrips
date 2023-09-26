import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { FireToast } from "@/lib/FireToast";

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("admin/cities", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCity = createAsyncThunk(
  "cities/createCity",
  async (item, { rejectWithValue, dispatch }) => {
    const res = await axios.post("admin/cities", item);
    dispatch(fetchCities());
    return res.data;
  }
);

export const updateCity = createAsyncThunk(
  "cities/updateCity",
  async (item, { rejectWithValue, dispatch }) => {
    const res = await axios.post(`admin/cities/${item.id}`, item);
    dispatch(fetchCities());
    return res.data;
  }
);

export const deleteCity = createAsyncThunk(
  "cities/deleteCity",
  async (id, { rejectWithValue, dispatch }) => {
    const res = await axios.delete(`admin/cities/${id}`);
    dispatch(fetchCities());
    return res.data;
  }
);

export const getCity = createAsyncThunk(
  "cities/getCity",
  async (id, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    const res = await axios.get(`admin/cities/${id}`);
    return res.data;
  }
);

const initialState = {
  cities: [],
  city: {},
  loading: false,
  error: null,
  count: 0,
};
const CitySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cities = action.payload.data.data;
      state.count = action.payload.data.total;
      state.loading = false;
    });
    builder.addCase(getCity.fulfilled, (state, action) => {
      state.city = action.payload.data;
      state.loading = false;
    });
    builder.addCase(addCity.fulfilled, (state, action) => {
      if (action.payload.status) {
        FireToast("success", "City Added Successfully");
      }
      state.loading = false;
    });
    builder.addCase(updateCity.fulfilled, (state, action) => {
      if (action.payload.status) {
        FireToast("success", "City Updated Successfully");
        state.city = {};
      }
      state.loading = false;
    });
    builder.addCase(deleteCity.fulfilled, (state, action) => {
      FireToast("warning", "City Deleted Successfully");
      state.loading = false;
    });
  },
});

export const { startLoading } = CitySlice.actions;
export default CitySlice.reducer;
