import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Invoice from "../../entities/Invoice";
import InfoIcon from "@mui/icons-material/Info";
import http from "../../api/http";
import { format } from "date-fns";
import InvoiceDetailTable from "./InvoiceDetailTable";

export default function InvoiceTable() {
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await http.get("/invoices/get-all-invoices");
        if (response.data.EC === 0) {
          setInvoiceList(response.data.DT);
        } else {
          console.log("Failed to fetch invoices:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, [invoiceList]);

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [isInvoiceDetailPopupOpen, setIsInvoiceDetailPopupOpen] =
    useState(false);
  const handleOnClose = () => { setIsInvoiceDetailPopupOpen(false); };

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
      field: "createdAt",
      headerName: "Ngày tạo",
      flex: 1,
      valueFormatter: (params) => {
        const dateTime = format(
          new Date(params),
          "dd/MM/yyyy '--' HH:mm:ss"
        );
        return dateTime;
      },
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
    {
      field: "actions",
      type: "actions",
      flex: 0.5,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<InfoIcon />}
          label="Delete"
          onClick={() => {
            setSelectedInvoice(params.row as Invoice);
            setIsInvoiceDetailPopupOpen(true);
          }}
        />,
      ],
    },
  ];
  const rows = invoiceList.map((invoiceItem, index) => {
    return {
      ...invoiceItem,
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
      {
        isInvoiceDetailPopupOpen && selectedInvoice && (
          <InvoiceDetailTable invoice={selectedInvoice} onClose={handleOnClose}/>
        ) 
      }
    </div>
  );
}
