import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import React from 'react'

export default function InvoiceTable() {
  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "STT",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      width: 15
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "id",
      headerName: "Mã hóa đơn",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "customerId",
      headerName: "Mã nhân viên",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "staffId",
      headerName: "Mã khách hàng",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalCost",
      headerName: "Tổng tiền",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];
  const rows = [
    {
      id: "1",
      createdAt: "2021-10-10",
      customerId: "1",
      staffId: "1",
    },
    {
      id: "2",
      createdAt: "2021-10-10",
      customerId: "1",
      staffId: "1",
    },
    {
      id: "3",
      createdAt: "2021-10-10",
      customerId: "1",
      staffId: "1",
    },
    {
      id: "4",
      createdAt: "2021-10-10",
      customerId: "1",
      staffId: "1",
    },
    {
      id: "5",
      createdAt: "2021-10-10",
      customerId: "1",
      staffId: "1",
    },
    {
      id: "6",
      createdAt: "2021-10-10",
      customerId: "1",
      staffId: "1",
    },
    {
      id: "7",
      createdAt: "2021-10-10",
      customerId: "1",
      staffId: "1",
    },
    {
      id: "8",
      createdAt: "2021-10-10",
      customerId: "1",
      staffId: "1",
    }
  ]
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
        rows.length < 8 ? [8, rows.length] : [8, rows.length + 1]
      }
      slots={{ toolbar: GridToolbar }}
      rowSelection={false}
    />
    </div>
  )
}
