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
import formatMoney from "../../utils/formatMoney";
import { sUser } from "../../store";

export default function RepairOrdersTable({
  repairOrders,
  onEditRepairOrder,
  onDeleteRepairOrder,
}: {
  repairOrders: RepairOrder[];
  onEditRepairOrder: (repairOrder: RepairOrder) => void;
  onDeleteRepairOrder: (repairOrder: RepairOrder) => void;
}) {
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
          style={{
            visibility: userPermissions.includes(42) ? "visible" : "hidden",
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
          style={{
            visibility: userPermissions.includes(43) ? "visible" : "hidden",
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
    <>
      {userPermissions.includes(40) && (
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
