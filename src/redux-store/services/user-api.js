import { apiSlice } from "../slices/api-slice";

const userApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUser: builder.query({
         query: ({ id }) => ({
            url: `/users/${id}`,
         }),
         providesTags: ["users"],
      }),
      getDashboardOverviewData: builder.query({
         query: ({ id }) => ({
            url: `/user/dashboard/overview/${id}`,
         }),
         providesTags: ["users"],
      }),
      getUserById: builder.query({
         query: ({ id }) => ({
            url: `/user/${id}`,
         }),
         providesTags: ["users"],
      }),
      registerUser: builder.mutation({
         query: (newUser) => ({
            url: `/auth/sign-up`,
            method: "POST",
            body: newUser,
         }),
         providesTags: ["users"],
      }),
      updateUser: builder.mutation({
         query: ({ id, formData }) => ({
            url: `/user/${id}`,
            method: "PUT",
            body: formData,
         }),
         invalidatesTags: ["users"],
      }),
   }),
});

export const {
   useGetUserQuery,
   useRegisterUserMutation,
   useGetUserByIdQuery,
   useGetDashboardOverviewDataQuery,
   useUpdateUserMutation,
} = userApi;
