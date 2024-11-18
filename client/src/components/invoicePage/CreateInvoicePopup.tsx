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
import CreateInvoiceDTO, {
  CreateInvoiceDetailDTO,
} from "../../entities/DTO/CreateInvoiceDTO";
import invoiceService from "../../services/invoiceService";
import { customerService } from "../../services";

export default function CreateInvoicePopup({
  onClose,
  onInvoiceCreated,
}: {
  onClose: () => void;
  onInvoiceCreated: (invoice: CreateInvoiceDTO) => void;
}) {
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [variantList, setVariantList] = useState<ProductVariant[]>([]);
  // const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersResponse, variantsResponse] = await Promise.all([
          customerService.getAllCustomers(),
          http.get("/variants"),
        ]);

        if (customersResponse.data.EC === 0) {
          setCustomerList(customersResponse.data.DT);
        } else {
          console.log("Failed to fetch customers:", customersResponse.data.EM);
        }

        if (variantsResponse.data.EC === 0) {
          setVariantList(variantsResponse.data.DT);
        } else {
          console.log("Failed to fetch variants:", variantsResponse.data.EM);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
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

  const [createdDate, setCreatedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  //customer and staff information
  const [staffId, setStaffId] = useState<number>();
  const [customerId, setCustomerId] = useState<number>();
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const [variantSelected, setVariantSelected] = useState<number>(0);
  const [promotionSelected, setPromotionSelected] = useState<number>(1);
  const [quatanty, setQuantanty] = useState<number>(0);
  const [showDataGrid, setShowDataGrid] = useState<boolean>(true);
  const [rows, setRows] = useState<InvoiceDetailDTO[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  const handleAddProduct = () => {
    if (quatanty == 0) {
      alert("Please set quatanty");
      return;
    }
    if (rows.find((row) => row.id === variantList[variantSelected].id)) {
      alert("This variant already exists");
      return;
    }
    const newRow: InvoiceDetailDTO = {
      id: variantList[variantSelected].id,
      SKU: variantList[variantSelected].SKU,
      buyingPrice: variantList[variantSelected].buyingPrice,
      promotion: promotionSelected,
      quantity: quatanty,
      cost: variantList[variantSelected].buyingPrice * quatanty,
    };
    console.log(newRow);
    setRows([...rows, newRow]);
    setTotalCost((prev) => prev + newRow.cost);
  };

  const handleCreateInvoice = async () => {
    if (rows.length === 0) {
      alert("Please add at least one product");
      return;
    }
    const rowInvoice: CreateInvoiceDetailDTO[] = rows.map((row) => {
      return {
        variantId: row.id,
        quantity: row.quantity,
        cost: row.cost,
      };
    });
    const createdInvoice: CreateInvoiceDTO = {
      //missing customerId, paymentMethod, createdDate
      staffId: staffId || 0,
      customerId: customerId || 0,
      totalCost: totalCost,
      InvoiceDetailsData: rowInvoice,
    };
    const response = await invoiceService.createInvoice(createdInvoice);
    if (response.data.EC === 0) {
      onInvoiceCreated(response.data.DT);
      onClose();
    } else {
      console.log("Failed to create invoice:", response.data.EM);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "SKU",
      headerName: "SKU",
      flex: 1,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
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

  console.log(variantSelected);
  console.log(variantList[variantSelected || 1]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 max-w-[1096px] w-full max-h-[700px] overflow-auto relative">
        <div className="header w-full px-2 py-2 flex flex-row items-center justify-between border-b-[1px] border-b-slate-400">
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
            <span className="text-base text-[#667085] block">
              Customer Name*
            </span>
            <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Customer Name
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                label="Select Customer Name"
                id="demo-select-small"
                name="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value as number)}
              >
                {customerList.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <span className="text-base text-[#667085] block">Staff Name*</span>
            <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Staff Name
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                label="Select Staff Name"
                id="demo-select-small"
                name="staffId"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value as number)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {/* {staffList.map((staff, index) => (
                  <MenuItem key={staff.id} value={index}>
                    {staff.name}
                  </MenuItem>
                ))} */}
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
                <MenuItem value="card">
                  <em>Credit Card</em>
                </MenuItem>
                <MenuItem value="cash">
                  <em>Cash</em>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="row-2 py-3 px-4 grid grid-cols-[8%_1fr_8%_1fr_8%_1fr] items-center grid-rows-[1fr_20%] gap-x-3 gap-y-3 border-b-[1px] border-b-slate-400">
            <span className="text-base text-[#667085] block">Variant ID</span>
            <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Variant SKU
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                label="Select Variant SKU"
                id="demo-select-small"
                value={variantSelected}
                onChange={(e) => setVariantSelected(e.target.value as number)}
              >
                {variantList.map((variant, index) => (
                  <MenuItem key={variant.id} value={index}>
                    {variant.SKU}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <span className="text-base text-[#667085] block">Quantanty</span>
            <input
              type="number"
              value={quatanty}
              name="quatanty"
              placeholder="Set Quantanty"
              onChange={(e) => setQuantanty(Number.parseInt(e.target.value))}
              className="border  max-w-[250px] border-slate-400 max-h-[38px] rounded-md mb-2 p-[6px] px-3"
            />
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
                {/* {promotionList.map((promotion, index) => (
                  <MenuItem key={promotion.id} value={index}>
                    {promotion.percent}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
            <div className="col-span-6 w-full flex flex-row justify-end mb-4">
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
        <p className="text-[20px] text-[#D91316] font-bold text-end mb-3 px-4">
          Total Cost: {totalCost}
        </p>
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
            color="primary"
            style={{
              textTransform: "none",
              fontSize: "14px",
            }}
            id="addProductButton"
            onClick={() => {
              handleCreateInvoice();
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
