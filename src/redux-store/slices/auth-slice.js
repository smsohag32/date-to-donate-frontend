import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { CookieManager } from "@/utils/helpers";
import { loginApi } from "../services/login-api";
import { socialLogin } from "../services/social_login";

const getPersistedToken = CookieManager.getCookie("access_token");
const getPersistedUser = JSON.parse(CookieManager.getCookie("user_info"));

const initialState = {
   token: getPersistedToken || null,
   user: getPersistedUser || null,
   isLoading: false,
   error: null,
};

export const loginUser = createAsyncThunk(
   "auth/loginUser",
   async ({ credentials = {}, isSocial = false }, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         if (isSocial) {
            const { email, uId, first_name, photoUrl } = credentials;
            const response = await socialLogin({
               email,
               uId,
               first_name,
               photoUrl,
            });
            return response?.data;
         }

         const response = await loginApi(credentials);
         return response?.data;
      } catch (error) {
         return rejectWithValue(error.message || "Login failed");
      }
   }
);

// Redux slice
const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      logoutUser: (state) => {
         state.token = null;
         state.user = null;
         CookieManager.deleteCookie("access_token");
         CookieManager.deleteCookie("user_info");
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            console.log("Login successful:", action.payload);
            const { token, user } = action.payload;
            state.isLoading = false;
            state.token = token;
            state.user = user;
            if (token) CookieManager.setCookie("access_token", token);
            if (user) CookieManager.setCookie("user_info", JSON.stringify(user));
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Login failed";
         });
   },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
