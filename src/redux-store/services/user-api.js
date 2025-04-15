import { apiSlice } from "../slices/api-slice";

const userApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUser: builder.query({
         query: ({ id }) => ({
            url: `/users/${id}`,
         }),
         providesTags: ["users"],
      }),
      getUserById: builder.query({
         query: ({ id }) => ({
            url: `/users/${id}`,
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
   }),
});

export const { useGetUserQuery, useRegisterUserMutation } = userApi;
