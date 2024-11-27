import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { InvoiceDetailTable } from "../../components";
import CreateInvoicePopup from "../../components/invoicePage/CreateInvoicePopup";
import Invoice from "../../entities/Invoice";
import invoiceService from "../../services/invoiceService";
import PayInvoicePopup from "../../components/invoicePage/PayInvoicePopup";

export default function InvoicePage() {
  const [isCreateInvoicePopupOpen, setIsCreateInvoicePopupOpen] =
    useState<boolean>(false);
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [isInvoiceDetailPopupOpen, setIsInvoiceDetailPopupOpen] =
    useState(false);
  const [isPayInvoicePopupOpen, setIsPayInvoicePopupOpen] =
    useState(true);

  const handleOnCloseDetail = () => {
    setIsInvoiceDetailPopupOpen(false);
  };
  const handleOnClosePayInvoice = () => {
    setIsPayInvoicePopupOpen(false);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await invoiceService.getAllInvoice();
        if (response.EC === 0) {
          const invoices = response.DT.map((invoice: any, index: number) => {
            return {
              ...invoice,
              index: index + 1,
            };
          });
          setInvoiceList(invoices);
        } else {
          console.log("Failed to fetch invoices:", response.EM);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

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
        const dateTime = format(new Date(params), "dd/MM/yyyy '--' HH:mm:ss");
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
  return (
    <div className="bg-white w-full h-screen py-6 px-7">
      <div className="header buttons flex flex-row items-center bg-white mb-4">
        <div className="search-bar w-[30%] px-1 mr-4 flex flex-row items-center border border-slate-400 rounded-xl overflow-hidden">
          <input
            type="text"
            placeholder="Search invoice"
            className="w-full py-2 px-[3px] rounded-md"
            style={{ border: "0", outline: "none" }}
            onChange={(e) => {}}
            id="searchProductInput"
          ></input>
          <SearchIcon
            className="hover:bg-slate-50 rounded-full p-1"
            sx={{ width: 35, height: 35 }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{
            textTransform: "none",
          }}
          id="addProductButton"
          onClick={() => setIsCreateInvoicePopupOpen(true)}
        >
          Add Invoice
        </Button>
      </div>
      <DataGrid
        style={{
          borderRadius: "10px",
          backgroundColor: "white",
          height: "480px",
        }}
        columns={columns}
        rows={invoiceList}
        rowHeight={40}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={
          invoiceList.length < 8
            ? [8, invoiceList.length]
            : [8, invoiceList.length + 1]
        }
        slots={{ toolbar: GridToolbar }}
        rowSelection={false}
      />
      {isCreateInvoicePopupOpen && (
        <CreateInvoicePopup
          onClose={() => setIsCreateInvoicePopupOpen(false)}
          onInvoiceCreated={(createdInvoice: Invoice) => {
            const updatedInvoiceList = [...invoiceList, createdInvoice];
            setInvoiceList(updatedInvoiceList.map((invoice, index) => ({ ...invoice, index: index + 1 })));
            setIsCreateInvoicePopupOpen(false);
            setSelectedInvoice(createdInvoice);
            setIsPayInvoicePopupOpen(true);
          }}
        />
      )}
      {isInvoiceDetailPopupOpen && selectedInvoice && (
        <PayInvoicePopup invoice={selectedInvoice} onClose={handleOnCloseDetail} />
      )}
      {isPayInvoicePopupOpen && selectedInvoice && (
        <PayInvoicePopup invoice={selectedInvoice} onClose={handleOnClosePayInvoice} />
      )}
    </div>
  );
}
