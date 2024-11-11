import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getDay, set } from "date-fns";
import { daysInYear } from "date-fns/constants";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import InvoiceDetailDTO from "./InvoiceDetailDTO";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Customer from "../../entities/Customer";
import http from "../../api/http";
import { ProductVariant } from "../../entities";
import InvoiceDetail from "../../entities/InvoiceDetail";

export default function CreateInvoicePopup( { onClose }: { onClose: () => void }) {
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await http.get("/customers/get-all-customers");
        if (response.data.EC === 0) {
          setCustomerList(response.data.DT);
        } else {
          console.log("Failed to fetch customers:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);
  // const [staffList, setStaffList] = useState<Staff[]>([]);
  // useEffect(() => {
  //   const fetchStaffs = async () => {
    //     try {
      //       const response = await http.get("/staffs/get-all-staffs");
      //       if (response.data.EC === 0) {
        //         setStaffList(response.data.DT);
        //       } else {
          //         console.log("Failed to fetch customers:", response.data.EM);
          //       }
          //     } catch (error) {
            //       console.error("Error fetching customers:", error);
            //     }
            //   }
            //   fetchStaffs()
            // }, [staffList]);
            
    const [variantList, setVariantList] = useState<ProductVariant[]>([]);
    useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await http.get("/variants");
        if (response.data.EC === 0) {
          setVariantList(response.data.DT);
        } else {
          console.log("Failed to fetch variants:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };
    fetchVariants();
  }, []);

  const [createdDate, setCreatedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [staffId, setStaffId] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const [variantSelected, setVariantSelected] = useState<number>();
  const [promotionSelected, setPromotionSelected] = useState<number>(1);
  const [quatanty, setQuantanty] = useState<number>(0);
  const [showDataGrid, setShowDataGrid] = useState<boolean>(true);
  const [note, setNote] = useState<string>("");
  const [rows, setRows] = useState<InvoiceDetailDTO[]>([]);

  const handleAddProduct = () => {
    if (!variantSelected) {
      alert("Please select a variant");
      return;
    }
    if (quatanty == 0) {
      alert("Please set quatanty");
      return;
    }
    if (rows.find((row) => row.variantId === variantList[variantSelected].id)) {
      alert("This variant already exists");
      return;
    }
    const newRow: InvoiceDetailDTO = {
      variantId: variantList[variantSelected].id,
      buyingPrice: variantList[variantSelected].buyingPrice,
      promotion: promotionSelected,
      quantity: quatanty,
      cost: variantList[variantSelected].buyingPrice * quatanty,
    };
    setRows([...rows, newRow]);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "variantId",
      headerName: "VariantID",
      flex: 1,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "buyingPrice",
      headerName: "Buying Price",
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
      editable: true,
    },
    {
      field: "promotion",
      headerName: "Promotion",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params, row) => {
        return row.quantity * row.buyingPrice;
      },
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
            const updatedRows = rows.filter((row) => row.variantId !== params.row.variantId);
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
          }}
        />,
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 max-w-[1096px] w-full overflow-y-auto relative">
        <div className="header w-full px-2 py-3 flex flex-row items-center justify-between border-b-[1px] border-b-slate-400">
          <h2 className="text-[22px] font-semibold text-[#383E49]">
            Create new invoice
          </h2>
          <CloseIcon
            className="cursor-pointer hover:bg-slate-100 mb-2 rounded-full"
            sx={{ width: 25, height: 25 }}
            onClick={onClose}
          />
        </div>
        <div className="w-full grid">
          <div className="row-1 py-3 px-4 grid grid-cols-[14%_1fr_14%_1fr] items-center grid-rows-2 gap-x-3 gap-y-4 border-b-[1px] border-b-slate-400">
            <span className="text-base text-[#667085] block">Created Date</span>
            <input
              type="date"
              value={createdDate}
              name="createdDate"
              onChange={(e) => setCreatedDate(e.target.value)}
              className="border  max-w-[250px] border-slate-400 rounded-md p-[6px] pl-3 max-h-[38px]"
            />
            <span className="text-base text-[#667085] block">Customer ID*</span>
            <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Customer ID
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                label="Select Customer ID"
                id="demo-select-small"
                name="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value as string)}
              >
                {customerList.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <span className="text-base text-[#667085] block">Staff ID*</span>
            <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Staff ID
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                label="Select Staff ID"
                id="demo-select-small"
                name="staffId"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value as string)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              </Select>
            </FormControl>
            <span className="text-base text-[#667085] block">
              Payment menthod
            </span>
            <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Payment Method
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                label="Select Payment Method"
                id="demo-select-small"
                name="paymentMethod"
                onChange={(e) => setPaymentMethod(e.target.value as string)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="row-2 py-3 px-4 grid grid-cols-[14%_1fr_14%_1fr] items-center grid-rows-[1fr_1fr_20%] gap-x-3 gap-y-3 border-b-[1px] border-b-slate-400">
            <span className="text-base text-[#667085] block">Variant ID</span>
            <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Variant ID
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                label="Select Variant ID"
                id="demo-select-small"
                value={variantSelected}
                onChange={(e) => setVariantSelected(e.target.value as number)}
              >
                {variantList.map((variant, index) => (
                  <MenuItem key={variant.id} value={index}>
                    {variant.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <span className="text-base text-[#667085] block">Promotion</span>
            <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Promtotion
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                label="Select Customer ID"
                id="demo-select-small"
                name="customerId"
                value={promotionSelected}
                // onChange={handleChange} -> setPromotionSelected when promotion is set all up
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1%</MenuItem>
              </Select>
            </FormControl>
            <span className="text-base text-[#667085] block">Quantanty</span>
            <input
              type="number"
              value={quatanty}
              name="quatanty"
              placeholder="Set Quantanty"
              onChange={(e) => setQuantanty(Number.parseInt(e.target.value))}
              className="border  max-w-[250px] border-slate-400 rounded-md mb-2 p-[6px] px-3"
            />
            <span className="text-base text-[#667085] block">Note</span>
            <input
              type="text"
              name="note"
              value={note}
              placeholder="Set Note"
              onChange={(e) => setNote(e.target.value)}
              className="border  max-w-[250px] border-slate-400 rounded-md mb-2 p-[6px] px-3"
            />
            <div className="col-span-4 w-full flex flex-row justify-end">
              <Button
                variant="contained"
                color="primary"
                style={{ textTransform: "none", marginRight: "72x" }}
                onClick={handleAddProduct}
              >
                Add product
              </Button>
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
              rows={rows.map((row, index) => ({ ...row, id: index + 1 }))} 
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
                rows.length < 4 ? [4, rows.length] : [4, rows.length + 1]
              }
              slots={{ toolbar: GridToolbar }}
              rowSelection={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
