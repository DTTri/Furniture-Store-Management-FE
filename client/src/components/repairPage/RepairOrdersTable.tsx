import { RepairOrder } from "../../entities";
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

export default function RepairOrdersTable({
  repairOrders,
  onEditRepairOrder,
  onDeleteRepairOrder,
}: {
  repairOrders: RepairOrder[];
  onEditRepairOrder: (repairOrder: RepairOrder) => void;
  onDeleteRepairOrder: (repairOrder: RepairOrder) => void;
}) {
  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "INDEX",
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
      field: "productName",
      headerName: "Product Name",
      flex: 1,
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
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatDate(row.createdAt);
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatDate(row.updatedAt);
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
      field: "customerId",
      headerName: "Customer ID",
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
            const repairOrder = repairOrders.find(
              (order) => order.id === orderId
            );
            if (repairOrder) {
              onEditRepairOrder(repairOrder);
            }
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            const orderId = params.id as number;
            const repairOrder = repairOrders.find(
              (order) => order.id === orderId
            );
            if (repairOrder) {
              onDeleteRepairOrder(repairOrder);
            }
          }}
        />,
      ],
    },
  ];
  const rows = repairOrders.map((order, index) => ({
    ...order,
    index: index + 1,
  }));
  return (
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
  );
}
