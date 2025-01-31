import { Provider } from "../../entities";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { sUser } from "../../store";

export default function ProvidersTable({
  providers,
  onEditProvider,
}: {
  providers: Provider[];
  onEditProvider: (provider: Provider) => void;
}) {
  // type Provider = {
  //     id: number;
  //     name: string;
  //     address: string;
  //     phone: string;
  //     email: string;
  //     president: string;
  //     status: ProviderStatus;
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
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: "Address",
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
      field: "president",
      headerName: "President",
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
      field: "actions",
      type: "actions",
      flex: 0.5,
      getActions: (params: GridRowParams) => {
        return userPermissions.includes(52)
          ? [
              <GridActionsCellItem
                icon={<ModeEditIcon />}
                label="Edit"
                onClick={() => {
                  const providerID = params.id as number;
                  const provider = providers.find((p) => p.id === providerID);
                  if (provider) {
                    onEditProvider(provider);
                  }
                }}
              />,
            ]
          : [];
      },
    },
  ];
  const rows = providers.map((provider, index) => ({
    ...provider,
    index: index + 1,
  }));
  return (
    <>
      {userPermissions.includes(54) && (
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
