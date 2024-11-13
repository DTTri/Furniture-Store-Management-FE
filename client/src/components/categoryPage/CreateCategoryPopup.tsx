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
import { addProductIntoCategory } from "./CategoryService";

export default function CreateCategoryPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await http.get("/products/get-all-products");
        if (response.data.EC === 0) {
          setProducts(response.data.DT);
        } else {
          console.log("Failed to fetch product in Category:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  const [showDataGrid, setShowDataGrid] = useState(true);
  const categoryName = useRef<string>("");

  const handleCreateCategory = async () => {
    try {
      const response = await http.post("/catalogues/create-catalogue", {
        name: categoryName.current,
      });
      if (response.data.EC === 0) {
        setProducts(response.data.DT);
      } else {
        console.log("Failed to create category in Category:", response.data.EM);
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
      <div className="relative popup bg-white flex flex-col justify-between flex-wrap gap-4 rounded-xl px-4 py-4 pt-11 w-2/3 max-w-[700px] h-[50vh]  max-h-[65vh] overflow-auto">
        <div className="header flex flex-row justify-between items-center bg-white mb-2">
          <h2 className="text-2xl text-[#383E49] font-bold flex-1 uppercase">
            Create new Category
          </h2>
          <CloseIcon
            sx={{ width: 27, height: 27 }}
            className="absolute top-2 right-[14px] hover:bg-slate-100 rounded-full cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="w-full flex flex-row items-center gap-2 ">
          <span className="text-[#383E49] font-semibold block">
            Category Name:
          </span>
          <input
            type="text"
            placeholder="Input Category Name"
            className="w-[30%] border border-slate-400 overflow-hidden p-1 rounded-md"
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
            }}
            id="addProductButton"
            onClick={() => {
              handleCreateCategory();
              alert("Add product successfully");
            }}
          >
            Create
          </Button>
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
        </div>
      </div>
    </div>
  );
}
