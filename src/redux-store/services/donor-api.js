import { apiSlice } from "../slices/api-slice";

const donorApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getDonors: builder.query({
         query: ({ page, limit, blood_group, searchText }) => ({
            url: `/donors`,
            params: {
               page: page || 1,
               limit: limit || 10,
               blood_group: blood_group || "",
               searchText: searchText || "",
            },
         }),
         providesTags: ["donors"],
      }),
      bulkUploadDonor: builder.mutation({
         query: ({ formData }) => ({
            url: `/user/onboard-users-from-excel`,
            method: "POST",
            body: formData,
         }),
         invalidatesTags: ["donors"],
      }),
   }),
});

export const { useGetDonorsQuery, useBulkUploadDonorMutation } = donorApi;
