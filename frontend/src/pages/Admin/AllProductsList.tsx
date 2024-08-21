import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import AdminMenu from "./AdminMenu";
import { useGetLimitedProductsQuery } from "../../redux/api/productApi";
import Loader from "../../components/Loader";
import { ProductTS } from "../../types";

type Props = {};

export default function AllProductsList({}: Props) {
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetLimitedProductsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!products) {
      return;
    }
    refetch();
  }, [products, refetch]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />;
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Error while loading products....</div>;
      </div>
    );
  }

  return (
    <>
      <div className="container mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="p-3">
            <div className="ml-[2rem] h-12 text-xl font-bold">
              All Products ({products?.data.length})
            </div>
            <div className="flex flex-wrap items-center justify-around">
              {products?.data.map((product: ProductTS, index: number) => (
                <Link
                  key={index}
                  to={`/admin/productUpdate/${product._id}`}
                  className="mb-4 block overflow-hidden"
                >
                  <div className="flex">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[10rem] object-cover"
                    />
                    <div className="flex flex-col justify-around p-4">
                      <div className="flex justify-between">
                        <h5 className="mb-2 text-xl font-semibold">
                          {product?.name}
                        </h5>

                        <p className="text-xs text-gray-400">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="mb-4 text-sm text-gray-400 sm:w-[10rem] md:w-[20rem] lg:w-[30rem] xl:w-[30rem]">
                        {product?.description?.substring(0, 160)}...
                      </p>

                      <div className="flex justify-between">
                        <button
                          onClick={() =>
                            navigate(`/admin/productUpdate/${product._id}`)
                          }
                          className="inline-flex items-center rounded-lg bg-pink-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        >
                          Update Product
                          <svg
                            className="ml-2 h-3.5 w-3.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </button>
                        <p>$ {product?.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-2 p-3 md:w-1/4">
            <AdminMenu />
          </div>
        </div>
      </div>{" "}
    </>
  );
}
