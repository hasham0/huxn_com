import React, { useEffect } from "react";
import { useGetProductsQuery } from "./redux/api/productApi";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Message from "./components/Message";
import { Link, useParams } from "react-router-dom";
import Product from "./pages/Products/Product";

type Props = {};

export default function Home({}: Props) {
  const { keyword } = useParams<{ keyword: string }>();
  useEffect(() => {
    if (!keyword) {
      return;
    }
    console.log("keyword =>", keyword);
  }, [keyword]);

  const { data, isLoading, isError } = useGetProductsQuery({
    keyword: keyword!,
  });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="error">{isError}</Message>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="mr-[18rem] mt-[10rem] rounded-full bg-pink-600 px-10 py-2 font-bold"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="mt-[2rem] flex flex-wrap justify-center">
              {data?.data.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
