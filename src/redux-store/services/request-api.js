import { apiSlice } from "../slices/api-slice";

const requestApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      requestSend: builder.mutation({
         query: (request) => ({
            url: `/request/new`,
            method: "POST",
            body: request,
         }),
         invalidatesTags: ["request"],
      }),
   }),
});

export const { useRequestSendMutation } = requestApi;
