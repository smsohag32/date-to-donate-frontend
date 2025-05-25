import { CookieManager } from "@/utils/helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutUser } from "./auth-slice";

const baseQueryWithAuth = async (args, api, extraOptions) => {
   const baseQuery = fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1`,
      prepareHeaders: (headers) => {
         const token = CookieManager.getCookie("access_token");
         if (token) {
            headers.set("Authorization", `Bearer ${token}`);
         }
         return headers;
      },
   });

   let result = await baseQuery(args, api, extraOptions);
   if (
      result.error &&
      (result.error.status === 401 || result.error.status === 403 || result.error.status === 404)
   ) {
      window.location.href = "/auth/login";
      api.dispatch(logoutUser());
   }

   return result;
};

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: baseQueryWithAuth,
   tagTypes: ["users", "donors", "request"],
   endpoints: () => ({}),
});
