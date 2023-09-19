import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { FireToast } from "@/lib/FireToast";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("admin/countries", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAllCountries = createAsyncThunk(
  "countries/fetchAllCountries",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("admin/countries/all", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCountry = createAsyncThunk(
  "countries/createCountry",
  async (item, { rejectWithValue, dispatch }) => {
    const res = await axios.post("admin/countries", item);
    dispatch(fetchCountries());
    return res.data;
  }
);

export const getCountry = createAsyncThunk(
  "countries/getCountry",
  async (id, { rejectWithValue, dispatch }) => {
    const res = await axios.get(`admin/countries/${id}`);
    return res.data;
  }
);

export const updateCountry = createAsyncThunk(
  "countries/updateCountry",
  async (item, { rejectWithValue, dispatch }) => {
    const res = await axios.post(`admin/countries/${item.id}`, item);
    dispatch(fetchCountries());
    return res.data;
  }
);

export const deleteCountry = createAsyncThunk(
  "countries/deleteCountry",
  async (id, { rejectWithValue, dispatch }) => {
    const res = await axios.delete(`admin/countries/${id}`);
    dispatch(fetchCountries());
    return res.data;
  }
);

export const fetchCountriesAndCites = createAsyncThunk(
  "countries/fetchCountriesAndCites",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("admin/countries/index/cities", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  countries: [],
  cities: [],
  country: {},
  loading: false,
  error: null,
  count: 0,
};
const CountrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload.data.data;
      state.count = action.payload.data.total;
      state.loading = false;
    });
    builder.addCase(getCountry.fulfilled, (state, action) => {
      state.country = action.payload.data;
      state.loading = false;
    });
    builder.addCase(fetchAllCountries.fulfilled, (state, action) => {
      state.countries = action.payload.data;
      state.loading = false;
    });
    builder.addCase(fetchCountriesAndCites.fulfilled, (state, action) => {
      state.loading = true;
      state.countries = action.payload.data;
    });
    builder.addCase(addCountry.fulfilled, (state, action) => {
      FireToast("success", "Country Added Successfully");
      state.loading = false;
    });
    builder.addCase(updateCountry.fulfilled, (state, action) => {
      FireToast("success", "Country Updated Successfully");
      state.loading = false;
    });
    builder.addCase(deleteCountry.fulfilled, (state, action) => {
      FireToast("warning", "Country Deleted Successfully");
      state.loading = false;
    });
  },
});

export const { startLoading } = CountrySlice.actions;
export default CountrySlice.reducer;
