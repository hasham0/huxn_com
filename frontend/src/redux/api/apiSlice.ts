import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_PORT!,
    credentials: "include",
    mode: "cors",
    // prepareHeaders: (headers, { getState }) => {
    //   headers.set("Authorization", `Bearer ${document.cookie[0].split("=")}`);
    //   headers.set("Content-Type", "application/json");
    //   headers.set("Accept", "application/json");
    //   return headers;
    // },
  }),
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
