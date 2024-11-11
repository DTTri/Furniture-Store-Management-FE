import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import Category from "../../entities/Category";
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
  const categoryName = useRef<string>("");

  const handleAddProduct = () => {
    selectedProduct.forEach(async (product) => {});
  };

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "STT",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "available",
      headerName: "Available",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.5,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={
            <input
              type="checkbox"
              name="addedProduct"
              className="w-4 h-4"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedProduct([
                    ...selectedProduct,
                    params.row as Product,
                  ]);
                } else {
                  const updateSelectedProduct = selectedProduct.filter(
                    (product) => product.id !== (params.row as Product).id
                  );
                  setSelectedProduct(updateSelectedProduct);
                }
              }}
            />
          }
          label="Delete"
        />,
      ],
    },
  ];
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative popup bg-white flex flex-col justify-between flex-wrap gap-4 rounded-xl px-4 py-4 pt-11 w-2/3 max-w-[900px] h-[100vh] min-h-[80vh] max-h-[65vh] overflow-auto">
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
            <span className="text-[#383E49] font-semibold block">Category Name:</span>
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
        <DataGrid
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            height: "100%",
            maxWidth: "860px",
          }}
          columns={columns}
          rows={products.map((product, index) => ({
            ...product,
            index: index + 1,
          }))}
          rowHeight={40}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={
            products.length < 10 ? [10, products.length] : [10, products.length + 1]
          }
          slots={{ toolbar: GridToolbar }}
          rowSelection={false}
        />
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
              handleAddProduct();
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
