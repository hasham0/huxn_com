import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${process.env.REACT_APP_PRODUCT_POINT!}/allProducts`,
        method: "GET",
        params: { keyword },
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
