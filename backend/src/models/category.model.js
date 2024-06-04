import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "please provide atleast 3 characters"],
      maxLength: [32],
      required: [true, "please provide the category name"],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = model["Category"] || model("Category", categorySchema);

export default Category;
