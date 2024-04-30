import { LoginTS } from "../../types";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data:LoginTS) => ({
        url: `${process.env.REACT_APP_USER_POINT!}/auth/loginUser`,
        method: "POST",
        mode:"cors",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${process.env.REACT_APP_USER_POINT!}/auth/logoutUser`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = userApi;
