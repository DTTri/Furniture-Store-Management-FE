import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Customer } from "../../entities";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function CustomersTable({
  customers,
  onEditCustomer,
  onDeleteCustomer,
}: {
  customers: Customer[];
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customer: Customer) => void;
}) {
  // type Customer = {
  //     id: number;
  //     name: string;
  //     phone: string;
  //     email: string;
  //     point: number;
  //   };
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
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
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
      field: "point",
      headerName: "Point",
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
            const customerID = params.id as number;
            const customer = customers.find((c) => c.id === customerID);
            if (customer) {
              onEditCustomer(customer);
            }
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            const customerID = params.id as number;
            const customer = customers.find((c) => c.id === customerID);
            if (customer) {
              onDeleteCustomer(customer);
            }
          }}
        />,
      ],
    },
  ];
  const rows = customers.map((customer, index) => ({
    ...customer,
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
