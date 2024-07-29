import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIDQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApi";
import { toast } from "react-toastify";
import { useAllCategoriesQuery } from "../../redux/api/categoryApi";
import { ProductTS } from "../../types";
import AdminMenu from "./AdminMenu";
type Props = {};

export default function UpdateProduct({}: Props) {
  const naviaget = useNavigate();
  const params = useParams<{ _id: string }>();
  useEffect(() => {
    if (!params._id) {
      return;
    }
  }, [params]);

  const { data: productData } = useGetProductByIDQuery(params._id!);
  useEffect(() => {
    if (!productData) {
      return;
    }
  }, [productData]);

  const [product, setProduct] = useState<ProductTS>({
    name: productData?.data.name || "",
    image: productData?.data.image || "",
    brand: productData?.data.brand || "",
    quantity: productData?.data.quantity || 0,
    category: productData?.data.category || "",
    description: productData?.data.description || "",
    price: productData?.data.price || 0,
    stock: productData?.data.stock || 0,
  });

  const [imageUrl, setImageUrl] = useState<string>(
    productData?.data.image || "",
  );
  const { data: category = [] } = useAllCategoriesQuery();
  const [uploadProductImage] = useUpdateProductMutation();
  const [UpdateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData.data) {
      setProduct({
        name: productData?.data.name,
        image: productData?.data.image,
        brand: productData?.data.brand,
        quantity: productData?.data.quantity,
        category: productData?.data.category,
        description: productData?.data.description,
        price: productData?.data.price,
        stock: productData?.data.stock,
      });
    }
  }, [productData]);

  const changedInputsHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const imgForm = new FormData();
      imgForm.append("image", file);
    } catch {}
  };

  console.log(product);

  return (
    <div>
      <div className="container sm:mx-[0] xl:mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="p-3 md:w-3/4">
            <div className="h-12">Update / Delete Product</div>

            {imageUrl && (
              <div className="text-center">
                <img
                  src={imageUrl}
                  alt="product"
                  className="mx-auto block h-[40%] w-full"
                />
              </div>
            )}

            <div className="mb-3">
              <label className="block w-full cursor-pointer rounded-lg px-4 py-11 text-center font-bold text-white">
                {imageUrl ? imageUrl : "Upload image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  value={imageUrl}
                  className="text-white"
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    className="mb-3 mr-[5rem] w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                    value={product.name}
                    onChange={changedInputsHandler}
                  />
                </div>

                <div className="two">
                  <label htmlFor="name block">Price</label> <br />
                  <input
                    type="number"
                    className="mb-3 w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                    value={product.price}
                    onChange={changedInputsHandler}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div>
                  <label htmlFor="name block">Quantity</label> <br />
                  <input
                    type="number"
                    min="1"
                    className="mb-3 mr-[5rem] w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                    value={product.quantity}
                    onChange={changedInputsHandler}
                  />
                </div>
                <div>
                  <label htmlFor="name block">Brand</label> <br />
                  <input
                    type="text"
                    className="mb-3 w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                    value={product.brand}
                    onChange={changedInputsHandler}
                  />
                </div>
              </div>

              <label htmlFor="" className="my-5">
                Description
              </label>
              <textarea
                className="mb-3 w-[95%] rounded-lg border bg-[#101011] p-2 text-white"
                value={product.description}
                onChange={changedInputsHandler}
              />

              <div className="flex justify-between">
                <div>
                  <label htmlFor="name block">Count In Stock</label> <br />
                  <input
                    type="text"
                    className="mb-3 w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                    value={product.stock}
                    onChange={changedInputsHandler}
                  />
                </div>

                <div>
                  {/* <label htmlFor="">Category</label> <br />
                  <select
                    className="mb-3 mr-[5rem] w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                    onChange={changedInputsHandler}
                  >
                    {product.category?.map(
                      (c: { _id: string; name: string }) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ),
                    )}
                  </select> */}
                </div>
              </div>

              <div className="">
                <button
                  // onClick={handleSubmit}
                  className="mr-6 mt-5 rounded-lg bg-green-600 px-10 py-4 text-lg font-bold"
                >
                  Update
                </button>
                <button
                  // onClick={handleDelete}
                  className="mt-5 rounded-lg bg-pink-600 px-10 py-4 text-lg font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
