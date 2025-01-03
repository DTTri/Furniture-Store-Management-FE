import InfoIcon from "@mui/icons-material/Info";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
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
import PayInvoicePopup from "../../components/invoicePage/PayInvoicePopup";
import sInvoice from "../../store/invoiceStore";
import LoadingProgress from "../../components/LoadingProgress";
import formatMoney from "../../utils/formatMoney";
import { sUser } from "../../store";

export default function InvoicePage() {
  const [isCreateInvoicePopupOpen, setIsCreateInvoicePopupOpen] =
    useState<boolean>(false);
  const invoices = sInvoice.use((state) => state.invoices);
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [isInvoiceDetailPopupOpen, setIsInvoiceDetailPopupOpen] =
    useState(false);
  const [isPayInvoicePopupOpen, setIsPayInvoicePopupOpen] = useState(false);

  const handleOnCloseDetail = () => {
    setIsInvoiceDetailPopupOpen(false);
    setSelectedInvoice(null);
  };
  // const handleOnClosePayInvoice = () => {
  //   setIsPayInvoicePopupOpen(false);
  // };

  useEffect(() => {
    if (invoices) {
      const filteredInvoices = invoices.map((invoice, index) => {
        return {
          ...invoice,
          index: index + 1,
        };
      });
      setInvoiceList(filteredInvoices || []);
    }
  }, [invoices]);

  if (!invoiceList) {
    return <LoadingProgress />;
  }

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "Index",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      width: 15,
    },

    {
      field: "id",
      headerName: "Invoice ID",
      flex: 0.6,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "customerId",
      headerName: "Customer ID",
      flex: 0.6,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "staffId",
      headerName: "Staff ID",
      flex: 0.6,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalCost",
      headerName: "Total",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatMoney(row.totalCost.toString());
      },
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      flex: 1,
      valueFormatter: (params) => {
        const dateTime = format(new Date(params), "dd/MM/yyyy '--' HH:mm:ss");
        return dateTime;
      },
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.2,
      getActions: (params: GridRowParams) => {
        return params.row.status === "paid" || params.row.status === "canceled"
          ? [
              <GridActionsCellItem
                icon={<InfoIcon />}
                label="Info"
                onClick={() => {
                  setSelectedInvoice(params.row as Invoice);
                  setIsInvoiceDetailPopupOpen(true);
                }}
                style={{
                  visibility: userPermissions.includes(26)
                    ? "visible"
                    : "hidden",
                }}
              />,
            ]
          : [
              <GridActionsCellItem
                icon={<MonetizationOnIcon />}
                label="Pay"
                onClick={() => {
                  setSelectedInvoice(params.row as Invoice);
                  setIsPayInvoicePopupOpen(true);
                }}
                style={{
                  visibility: userPermissions.includes(21)
                    ? "visible"
                    : "hidden",
                }}
              />,
            ];
      },
    },
  ];
  const userPermissions = sUser.use((state) => state.permissions);
  return (
    <div className="bg-white w-full h-full py-6 px-7">
      <div className="header buttons flex flex-row items-center bg-white mb-4">
        {userPermissions.includes(21) && (
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
        )}
      </div>
      {userPermissions.includes(25) && (
        <DataGrid
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            height: "fit-content",
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
      )}
      {isCreateInvoicePopupOpen && (
        <CreateInvoicePopup
          onClose={() => {
            setIsCreateInvoicePopupOpen(false);
            setSelectedInvoice(null);
          }}
          onInvoiceCreated={(createdInvoice: Invoice) => {
            sInvoice.set((v) => {
              v.value.invoices.push(createdInvoice);
            });
            setInvoiceList([...invoiceList, createdInvoice]);
            console.log("createdInvoice", createdInvoice);
            setIsCreateInvoicePopupOpen(false);
            setSelectedInvoice(createdInvoice);
            setIsPayInvoicePopupOpen(true);
          }}
          onInvoiceUpdated={(updatedInvoice) => {
            sInvoice.set((v) => {
              v.value.invoices = v.value.invoices.map((invoice) =>
                invoice.id === updatedInvoice.id ? updatedInvoice : invoice
              );
            });
            setInvoiceList(
              invoiceList.map((invoice) =>
                invoice.id === updatedInvoice.id ? updatedInvoice : invoice
              )
            );
            setIsCreateInvoicePopupOpen(false);
            console.log("updatedInvoice", updatedInvoice);
            setSelectedInvoice(updatedInvoice);
            setIsPayInvoicePopupOpen(true);
          }}
          updatedInvoice={selectedInvoice}
        />
      )}
      {isInvoiceDetailPopupOpen && selectedInvoice && (
        <InvoiceDetailTable
          invoice={selectedInvoice}
          onClose={handleOnCloseDetail}
        />
      )}
      {isPayInvoicePopupOpen && selectedInvoice && (
        <PayInvoicePopup
          onEditInvoice={(updatedInvoice) => {
            setIsPayInvoicePopupOpen(false);
            setSelectedInvoice(updatedInvoice);
            setIsCreateInvoicePopupOpen(true);
          }}
          invoice={selectedInvoice}
          onPaymentSuccess={(paidInvoice) => {
            const existedInvoice = invoiceList.find(
              (invoice) => invoice.id === paidInvoice.id
            );
            if (existedInvoice) {
              const updatedInvoiceList = invoiceList.map((invoice, index) =>
                invoice.id === paidInvoice.id
                  ? {
                      ...invoice,
                      status: paidInvoice.status,
                      index: index + 1,
                    }
                  : invoice
              );
              setInvoiceList(updatedInvoiceList);
            }
            setSelectedInvoice(null);
            setIsPayInvoicePopupOpen(false);
          }}
          onClose={() => {
            setSelectedInvoice(null);
            setIsPayInvoicePopupOpen(false);
          }}
        />
      )}
    </div>
  );
}
