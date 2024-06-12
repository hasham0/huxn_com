import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddNewProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApi";
import { useAllCategoriesQuery } from "../../redux/api/categoryApi";
import { ProductTS } from "../../types";
type Props = {};

export default function ProductList({}: Props) {
  const [product, setProduct] = useState<ProductTS>({
    name: "",
    description: "",
    brand: "",
    category: { _id: "", name: "" },
    quantity: 0,
    image: "",
    price: 0,
    stock: 0,
  });

  const [imgUrl, setImgUrl] = useState<string>("");
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
  const [addNewProduct] = useAddNewProductMutation();
  const { data: categories } = useAllCategoriesQuery();

  const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("🚀 ~ uploadFileHandler ~ file:", file);

    if (file) {
      try {
        const imgForm = new FormData();
        imgForm.append("image", file);
        const response = await uploadProductImage(imgForm).unwrap();
        console.log("🚀 ~ uploadFileHandler ~ response:", response);
        setProduct({
          ...product,
          image: response.image,
        });
        setImgUrl(response.image);

        toast.success(response.message);
      } catch (error) {
        toast.error("Image upload failed");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await addNewProduct(product).unwrap();
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        {/* <AdminMenu /> */}
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {product.image && imgUrl && (
            <div className="text-center">
              <img
                src={imgUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {product.image ? product.image : "Upload Image"}
              <input type="file" name="image" onChange={uploadFileHandler} />
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
                  onChange={changedInputsHandler}
                />
              </div>

              <div>
                <label htmlFor="category">Category</label> <br />
                <select
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="category"
                  value={product.category._id}
                  onChange={changedInputsHandler}
                >
                  <option value="" disabled>
                    Choose Category
                  </option>
                  {categories?.data?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
