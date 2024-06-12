import { ProductTS } from "../../types";
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
    getProductByID: builder.query({
      query: (productID: string) => ({
        url: `${process.env
          .REACT_APP_PRODUCT_POINT!}/singleProduct/${productID}`,
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getLimitedProducts: builder.query({
      query: () => ({
        url: `${process.env.REACT_APP_PRODUCT_POINT!}/limitedProducts`,
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${process.env.REACT_APP_PRODUCT_POINT!}/topProducts`,
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getNewProduct: builder.query({
      query: () => ({
        url: `${process.env.REACT_APP_PRODUCT_POINT!}/newProducts`,
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    productReview: builder.mutation({
      query: (data: {
        productID: string;
        rating: string;
        comment: string;
      }) => ({
        url: `${process.env.REACT_APP_PRODUCT_POINT!}/productReview/${
          data.productID
        }/reviews`,
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: data.rating, comment: data.comment }),
      }),
    }),
    addNewProduct: builder.mutation({
      query: (data: ProductTS) => ({
        url: `${process.env.REACT_APP_PRODUCT_POINT!}/addNewProduct`,
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),
    updateProduct: builder.mutation({
      query: (data: ProductTS) => ({
        url: `${process.env.REACT_APP_PRODUCT_POINT!}/updateProduct/${data.id}`,
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),
    uploadProductImage: builder.mutation({
      query: (data: FormData) => ({
        url: `${process.env.REACT_APP_UPLOAD_POINT!}`,
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (data: ProductTS) => ({
        url: `${process.env.REACT_APP_PRODUCT_POINT!}/deleteProduct/${data.id}`,
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIDQuery,
  useGetLimitedProductsQuery,
  useGetNewProductQuery,
  useGetTopProductsQuery,
  useAddNewProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useProductReviewMutation,
  useUploadProductImageMutation,
} = productApi;
