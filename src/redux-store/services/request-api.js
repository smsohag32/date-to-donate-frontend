// services/requestApi.ts
import { apiSlice } from "../slices/api-slice";

const requestApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      // Create new request
      requestSend: builder.mutation({
         query: (request) => ({
            url: `/request/new`,
            method: "POST",
            body: request,
         }),
         invalidatesTags: ["request"],
      }),

      // Get requests by donor ID
      getRequestsByDonor: builder.query({
         query: (donorId) => `/request/donor/${donorId}`,
         providesTags: ["request"],
      }),

      // Get requests sent by user
      getRequestsByUser: builder.query({
         query: (userId) => `/request/user/${userId}`,
         providesTags: ["request"],
      }),

      // Change status
      changeRequestStatus: builder.mutation({
         query: (data) => ({
            url: `/request/status`,
            method: "PATCH",
            body: data,
         }),
         invalidatesTags: ["request"],
      }),

      // Update request
      updateRequest: builder.mutation({
         query: ({ id, ...body }) => ({
            url: `/request/${id}`,
            method: "PUT",
            body,
         }),
         invalidatesTags: ["request"],
      }),

      // Delete request
      deleteRequest: builder.mutation({
         query: (id) => ({
            url: `/request/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: ["request"],
      }),
   }),
});

export const {
   useRequestSendMutation,
   useGetRequestsByDonorQuery,
   useGetRequestsByUserQuery,
   useChangeRequestStatusMutation,
   useUpdateRequestMutation,
   useDeleteRequestMutation,
} = requestApi;
