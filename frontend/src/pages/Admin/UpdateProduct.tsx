import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { MouseEvent as ReactMouseEvent } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIDQuery,
  useUpdateProductImageMutation,
} from "../../redux/api/productApi";
import { useAllCategoriesQuery } from "../../redux/api/categoryApi";
import { ProductTS } from "../../types";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";

type Props = {};

export default function UpdateProduct({}: Props) {
  const navigate = useNavigate();
  const params = useParams<{ _id: string }>();

  const { data: productData } = useGetProductByIDQuery(params._id!);

  const [imageUrl, setImageUrl] = useState<string>("");

  const [product, setProduct] = useState<ProductTS>({
    name: "",
    image: "",
    brand: "",
    quantity: 0,
    category: "",
    description: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (productData && productData.data) {
      setProduct({
        _id: productData.data._id || "",
        name: productData.data.name || "",
        image: productData.data.image || "",
        brand: productData.data.brand || "",
        quantity: productData.data.quantity || 0,
        category: productData.data.category || "",
        description: productData.data.description || "",
        price: productData.data.price || 0,
        stock: productData.data.stock || 0,
      });
      setImageUrl(productData.data.image);
    }
  }, [productData]);

  const { data: categoriesData } = useAllCategoriesQuery();
  const [updateProductImage] = useUpdateProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changedInputsHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !(product && product?._id)) return;

    try {
      const imgForm = new FormData();
      imgForm.append("image", file);
      const data = await updateProductImage({
        id: product._id!,
        image: imgForm,
      }).unwrap();
      toast.success(data.message);
      setImageUrl(data.newImgUrl);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (!(product && product?._id)) return;
      const response = await updateProduct({
        _id: product._id,
        oldData: product,
      }).unwrap();
      setProduct({
        _id: response.data._id || "",
        name: response.data.name || "",
        image: response.data.image || "",
        brand: response.data.brand || "",
        quantity: response.data.quantity || 0,
        category: response.data.category || "",
        description: response.data.description || "",
        price: response.data.price || 0,
        stock: response.data.stock || 0,
      });
      setImageUrl(response.data.image);
      toast.success(response.message);
      setInterval(() => {
        navigate("/admin/allproductslist"); // Redirect to the products list or another page
      }, 1000);
    } catch (error) {
      toast.error("Failed to delete the product");
      console.log(
        " --------------------------------------------------------------",
      );
      console.log("file: UpdateProduct.tsx:94  handleDelete  error => ", error);
      console.log(
        " --------------------------------------------------------------",
      );
    }
  };

  const handleDelete = async (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!(product && product?._id)) return;
    console.log(product._id);

    try {
      const response = await deleteProduct({ _id: product._id }).unwrap();
      toast.success(response.message);
      navigate("/admin/allproductslist"); // Redirect to the products list or another page
    } catch (error) {
      toast.error("Failed to delete the product");
      console.log(
        " --------------------------------------------------------------",
      );
      console.log("file: UpdateProduct.tsx:94  handleDelete  error => ", error);
      console.log(
        " --------------------------------------------------------------",
      );
    }
  };

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
                <input
                  type="file"
                  name="image"
                  //   accept="image/*"
                  onChange={uploadFileHandler}
                  className="text-white"
                />
              </label>
            </div>

            <form
              onSubmit={handleUpdateSubmit}
              className="border-2 border-white p-3"
            >
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    name="name"
                    className="mb-3 mr-[5rem] w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                    value={product.name}
                    onChange={changedInputsHandler}
                  />
                </div>

                <div className="two">
                  <label htmlFor="price">Price</label> <br />
                  <input
                    type="number"
                    name="price"
                    className="mb-3 w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                    value={product.price}
                    onChange={changedInputsHandler}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div>
                  <label htmlFor="quantity">Quantity</label> <br />
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    className="mb-3 mr-[5rem] w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                    value={product.quantity}
                    onChange={changedInputsHandler}
                  />
                </div>
                <div>
                  <label htmlFor="brand">Brand</label> <br />
                  <input
                    type="text"
                    name="brand"
                    className="mb-3 w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                    value={product.brand}
                    onChange={changedInputsHandler}
                  />
                </div>
              </div>

              <label htmlFor="description" className="my-5">
                Description
              </label>
              <textarea
                name="description"
                className="mb-3 w-[95%] rounded-lg border bg-[#101011] p-2 text-white"
                value={product.description}
                onChange={changedInputsHandler}
              />

              <div className="flex justify-between">
                <div>
                  <label htmlFor="stock">Count In Stock</label> <br />
                  <input
                    type="text"
                    name="stock"
                    className="mb-3 w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                    value={product.stock}
                    onChange={changedInputsHandler}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <br />
                <select
                  name="category"
                  className="mb-3 mr-[5rem] w-[30rem] rounded-lg border bg-[#101011] p-4 text-white"
                  value={product.category}
                  onChange={changedInputsHandler}
                >
                  {categoriesData &&
                    categoriesData?.data?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="">
                <button
                  type="submit"
                  className="mr-6 mt-5 rounded-lg bg-green-600 px-10 py-4 text-lg font-bold"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="mt-5 rounded-lg bg-pink-600 px-10 py-4 text-lg font-bold"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
