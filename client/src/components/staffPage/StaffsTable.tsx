import { Staff } from "../../entities";
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
import { sUser } from "../../store";

export default function StaffsTable({
  staffs,
  onEditStaff,
  onDeleteStaff,
}: {
  staffs: Staff[];
  onEditStaff: (staff: Staff) => void;
  onDeleteStaff: (staff: Staff) => void;
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
      field: "fullname",
      headerName: "Full Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "birth",
      headerName: "Birth",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatDate(row.birth);
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "idNumber",
      headerName: "ID Number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        // from yyyy-mm-dd to mm-dd-yyyy
        return formatDate(row.startDate);
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Status",
      field: "Account.status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (value, row) => {
        console.log(value);
        return row.Account.status;
      },
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
            const staffId = params.id as number;
            const staff = staffs.find((s) => s.id === staffId);
            if (staff) {
              onEditStaff(staff);
            }
          }}
          style={{
            visibility: userPermissions.includes(58) ? "visible" : "hidden",
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            const staffId = params.id as number;
            const staff = staffs.find((staff) => staff.id === staffId);
            if (staff) {
              onDeleteStaff(staff);
            }
          }}
          style={{
            visibility: userPermissions.includes(59) ? "visible" : "hidden",
          }}
        />,
      ],
    },
  ];
  const rows = staffs.map((staff, index) => ({
    ...staff,
    index: index + 1,
  }));
  return (
    <>
      {userPermissions.includes(60) && (
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
