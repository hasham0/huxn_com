import { LoginTS } from "../../types";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: LoginTS) => ({
        url: `${process.env.REACT_APP_USER_POINT!}/registerUser`,
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
        url: `${process.env.REACT_APP_USER_POINT!}/auth/profile`,
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    login: builder.mutation({
      query: (data: LoginTS) => ({
        url: `${process.env.REACT_APP_USER_POINT!}/auth/loginUser`,
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
        url: `${process.env.REACT_APP_USER_POINT!}/auth/logoutUser`,
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
    userDelete: builder.query({
      query: () => ({
        url: `${process.env.REACT_APP_USER_POINT!}/auth/deleteUser`,
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("userToken")!),
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUserProfileQuery,
  useUserDeleteQuery,
} = userApi;
