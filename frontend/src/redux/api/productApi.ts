import { ProductTS } from "@/types";
import { PRODUCT_END_POINT, UPLOAD_END_POINT } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductTS[], { keyword: string }>({
      query: ({ keyword }) => ({
        url: `${PRODUCT_END_POINT}/allProducts`,
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

    getProductByID: builder.query<ProductTS, string>({
      query: (productID: string) => ({
        url: `${PRODUCT_END_POINT}}/singleProduct/${productID}`,
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      keepUnusedDataFor: 5,
    }),

    getLimitedProducts: builder.query<ProductTS[], void>({
      query: () => ({
        url: `${PRODUCT_END_POINT}/limitedProducts`,
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getTopProducts: builder.query<ProductTS[], void>({
      query: () => ({
        url: `${PRODUCT_END_POINT}/topProducts`,
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      keepUnusedDataFor: 5,
    }),

    getNewProduct: builder.query<ProductTS, void>({
      query: () => ({
        url: `${PRODUCT_END_POINT}/newProducts`,
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      keepUnusedDataFor: 5,
    }),

    productReview: builder.mutation({
      query: (data: {
        productID: string;
        rating: string;
        comment: string;
      }) => ({
        url: `${PRODUCT_END_POINT}/productReview/${data.productID}/reviews`,
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
        url: `${PRODUCT_END_POINT}/addNewProduct`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          image: data.image,
          brand: data.brand,
          quantity: data.quantity,
          category: data.category,
          description: data.description,
          price: data.price,
          stock: data.stock,
        }),
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: (data: ProductTS) => ({
        url: `${PRODUCT_END_POINT}/updateProduct/${data.id}`,
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
        url: `${UPLOAD_END_POINT}`,
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (data: ProductTS) => ({
        url: `${PRODUCT_END_POINT}/deleteProduct/${data.id}`,
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
