import { Link, useParams } from "react-router-dom";
import { useGetTopProductsQuery } from "../redux/api/productApi";
import Loader from "./Loader";
import { ProductTS } from "../types";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

type Props = {};

export default function Header({}: Props) {
  const { data, isLoading, isError, refetch } = useGetTopProductsQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error while ....</div>;
  }
  return (
    <div className="flex justify-around">
      <div className="hidden xl:block">
        <div className="grid grid-cols-2">
          {data?.data?.map((item: ProductTS, index: number) => (
            <div key={index}>
              <SmallProduct product={item} />
            </div>
          ))}
        </div>
      </div>
      <ProductCarousel />
    </div>
  );
}
