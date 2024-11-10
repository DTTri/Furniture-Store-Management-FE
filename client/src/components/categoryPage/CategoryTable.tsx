import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
    GridToolbar,
  } from "@mui/x-data-grid";
  import React, { useEffect, useState } from "react";
  import Category from "../../entities/Category";
  import InfoIcon from "@mui/icons-material/Info";
  import http from "../../api/http";
  import { format } from "date-fns";
  
  export default function CategoryTable() {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
  
    const [isDetailCategoryOpen, setIsDetailCategoryOpen] = useState(false);

    useEffect(() => {
      const fetchCategory = async () => {
        try {
          const response = await http.get("/catalogues/get-all-catalogues");
          if (response.data.EC === 0) {
            setCategoryList(response.data.DT);
          } else {
            console.log("Failed to fetch categories:", response.data.EM);
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
        flex: 0.5,
        headerAlign: "center",
        align: "center",
        width: 15,
      },
      {
        field: "id",
        headerName: "Mã danh mục",
        flex: 1,
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
            icon={<InfoIcon />}
            label="Delete"
            onClick={() => {
              console.log("Delete", params.row.id);
            }}
          />,
        ],
      },
    ];
    const rows = categoryList.map((categoryItem, index) => {
      return {
        ...categoryItem,
        index: index + 1,
      };
    });
    return (
      <div>
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
      </div>
    );
  }
  