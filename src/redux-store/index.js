import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux-store/slices/auth-slice";
import { apiSlice } from "./slices/api-slice";

// Configure the Redux store
const store = configureStore({
   reducer: {
      auth: authReducer,

      [apiSlice.reducerPath]: apiSlice.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
