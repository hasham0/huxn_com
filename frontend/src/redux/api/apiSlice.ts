import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_PORT! }),
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
