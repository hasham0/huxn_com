import asyncHandler from "../helpers/asyncHanlder.js";
import Category from "../models/category.model.js";

// note: get all categories:
const allCategories = asyncHandler(async (request, response) => {
  const getAllCategories = await Category.find({});
  if (!getAllCategories) {
    throw new Error("categories not found");
  }
  response
    .status(200)
    .json({ message: "all category", data: getAllCategories });
});

// note: get categories by id:
const categoryByID = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  const category = await Category.findOne({ _id: _id });
  if (!category) {
    throw new Error("categoriy not found");
  }
  response.status(200).json({ message: "category", data: category });
});

// note: create new product:
const createCategory = asyncHandler(async (request, response) => {
  const { name } = request.body;
  if ([name].some((item) => item?.trim() === "")) {
    throw new Error("please fill all fields");
  }
  const isCategoryExisted = await Category.findOne({ name: name });
  if (isCategoryExisted) {
    throw new Error("category already existed");
  }
  const newCateory = await Category.create({
    name: name,
  });
  response
    .status(200)
    .json({ message: "new category creadted", data: newCateory });
});

// note: update product:
const updateCategoryByID = asyncHandler(async (request, response) => {
  const { newCategoryName } = request.body;
  const { _id } = request.params;
  const isCategoryExisted = await Category.findOne({ _id: _id });
  if (!isCategoryExisted) {
    throw new Error("category not found");
  }
  const updateCategoryName = await Category.findByIdAndUpdate(
    { _id: _id },
    {
      $set: {
        name: newCategoryName,
      },
    },
    { new: true }
  );
  response.status(200).json({
    message: "category updated successfully",
    data: updateCategoryName,
  });
});
// note: update product:
const deleteCategoryByID = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  const isCategoryExisted = await Category.findOne({ _id: _id });
  if (!isCategoryExisted) {
    throw new Error("category not found");
  }
  await Category.findByIdAndDelete({ _id: _id });
  response.status(200).json({
    message: "category deleted successfully",
  });
});

//! EXPORT CONTROLLERS_
export {
  createCategory,
  allCategories,
  updateCategoryByID,
  deleteCategoryByID,
  categoryByID,
};
