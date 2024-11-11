import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Category from "../../entities/Category";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import http from "../../api/http";
import { Product } from "../../entities";
import { Button, Select } from "@mui/material";
import { addProductIntoCategory } from "./CategoryService";

export default function AddProductToCategoryPopup({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) {
  const [productInCategory, setProductInCategory] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductInCategory = async () => {
      try {
        const response = await http.get("/products/get-all-products");
        if (response.data.EC === 0) {
          const products: Product[] = response.data.DT;
          const filterdProductInCategory = products.filter(
            (product: Product) => product.catalogueId !== category.id
          );
          setProductInCategory(filterdProductInCategory);
        } else {
          console.log("Failed to fetch product in Category:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProductInCategory();
  }, []);

  const[selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  console.log("selectedProduct", selectedProduct);
  const handleAddProduct = () => {
    selectedProduct.forEach(async (product) => {
      console.log("product id", product.id);
      console.log("category id", category.id);
      addProductIntoCategory(product, category.id);
    })
  }


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
          icon={<input type="checkbox" name="addedProduct" className="w-4 h-4"
                 onChange={(e) => {
                  if(e.target.checked){
                    setSelectedProduct([...selectedProduct, params.row as Product]);
                  }else{
                    const updateSelectedProduct = selectedProduct.filter((product) => product.id !== (params.row as Product).id);
                    setSelectedProduct(updateSelectedProduct);
                    
                  }
                }}/>}
                label="Delete"
                
        />,
      ],
    },
  ];
  const rows = productInCategory.map((product, index) => ({
    ...product,
    index: index + 1,
  }));
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative popup bg-white flex flex-col justify-between flex-wrap gap-4 rounded-xl px-4 py-4 pt-11 w-2/3 max-w-[900px] h-[100vh] min-h-[80vh] max-h-[65vh] overflow-auto">
        <div className="header flex flex-row justify-between items-center bg-white mb-2">
          <h2 className="text-2xl text-[#383E49] font-bold flex-1 uppercase">
            Add product
          </h2>
          <div className="search-bar w-[30%] px-1 mr-4 flex flex-row items-center border border-slate-400 rounded-xl overflow-hidden">
            <input
              type="text"
              placeholder="Search Product"
              className="w-full py-2 px-[3px] rounded-md"
              style={{ border: "0", outline: "none" }}
              onChange={(e) => {}}
              id="searchProductInput"
            ></input>
            <SearchIcon
              className="hover:bg-slate-50 rounded-full p-1"
              sx={{ width: 35, height: 35 }}
            />
          </div>
          <CloseIcon
            sx={{ width: 27, height: 27 }}
            className="absolute top-2 right-[14px] hover:bg-slate-100 rounded-full cursor-pointer"
            onClick={onClose}
          />
        </div>
        <DataGrid
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            height: "100%",
            maxWidth: "860px"
          }}
          columns={columns}
          rows={rows}
          rowHeight={40}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={
            rows.length < 10 ? [10, rows.length] : [10, rows.length + 1]
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
            Add
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
