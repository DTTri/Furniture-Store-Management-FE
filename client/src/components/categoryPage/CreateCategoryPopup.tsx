import { useRef } from "react";
import { Product } from "../../entities";
import { Button } from "@mui/material";
import categoryService from "../../services/categoryService";
import { toast } from "react-toastify";

export default function CreateCategoryPopup({
  onClose,
  onCategoryCreated,
}: {
  onClose: () => void;
  onCategoryCreated: (category: Product) => void;
}) {
  const categoryName = useRef<string>("");

  const handleCreateCategory = async () => {
    try {
      if (categoryName.current === "") {
        toast("Category name is required", {
          type: "error",
        });
        onClose();
        return;
      }
      const createdCategoryDTO = { name: categoryName.current };
      const response = await categoryService.createCategory(createdCategoryDTO);
      if (response.data.EC === 0) {
        onCategoryCreated(response.data.DT);
        toast("Category create successfully", {
          type: "success",
        });
        onClose();
      } else {
        toast("Failed to create category: " + response.data.EM, {
          type: "error",
        });
      }
    } catch (error) {
      toast("Failed to create category: " + error, {
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
      <div className="relative popup bg-white flex flex-col flex-wrap gap-2 rounded-xl px-4 py-2 max-w-[600px] max-h-[40vh] overflow-auto">
        <h2 className="text-xl text-[#383E49] font-bold flex-1">
          Create new category
        </h2>
        <hr className="w-full border-[#E1E8F1] border-t-2 mb-2" />
        <div className="w-full flex flex-row items-center mb-4 gap-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Input Category Name"
            className="border min-w-80 border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
            onChange={(e) => {
              categoryName.current = e.target.value;
            }}
            id="searchProductInput"
          />
        </div>

        <div className="buttons flex flex-row justify-end items-center gap-2">
          <Button
            variant="outlined"
            color="primary"
            style={{
              textTransform: "none",
              fontSize: "14px",
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
              handleCreateCategory();
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
