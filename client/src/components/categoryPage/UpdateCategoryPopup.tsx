import { useState } from "react";
import { Category, Product } from "../../entities";
import { Button } from "@mui/material";
import categoryService from "../../services/categoryService";
import { toast } from "react-toastify";

export default function UpdateCategoryPopup({
  onClose,
  onCategoryUpdated,
  updatedCategory,
}: {
  onClose: () => void;
  onCategoryUpdated: (category: Product) => void;
  updatedCategory: Category;
}) {
  const [categoryName, setCategoryName] = useState<string>(
    updatedCategory.name
  );

  const handleUpdateategory = async () => {
    try {
      if (categoryName === "" || categoryName === updatedCategory.name) {
        toast("Category name is required", {
          type: "error",
        });
        onClose();
        return;
      }
      console.log("updatedCategory.id", updatedCategory.id);
      const response = await categoryService.updateCategory(
        updatedCategory.id,
        { name: categoryName.toString() }
      );
      if (response.data.EC === 0) {
        onCategoryUpdated(response.data.DT);
        toast("Category updated succesfully", {
          type: "error",
        });
        onClose();
      } else {
        toast("Fail to update category: " + response.data.EM, {
          type: "error",
        });
      }
    } catch (error) {
      toast("Fail to update category: " + error, {
        type: "error",
      });
    }
    // setShowDataGrid(false);
    // setTimeout(() => {
    //   setShowDataGrid(true);
    // }, 0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white flex flex-col flex-wrap gap-2 rounded-xl px-4 py-2 max-w-[600px] max-h-[40vh] overflow-auto">
        <h2 className="text-xl text-[#383E49] font-bold flex-1">
          Update category
        </h2>
        <hr className="w-full border-[#E1E8F1] border-t-2 mb-2" />
        <div className="w-full flex flex-row items-center mb-4 gap-4">
          <span className="text-[#383E49] font-semibold block">
            Category Name:
          </span>
          <input
            type="text"
            placeholder="Input Category Name"
            className="border min-w-80 border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
            id="searchProductInput"
          />
        </div>

        <div className="buttons flex flex-row justify-end items-center gap-2">
          <Button
            variant="contained"
            color="primary"
            style={{
              textTransform: "none",
              fontSize: "14px",
              backgroundColor: "#D91316",
            }}
            id=""
            onClick={onClose}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{
              textTransform: "none",
              fontSize: "14px",
            }}
            id="addProductButton"
            onClick={() => {
              handleUpdateategory();
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
