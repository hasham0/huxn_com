import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useAllCategoriesQuery,
  useCreateCategoryMutation,
  // useCategoryByIDQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/categoryApi";
import CategoryForm from "../../components/CategoryForm";
import { CategoryTS } from "../../types";
import Model from "../../components/Model";

type Props = {};

export default function CategoryList({}: Props) {
  const [item, setItem] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryTS | null>();

  const [updateName, setUpdateName] = useState<string>("");
  const [modelVisible, setModelVisible] = useState<boolean>(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const { data: categoryData, refetch } = useAllCategoriesQuery();

  const handleCreateCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!item) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name: item }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setItem("");
        toast.success(`${result.data?.message} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!updateName || !selectedCategory) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        _id: selectedCategory._id,
        name: updateName,
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message);
        setSelectedCategory(null);
        setUpdateName("");
        setModelVisible(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!selectedCategory) {
        toast.error("Category name is required");
        return;
      }
      const result = await deleteCategory({
        _id: selectedCategory._id,
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`category is deleted.`);
        setSelectedCategory(null);
        setModelVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category delection failed. Tray again.");
    }
  };

  return (
    <div>
      <div className="ml-[10rem] flex flex-col md:flex-row">
        {/* <AdminMenu /> */}
        <div className="md:w-3/4 p-3">
          <div className="h-12">Manage Categories</div>
          <CategoryForm
            value={item}
            setValue={setItem}
            handleSubmit={handleCreateCategory}
            buttonText="Submit"
          />
          <br />
          <hr />

          <div className="flex flex-wrap">
            {categoryData &&
              categoryData?.data?.map((category: CategoryTS) => (
                <div key={category._id}>
                  <button
                    className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    onClick={() => {
                      setModelVisible(true);
                      setSelectedCategory(category);
                      setUpdateName(category.name);
                    }}
                  >
                    {category.name}
                  </button>
                </div>
              ))}
          </div>

          <Model isOpen={modelVisible} onClose={() => setModelVisible(false)}>
            <CategoryForm
              value={updateName}
              setValue={(value) => setUpdateName(value)}
              handleSubmit={handleUpdateCategory}
              buttonText="Update"
              handleDelete={handleDeleteCategory}
            />
          </Model>
        </div>
      </div>
    </div>
  );
}
