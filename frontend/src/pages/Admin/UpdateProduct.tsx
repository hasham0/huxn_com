import { useState, useEffect } from "react";
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
type Props = {};

export default function UpdateProduct({}: Props) {
  const params = useParams();
  console.log("🚀 ~ UpdateProduct ~ params:", params);

  const { data: productData } = useGetProductByIDQuery(params._id);

  const [product, setProduct] = useState<ProductTS>({
    name: productData?.name || "",
    image: productData?.image || "",
    brand: productData?.brand || "",
    quantity: productData?.quantity || 0,
    category: productData?.category || "",
    description: productData?.description || "",
    price: productData?.price || 0,
    stock: productData?.stock || 0,
  });
  const [imageUrl, setImageUrl] = useState<string>(productData?.image || "");
  const navigate = useNavigate();
  const { data: category = [] } = useAllCategoriesQuery();
  const [uploadProductImage] = useUpdateProductMutation();
  const [UpdateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData.id) {
      setProduct({
        name: productData.name,
        image: productData.image,
        brand: productData.brand,
        quantity: productData.quantity,
        category: productData.category,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
      });
    }
  }, [productData]);

  return <div>UpdateProduct</div>;
}
