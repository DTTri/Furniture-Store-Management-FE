import { useEffect, useState } from "react";
import Invoice from "../../entities/Invoice";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { format } from "date-fns";
import http from "../../api/http";
import Customer from "../../entities/Customer";
import { Button } from "@mui/material";
import { customerService } from "../../services";

export default function InvoiceDetailTable({
  onClose,
  invoice,
}: {
  onClose: () => void;
  invoice: Invoice;
}) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>();
  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await http.get(`/invoices/get-invoice/${invoice.id}`);
        if (response.data.EC === 0) {
          console.log(response.data);
          setSelectedInvoice(response.data.DT);
        } else {
          console.error("Failed to fetch invoice details:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching invoice details:", error);
      }
    };
    fetchInvoiceDetails();
  }, []);

  const [customer, setCustomer] = useState<Customer>();
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        console.log(selectedInvoice?.customerId);
        const response = await customerService.getCustomerById(
          selectedInvoice?.customerId || 0
        );
        if (response.data.EC === 0) {
          console.log(response.data.DT);
          console.log(selectedInvoice?.customerId);
          setCustomer(response.data.DT);
        } else {
          console.error("Failed to fetch customer:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };
    fetchCustomer();
  }, [selectedInvoice?.Customer?.id]);

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "STT",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "SKU",
      headerName: "SKU",
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
      field: "discountAmount",
      headerName: "Discounted ",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      valueGetter: (value, row) => {
        console.log(value);
        return row.discountAmount + "%";
      },
    },
    {
      field: "Price",
      headerName: "Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (value, row) => {
        console.log(value);
        return row.unitPrice;
      },
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];
  const rows = selectedInvoice?.InvoiceDetails.map((item, index) => {
    return {
      ...item,
      SKU: item.ProductVariant?.SKU || "",
      cost: Math.floor(item.cost),
      unitPrice: Math.floor(item.unitPrice),
      index: index + 1,
    };
  });
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup flex flex-col gap-4 bg-white relative rounded-xl p-4 w-2/3 h-[80vh] overflow-hidden">
        <button
          className="absolute flex flex-col items-center top-2 right-4 w-7 h-7 bg-black text-white rounded-full"
          onClick={onClose}
        >
          <span className="text-[16px] font-bold">x</span>
        </button>
        <div className="header w-full flex flex-row justify-between px-3 pt-7">
          <h3 className="font-semibold text-[28px] ">Invoice Details</h3>
          <div className="flex flex-row items-center gap-3">
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none", fontSize: "14px" }}
            >
              Xem phiếu bảo hành
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none", fontSize: "14px" }}
            >
              In hóa đơn
            </Button>
          </div>
        </div>
        <div className="w-full px-3 flex flex-row font-semibold">
          <div className="col-1 mr-[250px]">
            <p>
              Created Date:{" "}
              {format(
                selectedInvoice?.createdAt || "1/1/2024",
                "dd/MM/yyyy HH:mm:ss"
              )}
            </p>
            <p>Invoice ID: {selectedInvoice?.id || ""}</p>
            <p>Staff ID: {selectedInvoice?.staffId || ""}</p>
            <p>Invoice status: {selectedInvoice?.status || ""}</p>
          </div>
          <div className="col-2 w-fit">
            <p>Customer ID: {selectedInvoice?.customerId || ""}</p>
            <p>Customer name: {customer?.name}</p>
            <p>Customer phone: {customer?.phone}</p>
            <p>Customer email: {customer?.email}</p>
          </div>
        </div>
        <div className="w-full">
          <DataGrid
            style={{
              borderRadius: "20px",
              border: "none",
              backgroundColor: "white",
              height: "100%",
            }}
            rows={rows}
            columns={columns}
            rowHeight={40}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 4,
                },
              },
            }}
            pageSizeOptions={
              rows && rows.length < 4
                ? [4, rows.length]
                : [4, (rows?.length || 0) + 1]
            }
            slots={{ toolbar: GridToolbar }}
            rowSelection={false}
          />
        </div>
        <div className="w-full px-4 flex flex-row mb-1 justify-end">
          <p className="font-bold text-[20px] text-red-600 text-nowrap text-end">
            Total Cost: {Math.floor(invoice.totalCost)}
          </p>
        </div>
      </div>
    </div>
  );
}
