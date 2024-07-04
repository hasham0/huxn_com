import asyncHandler from "../helpers/asyncHanlder.js";
import Product from "../models/product.model.js";

// note: get limited products:
const fetchLimitedProducts = asyncHandler(async (request, response) => {
  const pageSize = 6;
  const keyword = request.query.keyword
    ? { name: { $regex: request.query.keyword, $options: "i" } }
    : {};

  const countDocs = await Product.countDocuments({ ...keyword });
  const getProducts = await Product.find({ ...keyword }).limit(pageSize);
  if (!getProducts) {
    throw new Error("products not found");
  }
  response.status(200).json({
    message: "all products",
    data: getProducts,
    page: 1,
    pages: Math.ceil(countDocs / pageSize),
    hasMore: false,
  });
});

//note: GET All Product:
const getAllProducts = asyncHandler(async (request, response) => {
  /* check user if existed */
  const isProductExist = await Product.find({})
    .populate("category")
    .limit(12)
    .sort({ createdAt: -1 });

  if (!isProductExist) {
    throw new Error("product not found");
  }

  /* send responce */
  response.status(200).json({
    data: isProductExist,
  });
});

//note: GET Product BY ID_
const getProductByID = asyncHandler(async (request, response) => {
  const { _id: productID } = request.params;

  /* check user if existed */
  const isProductExist = await Product.findOne({ _id: productID });

  if (!isProductExist) {
    throw new Error("product not found");
  }

  /* send responce */
  response.status(200).json({
    data: isProductExist,
  });
});

//note: GET Top Products_
const topProducts = asyncHandler(async (request, response) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  response.status(200).json({
    data: products,
  });
});

//note: GET New Products_
const newProducts = asyncHandler(async (request, response) => {
  const products = await Product.find({}).sort({ _id: -1 }).limit(5);
  response.status(200).json({
    data: products,
  });
});

//note: Add Product Review BY ID_
const addProductReviewByID = asyncHandler(async (request, response) => {
  const user = request.user;
  const { _id: productID } = request.params;
  const { rating, comment } = request.body;

  // Check if any field is empty or rating is not a number
  if (!rating || !comment) {
    throw new Error("Please fill all fields with valid data");
  }

  /* check user if existed */
  const isProductExist = await Product.findOne({ _id: productID });

  if (!isProductExist) {
    throw new Error("product not found");
  }

  if (!isProductExist?.reviews) {
    throw new Error("reviews not found");
  }

  const alreadyReviewed = isProductExist.reviews.find(
    (item) => item?.user?._id.toString() === user?._id.toString()
  );

  if (alreadyReviewed) {
    throw new Error("product already review");
  }
  const review = {
    name: user.username,
    rating: Number(rating),
    comment: comment,
    user: user._id,
  };

  isProductExist.reviews.push(review);
  isProductExist.numReviews = isProductExist?.reviews?.length;
  isProductExist.rating =
    isProductExist.reviews.reduce((acc, cur) => cur?.rating + acc, 0) /
    isProductExist.reviews.length;

  await isProductExist.save();

  /* send responce */
  response.status(200).json({
    message: "review save",
    data: isProductExist,
  });
});

// note: add products:
const addNewProduct = asyncHandler(async (request, response) => {
  let { name, image, brand, quantity, category, description, price, stock } =
    request.body;
  const check = [
    name,
    image,
    brand,
    quantity,
    category,
    description,
    price,
    stock,
  ];
  /* check validation */
  if (check.some((item) => item?.trim() === "")) {
    throw new Error("please fill all fields");
  }
  price = Number(price);
  quantity = Number(quantity);
  stock = Number(stock);
  /* check product if existed */
  const isProductExists = await Product.findOne({
    name: name,
  });

  if (isProductExists) {
    throw new Error("product already existed");
  }
  const newProduct = await Product.create({
    name,
    image,
    brand,
    quantity,
    category,
    description,
    price,
    stock,
  });
  response.status(200).json({
    message: "new product added successfully",
    data: newProduct,
  });
});

// note: update products:
const updateProductDetailsByID = asyncHandler(async (request, response) => {
  const { _id: productID } = request.params;
  const { name, description, price, category, quantity, brand, image } =
    request.fields;

  /* check validation */
  if (
    [name, description, price, category, quantity, brand, image].some(
      (item) => item?.trim() === ""
    )
  ) {
    throw new Error("please fill all fields");
  }
  /* check product if existed */
  const isProductExists = await Product.findOne({ _id: productID });
  if (!isProductExists) {
    throw new Error("product not existed");
  }

  const updateProduct = await Product.findByIdAndUpdate(
    { _id: productID },
    {
      $set: {
        ...request.fields,
      },
    },
    { new: true }
  );

  response.status(200).json({
    message: "new product added successfully",
    data: updateProduct,
  });
});

// note: delete products:
const deleteProductByID = asyncHandler(async (request, response) => {
  const { _id: productID } = request.params;
  const isProductExist = await Product.findOne({ _id: productID });
  if (!isProductExist) {
    throw new Error("product not found");
  }
  await Product.findByIdAndDelete({ _id: productID });
  response.status(200).json({
    message: "product deleted successfully",
  });
});

//! EXPORT CONTROLLERS_
export {
  addNewProduct,
  updateProductDetailsByID,
  fetchLimitedProducts,
  deleteProductByID,
  getProductByID,
  addProductReviewByID,
  getAllProducts,
  newProducts,
  topProducts,
};
