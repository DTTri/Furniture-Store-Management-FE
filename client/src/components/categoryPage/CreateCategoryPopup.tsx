import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import http from "../../api/http";
import { Product } from "../../entities";
import { Button, Select } from "@mui/material";
import categoryService from "../../services/categoryService";
import { Flip, toast } from "react-toastify";

export default function CreateCategoryPopup({
  onClose,
  onCategoryCreated,
}: {
  onClose: () => void;
  onCategoryCreated: (category: Product) => void;
}) {
  const [showDataGrid, setShowDataGrid] = useState(true);
  const categoryName = useRef<string>("");

  const handleCreateCategory = async () => {
    try {
      if(categoryName.current === "") {
        toast("Category name is required", {
          type: "error",
        });
        onClose();
        return;
      }
      const createdCategoryDTO = { name: categoryName.current}
      const response = await categoryService.createCategory(createdCategoryDTO);
      if (response.EC === 0) {
        onCategoryCreated(response.DT);
        toast("Category create successfully", {
          type: "success",
        });
        onClose();
      } else {
        toast("Failed to create category", {
          type: "error",
        });
      }
    } catch (error) {
      toast("Failed to create category", {
        type: "error",
      });
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
            Create new Category
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
            onChange={(e) => {
              categoryName.current = e.target.value;
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
