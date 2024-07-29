import { LoginTS, RegisterTS, UserProfileTS } from "../../types";
import { USER_END_POINT } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterTS) => ({
        url: `${USER_END_POINT}/registerUser`,
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),

    userProfile: builder.query({
      query: () => ({
        url: `${USER_END_POINT}/auth/profile`,
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateProfile: builder.mutation({
      query: (data: UserProfileTS) => ({
        url: `${USER_END_POINT}/auth/updateProfile`,
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),

    login: builder.mutation({
      query: (data: LoginTS) => ({
        url: `${USER_END_POINT}/auth/loginUser`,
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USER_END_POINT}/auth/logoutUser`,
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),

    userDelete: builder.mutation({
      query: () => ({
        url: `${USER_END_POINT}/auth/deleteUser`,
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    allUsers: builder.query({
      query: () => ({
        url: `${USER_END_POINT}/allUsers`,
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    getUserProfileBYID: builder.query({
      query: (userId) => ({
        url: `${USER_END_POINT}/userDetails/${userId}`,
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateProfileByID: builder.mutation({
      query: (data: { _id: string; username: string; email: string }) => ({
        url: `${USER_END_POINT}/updateProfile/${data._id}`,
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username: data.username, email: data.email }),
      }),
    }),

    updateRoleByID: builder.mutation({
      query: (data: { _id: string; isAdmin: Boolean }) => ({
        url: `${USER_END_POINT}/updateRole/${data._id}`,
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isAdmin: data.isAdmin }),
      }),
    }),

    deleteUserBYID: builder.mutation({
      query: (userId) => ({
        url: `${USER_END_POINT}/userDelete/${userId}`,
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAllUsersQuery,
  useDeleteUserBYIDMutation,
  useGetUserProfileBYIDQuery,
  useLoginMutation,
  useLogoutMutation,
  useUserProfileQuery,
  useRegisterMutation,
  useUpdateRoleByIDMutation,
  useUserDeleteMutation,
  useUpdateProfileMutation,
  useUpdateProfileByIDMutation,
} = userApi;
