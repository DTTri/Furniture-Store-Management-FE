import { WarrantyOrder } from "../../entities";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import formatDate from "../../utils/formatDate";
import formatMoney from "../../utils/formatMoney";
import { sUser } from "../../store";
export default function WarrantyOrdersTable({
  warrantyOrders,
  onEditWarrantyOrder,
  onDeleteWarrantyOrder,
}: {
  warrantyOrders: WarrantyOrder[];
  onEditWarrantyOrder: (warrantyOrder: WarrantyOrder) => void;
  onDeleteWarrantyOrder: (warrantyOrder: WarrantyOrder) => void;
}) {
  // type WarrantyOrder = {
  //     id: number;
  //     description: string;
  //     details: string;
  //     cost: string;
  //     status: string;
  //     estimateFinishDate: string;
  //     finishDate: string;
  //     createdAt: string;
  //     updatedAt: string;
  //     staffId: number;
  //     warrantyId: number;
  //   };
  const userPermissions = sUser.use((v) => v.permissions);
  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "#",
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
      field: "description",
      headerName: "Description",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatMoney(row.cost);
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "estimateFinishDate",
      headerName: "Estimate Finish Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        if (row.estimateFinishDate === null) return "";
        return formatDate(row.estimateFinishDate);
      },
    },
    {
      field: "finishDate",
      headerName: "Finish Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        if (row.finishDate === null) return "";
        return formatDate(row.finishDate);
      },
    },
    {
      field: "staffId",
      headerName: "Staff ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "warrantyId",
      headerName: "Warranty ID",
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
          icon={<ModeEditIcon />}
          label="Edit"
          onClick={() => {
            const orderId = params.id as number;
            const warrantyOrder = warrantyOrders.find(
              (order) => order.id === orderId
            );
            if (warrantyOrder) {
              onEditWarrantyOrder(warrantyOrder);
            }
          }}
          style={{
            visibility: userPermissions.includes(37) ? "visible" : "hidden",
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            const orderId = params.id as number;
            const warrantyOrder = warrantyOrders.find(
              (order) => order.id === orderId
            );
            if (warrantyOrder) {
              onDeleteWarrantyOrder(warrantyOrder);
            }
          }}
          style={{
            visibility: userPermissions.includes(38) ? "visible" : "hidden",
          }}
        />,
      ],
    },
  ];
  const rows = warrantyOrders.map((order, index) => ({
    ...order,
    index: index + 1,
  }));
  return (
    <>
      {userPermissions.includes(35) && (
        <DataGrid
          style={{
            borderRadius: "20px",
            backgroundColor: "white",
            height: "100%",
          }}
          rows={rows}
          columns={columns}
          disableDensitySelector
          rowHeight={40}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={
            rows.length < 8 ? [8, rows.length] : [8, rows.length + 1]
          }
          slots={{ toolbar: GridToolbar }}
          rowSelection={false}
        />
      )}
    </>
  );
}
