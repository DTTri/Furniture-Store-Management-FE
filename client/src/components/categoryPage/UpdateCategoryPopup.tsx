import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import http from "../../api/http";
import { Category, Product } from "../../entities";
import { Button, Select } from "@mui/material";
import categoryService from "../../services/categoryService";

export default function UpdateCategoryPopup({
  onClose,
  onCategoryUpdated,
  updatedCategory,
}: {
  onClose: () => void;
  onCategoryUpdated: (category: Product) => void;
  updatedCategory: Category;
}) {
  const [showDataGrid, setShowDataGrid] = useState(true);
  const [categoryName, setCategoryName] = useState<string>(
    updatedCategory.name
  );

  const handleUpdateategory = async () => {
    try {
      if (categoryName === "" || categoryName === updatedCategory.name) {
        alert("Category name is required or must be changed!");
        onClose();
        return;
      }
      const response = await categoryService.updateCategory(
        updatedCategory.id,
        { name: categoryName }
      );
      if (response.EC === 0) {
        onCategoryUpdated(response.DT);
        onClose();
      } else {
        console.log("Failed to create category in Category:", response.EM);
      }
    } catch (error) {
      console.error("Error create category:", error);
    }
    setShowDataGrid(false);
    setTimeout(() => {
      setShowDataGrid(true);
    }, 0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative popup bg-white flex flex-col flex-wrap gap-2 rounded-xl px-4 py-4 pt-11 w-2/3 max-w-[600px] max-h-[40vh] overflow-auto">
        <div className="header flex flex-row justify-between items-center mb-4 bg-white">
          <h2 className="text-2xl text-[#383E49] font-bold flex-1 uppercase">
            Update Category
          </h2>
          <CloseIcon
            sx={{ width: 27, height: 27 }}
            className="absolute top-2 right-[14px] hover:bg-slate-100 rounded-full cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="w-full flex flex-row items-center mb-4 gap-2 ">
          <span className="text-[#383E49] font-semibold block">
            Category Name:
          </span>
          <input
            type="text"
            placeholder="Input Category Name"
            className="w-[50%] border border-slate-400 overflow-hidden p-1 rounded-md"
            style={{ border: "0", outline: "none" }}
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              console.log(categoryName);
            }}
            id="searchProductInput"
          ></input>
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
