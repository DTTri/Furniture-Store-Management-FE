import React, { useEffect, useState } from "react";
import Invoice from "../../entities/Invoice";
import { customerService, invoiceService, variantService } from "../../services";
import InvoiceDetailDTO from "./InvoiceDetailDTO";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { Customer, ProductVariant } from "../../entities";

export default function PayInvoicePopup({
  onClose,
  onPaymentSuccess,
  onEditInvoice,
  invoice,
}: {
  onClose: () => void;
  onPaymentSuccess: (paidInvoice: Invoice) => void;
  onEditInvoice: (updatedInvoice: Invoice | null) => void;
  invoice: Invoice;
}) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>();
  const [variantList, setVariantList] = useState<ProductVariant[]>([]);
  const [method, setMethod] = useState<string>("");
  const [showDataGrid, setShowDataGrid] = useState<boolean>(true);
  const [rows, setRows] = useState<InvoiceDetailDTO[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const[cash, setCash] = useState<number>(0);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await invoiceService.getInvoiceById(invoice.id);

        if (response.EC === 0) {
          setSelectedInvoice(response.DT);
          setTotalCost(response.DT.totalCost);
          setRows(response.DT.InvoiceDetails);
        } else {
          console.log("Failed to fetch invoice:", response.EM);
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };
    const fetchVariants = async () => {
      try {
        const res = await variantService.getAllVariants();
        if (res.data.EC === 0) {
          setVariantList(res.data.DT);
        } else {
          console.error("Failed to fetch variants:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    }
    Promise.all([fetchInvoiceData(), fetchVariants()]);
  }, []);

  console.log(rows);

  const handleOnPayInvoice = async () => {
    if (method === "") {
      alert("Please select method payment");
      return;
    }
    if(method === "cash") {
      if(cash < totalCost) {
        alert("Cash is not enough");
        return;
      }
    }
    //consider the quantity of each product variant in the invoice is bigger than the available quantity in stock
    rows.forEach((row) => {
      const consideredVariant = variantList.find((variant) => variant.id === row.id);
      if (consideredVariant) {
        if (consideredVariant.Inventories && row.quantity > (consideredVariant.Inventories[0]?.available || 0)) {

          alert(`The quantity of ${consideredVariant.SKU} is not enough`);
          return;
        }
      }
    });
    //handle credit card payment
    try {
      const response = await invoiceService.acceptInvoice(invoice.id);
      if (response.EC === 0) {
        onPaymentSuccess(response.DT);
        onClose();
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error("Error paying invoice:", error);
    }
  }

  console.log(rows);

  const columns: GridColDef[] = [
    {
      field: "SKU",
      headerName: "SKU",
      flex: 1,
      headerAlign: "center",
      align: "center",
      editable: true,
      valueGetter: (params, row) => {
         return row.ProductVariant?.SKU;  
      }
    },
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (params, row) => {
        return row.ProductVariant?.id;  
     }
    },
    {
      field: "name",
      headerName: "Variant Name",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
      valueGetter: (params, row) => {
        return row.ProductVariant?.size + " " + row.ProductVariant?.color;  
     }
    },
    {
      field: "price",
      headerName: "Final Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params, row) => {
        return row.ProductVariant?.price
      }
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.5,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<DeleteOutlineIcon />}
          label="Delete"
          onClick={() => {
            const updatedRows = rows.filter((row) => row.id !== params.row.id);
            if (updatedRows.length === 0) {
              // Tri: because there's a bug in DataGrid which Material-UI team hasn't fixed yet:
              //when delete the last row, the DataGrid doesn't re-render
              // solution: unmount and mount the DataGrid
              setShowDataGrid(false);
              setTimeout(() => {
                setRows([]);
                setShowDataGrid(true);
              }, 0);
            }
            setRows(updatedRows);
            setTotalCost((prev) => prev - params.row.cost);
          }}
        />,
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 max-w-[1096px] w-full max-h-[650px] overflow-auto relative">
        <div className="header w-full px-2 py-2 flex flex-row items-center justify-between border-b-[1px] border-b-slate-400 mb-2">
          <h2 className="text-[22px] font-semibold text-[#383E49]">
            Pay Invoice
          </h2>
          <CloseIcon
            className="cursor-pointer hover:bg-slate-100 mb-2 rounded-full"
            sx={{ width: 25, height: 25 }}
            onClick={onClose}
          />
        </div>
        <div className="w-full grid">
          <div className="w-full px-4 flex flex-row">
            <div className="col-1 mr-[250px]">
              <p>
                Created Date: {format(invoice.createdAt, "dd/MM/yyyy HH:mm:ss")}
              </p>
              <p>Invoice ID: {invoice.id}</p>
              <p>Staff ID: {invoice.staffId}</p>
              <p>Invoice status: {invoice.status}</p>
            </div>
            <div className="col-2 w-fit">
              <p>Customer ID: {invoice.customerId}</p>
              <p>Customer name: {selectedInvoice?.Customer?.name}</p>
              <p>Customer phone: {selectedInvoice?.Customer?.phone}</p>
              <p>Customer email: {selectedInvoice?.Customer?.email}</p>
            </div>
          </div>
        </div>
        <div className="">
          {showDataGrid && (
            <DataGrid
              className="data-grid"
              style={{
                padding: "10px",
                border: "none",
                backgroundColor: "white",
                height: "100%",
              }}
              rows={rows}
              columns={columns}
              rowHeight={35}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 4,
                  },
                },
              }}
              pageSizeOptions={
                rows.length < 4 ? [4, rows.length] : [4, rows.length + 1]
              }
              slots={{ toolbar: GridToolbar }}
              rowSelection={false}
            />
          )}
        </div>

        <div className="w-full py-3 px-4 flex flex-row border-b-[1px] border-b-slate-400 mb-3">
          <div className="col-1 w-[55%] flex flex-row items-center gap-3">
            <span className="text-base text-[#667085] block">
              Method Payment
            </span>
            <FormControl sx={{ width: 230, borderRadius: 6 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Method Payment
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                label="Select Method Payment"
                id="demo-select-small"
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value);
                }}
              >
                <MenuItem value={`cash`}>Cash</MenuItem>
                <MenuItem value={`creditCard`}>Credit Card</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-span-2 w-[45%]">
            {method === "cash" ? (
                <div className="w-full flex flex-col mx-auto gap-2">
                    <p className="text-[18px] text-[#D91316] font-bold">
                    Total Cost: {totalCost}
                    </p>
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-[18px] font-boldtext-base text-[#000000] block">Cash: </span>
                        <input
                            type="number"
                            className="border border-gray-300 px-2 py-1 rounded-md"
                            onChange={(e) => {
                                setCash(Number(e.target.value));
                            }}/>
                    </div>
                    <div>
                        <span className="text-[18px] font-boldtext-base text-[#000000]">Change: {cash - totalCost}</span>
                    </div>
                </div>
            ): (
                <div className="w-full flex flex-row items-center gap-4">
                    <p className="text-[18px] text-[#D91316] font-bold">
                    Total Cost: {totalCost}
                    </p>
                    <div>
                        <Button variant="contained">QR Code</Button>
                    </div>
                </div>
            )}
          </div>
        </div>

        <div className="buttons flex flex-row justify-end items-center gap-2">
          <Button
            variant="contained"
            color="primary"
            style={{
              textTransform: "none",
              fontSize: "14px",
              backgroundColor: "#D91316",
            }}
            id=""
            onClick={onClose}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            color="success"
            style={{
              textTransform: "none",
              fontSize: "14px",
            }}
            onClick={() => onEditInvoice(selectedInvoice || null)}
            id="addProductButton"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{
              textTransform: "none",
              fontSize: "14px",
            }}
            onClick={handleOnPayInvoice}
            id="addProductButton"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}