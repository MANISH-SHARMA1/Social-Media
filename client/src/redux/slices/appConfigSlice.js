import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
// use redux thunk to do any async function reducers are pure functions.

export const getMyInfo = createAsyncThunk(
  "user/getMyInfo",
  // async (_, thunkAPI) => {
  async () => {
    try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getMyInfo");
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
    // finally {
    //   thunkAPI.dispatch(setLoading(false));
    // }
  }
);

export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async (body) => {
    try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.put("/user/", body);
      // console.log('result from response', response.result);
      return response.result;
    } catch (error) {
      console.log("error", error);
      return Promise.reject(error);
    }
    // finally {
    //   thunkAPI.dispatch(setLoading(false));
    // }
  }
);

const appConfigSlice = createSlice({
  name: "appCongfigSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      });
  },
});

export default appConfigSlice.reducer;

export const { setLoading, showToast } = appConfigSlice.actions;
