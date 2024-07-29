import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddNewProductMutation,
  useUploadProductImageMutation,
} from "@/redux/api/productApi";
import { useAllCategoriesQuery } from "@/redux/api/categoryApi";
import { ImgTS, ProductTS } from "@/types";
import AdminMenu from "./AdminMenu";

export default function ProductList() {
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

  const [imgUrl, setImgUrl] = useState<ImgTS>({
    imgUrl: "",
    originalFilename: "",
    secureUrl: "",
  });
  const navigate = useNavigate();

  const changedInputsHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const [uploadProductImage] = useUploadProductImageMutation();
  const [addProduct] = useAddNewProductMutation();
  const { data: categoriesData } = useAllCategoriesQuery();

  useEffect(() => {
    if (!categoriesData) {
      return;
    }
  }, [categoriesData]);

  const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }
    try {
      const imgForm = new FormData();
      imgForm.append("image", file);
      const response = await uploadProductImage(imgForm).unwrap();
      setProduct({
        ...product,
        image: response.imageUrl.secureUrl,
      });
      setImgUrl(response.imageUrl);
      toast.success(response.message);
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (!product) {
        return;
      }
      const data = await addProduct(product).unwrap();
      toast.success(data.message);
      navigate("/admin/products");
      setImgUrl({
        imgUrl: "",
        originalFilename: "",
        secureUrl: "",
      });
      setProduct({
        name: "",
        image: "",
        brand: "",
        quantity: 0,
        category: "",
        description: "",
        price: 0,
        stock: 0,
      });
    } catch (error) {
      toast.error("Failed to add product");
      console.log(error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <form onSubmit={handleSubmit} className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {product.image && imgUrl && (
            <div className="text-center">
              <img
                src={imgUrl.imgUrl}
                alt="product"
                className="block mx-auto max-h-[200px] mb-4"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {product.image ? imgUrl.originalFilename : "Upload Image"}
              &nbsp; &nbsp; &nbsp;
              <input
                className="text-white"
                type="file"
                name="image"
                onChange={uploadFileHandler}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="name"
                  value={product.name}
                  onChange={changedInputsHandler}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="price">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="price"
                  minLength={3}
                  min={100}
                  value={product.price}
                  onChange={changedInputsHandler}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="quantity">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="quantity"
                  minLength={1}
                  min={1}
                  value={product.quantity}
                  onChange={changedInputsHandler}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="brand">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="brand"
                  value={product.brand}
                  onChange={changedInputsHandler}
                />
              </div>
            </div>

            <label htmlFor="description" className="my-5">
              Description
            </label>
            <textarea
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              name="description"
              value={product.description}
              onChange={changedInputsHandler}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="stock">Count In Stock</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="stock"
                  value={product.stock}
                  minLength={1}
                  min={1}
                  onChange={changedInputsHandler}
                />
              </div>

              <div>
                <label htmlFor="category">Category</label> <br />
                <select
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="category"
                  value={product.category}
                  onChange={changedInputsHandler}
                >
                  <option value="" disabled>
                    Choose Category
                  </option>
                  {categoriesData &&
                    categoriesData?.data?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
