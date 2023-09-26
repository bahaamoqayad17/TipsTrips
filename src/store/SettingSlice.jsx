import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { FireToast } from "@/lib/FireToast";

export const updateSetting = createAsyncThunk(
  "update/settings",
  async (item) => {
    const res = await axios.post("admin/settings", item);
    return res;
  }
);

export const getSettings = createAsyncThunk(
  "show/settings",
  async (params, { dispatch }) => {
    dispatch(startLoading());
    const res = await axios.get("admin/settings");
    return res;
  }
);

const initialState = {
  setting: {},
  loading: false,
};

const SettingSlice = createSlice({
  name: "Settings",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateSetting.fulfilled, (state, action) => {
      FireToast("success", "Settings Updated Successfully");
    });
    builder.addCase(getSettings.fulfilled, (state, action) => {
      action.payload.data.image_web = null;
      action.payload.data.image_mobile = null;
      state.setting = action.payload.data;
      state.loading = false;
    });
  },
});

export const { startLoading } = SettingSlice.actions;
export default SettingSlice.reducer;
