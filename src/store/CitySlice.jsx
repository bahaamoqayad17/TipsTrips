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
    dispatch(fetchCities());

    const res = await axios.post("admin/cities", item);
    return res.data;
  }
);

export const updateCity = createAsyncThunk(
  "cities/updateCity",
  async (item, { rejectWithValue, dispatch }) => {
    dispatch(fetchCities());

    const res = await axios.post(`admin/cities/${item.id}`, item);
    return res.data;
  }
);

export const deleteCity = createAsyncThunk(
  "cities/deleteCity",
  async (id, { rejectWithValue, dispatch }) => {
    dispatch(fetchCities());
    const res = await axios.delete(`admin/cities/${id}`);
    return res.data;
  }
);

const initialState = {
  cities: [],
  cities: [],
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
    builder.addCase(addCity.fulfilled, (state, action) => {
      FireToast("success", "City Added Successfully");
      state.loading = false;
    });
    builder.addCase(updateCity.fulfilled, (state, action) => {
      FireToast("success", "City Updated Successfully");
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
