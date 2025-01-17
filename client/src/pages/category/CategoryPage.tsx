import ModeEditIcon from "@mui/icons-material/ModeEdit";
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
import { sCategory, sProduct, sUser } from "../../store";

export default function CategoryPage() {
  const [isCreateCategoryPopupOpen, setIsCreateCategoryPopupOpen] =
    useState(false);
  const [isUpdateCategoryPopupOpen, setIsUpdateCategoryPopupOpen] =
    useState(false);
  const categoryList = sCategory.use((v) => v.categories);
  const products = sProduct.use((v) => v.products);
  const [updatedCategory, setUpdatedCategory] = useState<Category>();

  const userPermissions = sUser.use((v) => v.permissions);
  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "#",
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
      valueGetter: (_, row) => {
        if (products.length === 0) return 0;
        return products.filter((product) => product.catalogueId === row.id)
          .length;
      },
    },
    {
      field: "actionUpdate",
      type: "actions",
      flex: 0.15,
      getActions: (params: GridRowParams) => {
        return userPermissions.includes(2)
          ? [
              <GridActionsCellItem
                className="hover:bg-transparent"
                icon={<ModeEditIcon />}
                label="Update"
                onClick={() => {
                  setUpdatedCategory(params.row as Category);
                  setIsUpdateCategoryPopupOpen(true);
                }}
              />,
            ]
          : [];
      },
    },
    // {
    //   field: "actionDelete",
    //   type: "actions",
    //   flex: 0.15,
    //   getActions: () => [
    //     <GridActionsCellItem
    //       className="hover:bg-transparent"
    //       icon={<DeleteIcon />}
    //       label="Delete"
    //       onClick={() => {
    //         setIsShowConfirmPopup(true);
    //       }}
    //     />,
    //   ],
    // },
  ];

  return (
    <div className="w-full p-4">
      <div className="header flex flex-row justify-between items-center mb-4 px-4">
        <h2 className="page-header">Category</h2>
        {userPermissions.includes(1) && (
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
        )}
      </div>
      {userPermissions.includes(3) && (
        <DataGrid
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            minHeight: "466px",
            height: "fit-content",
          }}
          columns={columns}
          rows={categoryList.map((category, index) => ({
            index: index + 1,
            ...category,
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
            categoryList.length < 10
              ? [10, categoryList.length]
              : [10, categoryList.length + 1]
          }
          slots={{ toolbar: GridToolbar }}
          rowSelection={false}
        />
      )}
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
    </div>
  );
}
