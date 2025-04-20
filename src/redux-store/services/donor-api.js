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
   }),
});

export const { useGetDonorsQuery } = donorApi;
