import React from "react";
import { ProductTS } from "../../types";
import { Link } from "react-router-dom";

type Props = {
  product: ProductTS;
};

export default function SmallProduct({ product }: Props) {
  return (
    <div className="ml-[2rem] w-[20rem] p-3">
      <div className="relative space-y-3">
        <img
          src={product.image}
          className="h-auto rounded"
          alt={product.name}
        />
        <div className="p-54">
          <Link to={`/product/${product._id}`}>
            <div className="flex items-center justify-between">
              <div>{product.name}</div>
              <span className="mr-2 rounded-full bg-pink-100 px-2.5 py-0.5 text-sm font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300">
                ${product.price}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
