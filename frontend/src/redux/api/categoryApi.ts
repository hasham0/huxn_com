import { CategoryTS } from "@/types";
import { CATEGORY_END_POINT } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allCategories: builder.query<{ message: string; data: CategoryTS[] }, void>(
      {
        query: () => ({
          url: `${CATEGORY_END_POINT}/allCategories`,
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
          mode: "cors",
          credentials: "include",
        }),
        keepUnusedDataFor: 5,
        providesTags: ["Category"],
      }
    ),

    createCategory: builder.mutation({
      query: (data: { name: string }) => ({
        url: `${CATEGORY_END_POINT}/newCategoryItem`,
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: data.name }),
      }),
    }),

    categoryByID: builder.query({
      query: (data: { _id: string }) => ({
        url: `${CATEGORY_END_POINT}/onlyCategory/${data._id}`,
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateCategory: builder.mutation({
      query: (data: { _id: string; name: string }) => ({
        url: `${CATEGORY_END_POINT}/updateCategoryItem/${data._id}`,
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newCategoryName: data.name }),
      }),
    }),

    deleteCategory: builder.mutation({
      query: (data: { _id: string }) => ({
        url: `${CATEGORY_END_POINT}/deleteCategoryItem/${data._id}`,
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
  useAllCategoriesQuery,
  useCreateCategoryMutation,
  useCategoryByIDQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
