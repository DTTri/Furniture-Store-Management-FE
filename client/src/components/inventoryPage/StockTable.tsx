import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Product } from "../../entities";
import { sCategory } from "../../store";

export default function StockTable({ products }: { products: Product[] }) {
  // type Product = {
  //     id: string;
  //     name: string;
  //     category: string;
  //     price: string;
  //     status: ProductStatus;
  //     image: string;
  //     description: string;
  //     warranty: number;
  //     available: number;
  //     quantity: number;
  //     defective: number;
  //     sold: number;
  //     catelogueId: string;
  //   };
  const categories = sCategory.use((v) => v.categories);
  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "STT",
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
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "catalogueId",
      headerName: "Category",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter(_, row) {
        // const category = categories.find(
        //   (category) => category.id === row.catalogueId
        // );
        // return category ? category.name : "";
        return categories[row.catalogueId - 1].name;
      },
    },
    {
      field: "price",
      headerName: "Price",
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
      field: "warranty",
      headerName: "Warranty",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "available",
      headerName: "Available",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "defective",
      headerName: "Defective",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sold",
      headerName: "Sold",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];
  const rows = products.map((product, index) => ({
    ...product,
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
      rowHeight={40}
      disableDensitySelector
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
