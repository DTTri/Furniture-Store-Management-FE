import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Category from "../../entities/Category";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import http from "../../api/http";
import { Product } from "../../entities";
import { Button } from "@mui/material";
import AddProduct from "./AddProduct";

export default function CategoryDetail({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) {
  console.log("CategoryDetail", category);
  const [productInCategory, setProductInCategory] = useState<Product[]>([]);
  const[isOpenAddProductIntoCategory, setIsOpenAddProductIntoCategory] = useState(false);

  useEffect(() => {
    const fetchProductInCategory = async () => {
      try {
        const response = await http.get("/products/get-all-products");
        if (response.data.EC === 0) {
          const products: Product[] = response.data.DT;
          const filterdProductInCategory = products.filter(
            (product: Product) => product.catalogueId === category.id
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
      field: "price",
      headerName: "Price",
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
      field: "warranty",
      headerName: "Warranty",
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
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            console.log("Delete product", params.row);
          }}
        />,
      ],
    }
  ];
  const rows = productInCategory.map((product, index) => ({
    ...product,
    index: index + 1,
  }));
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative popup bg-white flex flex-col justify-between flex-wrap gap-4 rounded-xl px-4 py-4 pt-11 w-2/3 min-w-[600px] h-[100vh] max-h-[90vh] overflow-auto">
        <div className="header flex flex-row justify-between items-center bg-white mb-2">
          <h2 className="text-2xl text-[#383E49] font-bold flex-1 uppercase">{category.name}</h2>
          <CloseIcon sx={ { width: 27, height: 27 } } className="absolute top-2 right-[14px] hover:bg-slate-100 rounded-full cursor-pointer" onClick={onClose}/>
          <div className="buttons flex flex-row items-center gap-2">
          <Button
            variant="contained"
            color="primary"
            style={{
              textTransform: "none",
              fontSize: "14px"
            }}
            id="addProductButton"
            onClick={() => { setIsOpenAddProductIntoCategory(true); }}
          >
            Add Product Into Category
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{
              textTransform: "none",
              fontSize: "14px",
              color: "#5D6679",
              border: "1px solid #5D6679"
            }}
            id=""
            onClick={() => {}}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{
              textTransform: "none",
              fontSize: "14px",
              color: "#5D6679",
              border: "1px solid #5D6679"
            }}
            id=""
            onClick={() => {}}
          >
            Update
          </Button>
          </div>
        </div>
        <DataGrid
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            height: "100%",
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
        <div className="">
          <p className="text-[18px] font-semibold">Number of Products: {productInCategory.length}</p>
        </div>
      </div>
      {isOpenAddProductIntoCategory && (<AddProduct category={category} onClose={() => { setIsOpenAddProductIntoCategory(false); }} />)}
    </div>
  );
}
