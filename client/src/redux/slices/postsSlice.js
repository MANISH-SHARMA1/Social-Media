import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
// use redux thunk to do any async function reducers are pure functions.

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body, thunkAPI) => {
    try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/getUserProfile", body);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } 
    // finally {
    //   thunkAPI.dispatch(setLoading(false));
    // }
  }
);

export const likeAndUnlikePost = createAsyncThunk(
  "post/likeAndUnlike",
  async (body) => {
    try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/posts/like", body);
      return response.result.post;
    } catch (error) {
      return Promise.reject(error);
    } 
    // finally {
    //   thunkAPI.dispatch(setLoading(false));
    // }
  }
);

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    // isLoading: false,
    userProfile: {},
  },
  // reducers: {
  //   setLoading: (state, action) => {
  //     state.isLoading = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state?.userProfile?.posts?.indexOf((item) => item._id == post._id);
        console.log('like post', post, index);

        if (index != undefined && index != -1) {
          state.userProfile.posts[index] = post;
        }
      });
  },
});

export default postsSlice.reducer;

// export const { setLoading } = postsSlice.actions;
