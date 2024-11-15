import { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import CreateCategoryPopup from "../../components/categoryPage/CreateCategoryPopup";
import UpdateCategoryPopup from "../../components/categoryPage/UpdateCategoryPopup";
import categoryService from "../../services/categoryService";
import { Category } from "../../entities";

export default function CategoryPage() {
  const [isCreateCategoryPopupOpen, setIsCreateCategoryPopupOpen] =
    useState(false);
  const [isUpdateCategoryPopupOpen, setIsUpdateCategoryPopupOpen] =
    useState(false);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [updatedCategory, setUpdatedCategory] = useState<Category>();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryService.getAllCategory();
        if (response.EC === 0) {
          setCategoryList(
            response.DT.map((category: any, index: number) => {
              return {
                ...category,
                index: index + 1,
              };
            })
          );
        } else {
          console.log("Failed to fetch categories:", response.EM);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, []);

  
  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "STT",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      width: 15,
    },
    {
      field: "id",
      headerName: "Mã danh mục",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Tên danh mục",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalProduct",
      headerName: "Tổng số sản phẩm",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actionUpdate",
      type: "actions",
      flex: 0.15,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          className="hover:bg-transparent"
          icon={
            <InfoIcon/>
            }
          label="Update"
          onClick={() => {
            setUpdatedCategory(params.row as Category);
            setIsUpdateCategoryPopupOpen(true);
          }}
        />,
      ],
    },
    {
      field: "actionDelete",
      type: "actions",
      flex: 0.15,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          className="hover:bg-transparent"
          icon={
            <DeleteIcon/>}
          label="Delete"
          onClick={() => {
            
          }}
        />,
      ],
    },
  ];

  return (
    <div className="bg-white w-full h-screen py-6 px-7">
      <div className="header buttons flex flex-row justify-between items-center bg-white mb-4">
        <div className="search-bar w-[30%] px-1 mr-4 flex flex-row items-center border border-slate-400 rounded-xl overflow-hidden">
          <input
            type="text"
            placeholder="Search Category"
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
        <Button
          variant="contained"
          color="primary"
          style={{
            textTransform: "none",
          }}
          id="addProductButton"
          onClick={() => {
            setIsCreateCategoryPopupOpen(true);
          }}
        >
          Add Category
        </Button>
      </div>
      <DataGrid
        style={{
          borderRadius: "10px",
          backgroundColor: "white",
          maxHeight: "70%",
        }}
        columns={columns}
        rows={categoryList}
        rowHeight={40}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={
          categoryList.length < 10
            ? [10, categoryList.length]
            : [10, categoryList.length + 1]
        }
        slots={{ toolbar: GridToolbar }}
        rowSelection={false}
      />
      {isCreateCategoryPopupOpen && (
        <CreateCategoryPopup
          onClose={() => {
            setIsCreateCategoryPopupOpen(false);
          }}
          onCategoryCreated={(category: Category) => {
            setCategoryList([...categoryList, category]);
          }}
        />
      )}
      {isUpdateCategoryPopupOpen && (
        <UpdateCategoryPopup
          onClose={() => {
            setIsUpdateCategoryPopupOpen(false);
          }}
          onCategoryUpdated={(category: Category) => {
            setCategoryList([...categoryList, category]);
          }}
          updatedCategory={updatedCategory || categoryList[0]}
        />
      )}
    </div>
  );
}
