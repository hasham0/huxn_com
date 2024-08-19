import { Link } from "react-router-dom";
import { ProductTS } from "../../types";
//import HeartIcon from "./HeartIcon";

type Props = { product: ProductTS };

export default function Product({ product }: Props) {
  return (
    <>
      <div className="relative ml-[2rem] w-[30rem] p-3">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-[30rem] rounded"
          />
          {/* <HeartIcon product={product} /> */}
        </div>

        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex items-center justify-between">
              <div className="text-lg">{product.name}</div>
              <span className="mr-2 rounded-full bg-pink-100 px-2.5 py-0.5 text-sm font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300">
                $ {product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </>
  );
}
