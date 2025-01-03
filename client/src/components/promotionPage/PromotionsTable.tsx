import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Promotion from "../../entities/Promotion";
import formatDate from "../../utils/formatDate";
import { sUser } from "../../store";

export default function PromotionsTable({
  promotions,
  onEditPromotion,
  onDeletePromotion,
}: {
  promotions: Promotion[];
  onEditPromotion: (promotion: Promotion) => void;
  onDeletePromotion: (promotion: Promotion) => void;
}) {
  const userPermissions = sUser.use((v) => v.permissions);
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
      field: "description",
      headerName: "Description",
      flex: 2,
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
        return formatDate(row.startDate);
      },
    },
    {
      field: "finishDate",
      headerName: "Finish Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatDate(row.finishDate);
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
            const promotionID = params.id as number;
            const promotion = promotions.find((p) => p.id === promotionID);
            if (promotion) {
              onEditPromotion(promotion);
            }
          }}
          style={{
            visibility: userPermissions.includes(45) ? "visible" : "hidden",
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            const promotionID = params.id as number;
            const promotion = promotions.find((p) => p.id === promotionID);
            if (promotion) {
              onDeletePromotion(promotion);
            }
          }}
          style={{
            visibility: userPermissions.includes(47) ? "visible" : "hidden",
          }}
        />,
      ],
    },
  ];
  const rows = promotions.map((promotion, index) => ({
    ...promotion,
    index: index + 1,
  }));
  return (
    <>
      {userPermissions.includes(48) && (
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
