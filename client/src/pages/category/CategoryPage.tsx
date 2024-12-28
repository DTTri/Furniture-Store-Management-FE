import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useState } from "react";
import CreateCategoryPopup from "../../components/categoryPage/CreateCategoryPopup";
import UpdateCategoryPopup from "../../components/categoryPage/UpdateCategoryPopup";
import { Category } from "../../entities";
import { sCategory } from "../../store";
import ConfirmPopup from "../../components/ConfirmPopup";

export default function CategoryPage() {
  const [isCreateCategoryPopupOpen, setIsCreateCategoryPopupOpen] =
    useState(false);
  const [isUpdateCategoryPopupOpen, setIsUpdateCategoryPopupOpen] =
    useState(false);
  const categoryList = sCategory.use((v) => v.categories);
  const [updatedCategory, setUpdatedCategory] = useState<Category>();
  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);

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
      headerName: "Category ID",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Category Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalProduct",
      headerName: "Total Products",
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
          icon={<InfoIcon />}
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
      getActions: () => [
        <GridActionsCellItem
          className="hover:bg-transparent"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            setIsShowConfirmPopup(true);
          }}
        />,
      ],
    },
  ];

  return (
    <div className="bg-white w-full py-6 px-7">
      <div className="header buttons flex flex-row justify-between items-center bg-white mb-4">
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
          minHeight: "466px",
          height: "fit-content",
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
            sCategory.set((v) => {
              v.value.categories = [...v.value.categories, category];
            });
          }}
        />
      )}
      {isUpdateCategoryPopupOpen && (
        <UpdateCategoryPopup
          onClose={() => {
            setIsUpdateCategoryPopupOpen(false);
          }}
          onCategoryUpdated={(category: Category) => {
            sCategory.set((v) => {
              v.value.categories = v.value.categories.map((itemCategory) =>
                itemCategory.id === category.id ? category : itemCategory
              );
            });
          }}
          updatedCategory={updatedCategory || categoryList[0]}
        />
      )}
      {isShowConfirmPopup && (
        <ConfirmPopup
          message="Do you want to delete this category?"
          title="Warning"
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      )}
    </div>
  );
}
