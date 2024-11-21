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
import { useEffect, useState } from "react";
import http from "../../api/http";
import { Product, ProductVariant } from "../../entities";
import Customer from "../../entities/Customer";
import CreateInvoiceDTO, {
  CreateInvoiceDetailDTO,
} from "../../entities/DTO/CreateInvoiceDTO";
import {
  customerService,
  productService,
  promotionService,
  variantService,
} from "../../services";
import invoiceService from "../../services/invoiceService";
import InvoiceDetailDTO from "./InvoiceDetailDTO";
import AddCustomerPopup from "../customerPage/AddCustomerPopup";
import Invoice from "../../entities/Invoice";
import Promotion from "../../entities/Promotion";

export default function CreateInvoicePopup({
  onClose,
  onInvoiceCreated,
}: {
  onClose: () => void;
  onInvoiceCreated: (invoice: Invoice) => void;
}) {
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [variantList, setVariantList] = useState<ProductVariant[]>([]);
  const [variantFiltered, setvariantFiltered] = useState<ProductVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [curPromotion, setCurPromotion] = useState<Promotion | null>(null);
  // const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          customersResponse,
          productResponse,
          variantsResponse,
          promtionResponse,
        ] = await Promise.all([
          customerService.getAllCustomers(),
          productService.getAllProducts(),
          variantService.getAllVariants(),
          promotionService.getPromotionByDate(
            new Date().toISOString().slice(0, 10)
          ),
        ]);
        console.log(promtionResponse.data.DT);
        if (customersResponse.data.EC === 0) {
          setCustomerList(customersResponse.data.DT);
        } else {
          console.log("Failed to fetch customers:", customersResponse.data.EM);
        }

        if (productResponse.data.EC === 0) {
          setProductList(productResponse.data.DT);
        } else {
          console.log("Failed to fetch products:", productResponse.data.EM);
        }

        if (variantsResponse.data.EC === 0) {
          setVariantList(variantsResponse.data.DT);
          setvariantFiltered(variantsResponse.data.DT);
        } else {
          console.log("Failed to fetch variants:", variantsResponse.data.EM);
        }

        if (promtionResponse.data.EC === 0) {
          setCurPromotion(promtionResponse.data.DT);
        } else {
          console.log("Failed to fetch promotion:", variantsResponse.data.EM);
        }
      } catch (error) {
        console.error("Error fetching promotion:", error);
      }
    };
    fetchData();
  }, []);

  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const [variantSelected, setVariantSelected] = useState<number>(0);
  const [promotionSelected, setPromotionSelected] = useState<number>(1);
  const [quatanty, setQuantanty] = useState<number>(0);
  const [showDataGrid, setShowDataGrid] = useState<boolean>(true);
  const [rows, setRows] = useState<InvoiceDetailDTO[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  const [isShowAddCustomerPopup, setIsShowAddCustomerPopup] =
    useState<boolean>(false);
  const onCustomerCreated = (createdCustomer: Customer) => {
    setCustomerList([...customerList, createdCustomer]);
  };
  //Customer information
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  const handleAddProduct = () => {
    if (!selectedVariant) {
      alert("Please select variant");
      return;
    }
    if (quatanty == 0) {
      alert("Please set quatanty");
      return;
    }
    if (rows.find((row) => row.id === selectedVariant.id)) {
      alert("This variant already exists");
      return;
    }
    const newRow: InvoiceDetailDTO = {
      id: selectedVariant?.id,
      SKU: selectedVariant.SKU,
      buyingPrice: selectedVariant.buyingPrice,
      promotion: promotionSelected,
      quantity: quatanty,
      cost: selectedVariant.buyingPrice * quatanty,
    };
    console.log(newRow);
    setRows([...rows, newRow]);
    setTotalCost((prev) => prev + newRow.cost);
  };

  const handleCreateInvoice = async () => {
    if (!customerInfo) {
      alert("Please select customer");
      return;
    }
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
      //wait for staff global state
      staffId: 0,
      customerId: customerInfo.id || 0,
      totalCost: totalCost,
      InvoiceDetailsData: rowInvoice,
    };
    console.log("createdInvoice", createdInvoice);
    const response = await invoiceService.createInvoice(createdInvoice);
    if (response.EC === 0) {
      onInvoiceCreated(response.DT);
      onClose();
    } else {
      console.log("Failed to create invoice:", response.EM);
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
      field: "variantName",
      headerName: "Variant Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (value, row) => {
        console.log(row);
        return row.size + " " + row.color;
      },
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
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      editable: true,
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

  const handOnSearchCustomerInfo = () => {
    const inputElement = document.getElementById(
      "customerPhoneInput"
    ) as HTMLInputElement;
    const searchedCustomer = customerList.find(
      (customer) => customer.phone === inputElement.value
    );
    if (searchedCustomer) {
      setCustomerInfo(searchedCustomer);
    } else {
      setCustomerInfo(null);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      console.log("selectedProduct", selectedProduct);
      const filtedVariant = variantList.filter(
        (variant) => variant.productId === selectedProduct.id
      );
      console.log("filtedVariant", filtedVariant);
      setvariantFiltered(filtedVariant);
    }
  }, [selectedProduct]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 max-w-[1096px] w-full max-h-[650px] overflow-auto relative">
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
          <div className="row-1 py-4 px-4 grid grid-cols-[14%_1fr_24%_1fr] items-center grid-rows-[50%_50%] gap-x-3 gap-y-3 border-b-[1px] border-b-slate-400">
            <span className="text-base text-[#667085] block">
              Customer phone
            </span>
            <input
              placeholder="Fill Customer Phone"
              id="customerPhoneInput"
              maxLength={10}
              type="tel"
              className="border max-w-[250px] border-slate-400 max-h-[38px] rounded-md p-[6px] px-3"
            />
            <Button
              onClick={handOnSearchCustomerInfo}
              className="col-span-2"
              variant="contained"
              color="primary"
              style={{
                textTransform: "none",
                fontSize: "14px",
                padding: "6px",
                maxWidth: "100px",
              }}
            >
              Search
            </Button>
            {customerInfo ? (
              <div className="col-span-4 pr-5 w-full flex flex-row justify-between">
                <p>Customer name: {customerInfo.name}</p>
                <p>Customer phone: {customerInfo.phone}</p>
                <p>Customer email: {customerInfo.email}</p>
              </div>
            ) : (
              <div className="col-span-4 ro w-full flex flex-row items-center gap-2">
                <p>Can't find customer information?</p>
                <a
                  className="text-blue-500 font-semibold underline cursor-pointer "
                  onClick={() => {
                    setIsShowAddCustomerPopup(true);
                  }}
                >
                  Add new Customer
                </a>
              </div>
            )}
            {/* <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
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
            </FormControl> */}
            {/* <span className="text-base text-[#667085] block">
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
            </FormControl> */}
          </div>

          <div className="row-2 py-2 pb-6 px-4 grid grid-cols-[14%_1fr_14%_1fr] items-center grid-rows-[1fr_20%] gap-x-3 gap-y-4 border-b-[1px] border-b-slate-400">
            <span className="text-base text-[#667085] block">Product</span>
            <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Product
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                label="Select Variant SKU"
                id="demo-select-small"
                value={selectedVariant?.id}
                onChange={(e) => {
                  setSelectedVariant(null);
                  setSelectedProduct(
                    productList.find(
                      (product) => product.id === e.target.value
                    ) ?? null
                  );
                }}
              >
                {productList.map((product, index) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <InputLabel id="demo-select-small-label">
              Select Variant SKU
            </InputLabel>
            <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select Variant SKU
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                label="Select Variant SKU"
                id="demo-select-small"
                value={selectedVariant?.id}
                onChange={(e) => {
                  setSelectedVariant(
                    variantFiltered.find(
                      (variant) => variant.id === e.target.value
                    ) ?? null
                  );
                }}
              >
                {variantFiltered.map((variant, index) => (
                  <MenuItem key={variant.id} value={variant.id}>
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
              className="border max-w-[250px] border-slate-400 max-h-[38px] rounded-md p-[6px] px-3"
            />
            <div className="col-span-2 w-full flex flex-row justify-end">
              <Button
                variant="contained"
                color="primary"
                style={{ textTransform: "none", marginRight: "100px" }}
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
        <div className="px-3 w-full flex flex-row items-center justify-between mb-3">
          <div className="flex flex-row items-center gap-3 px-2">
            <input
              className="w-4 h-4"
              type="checkbox"
              onChange={(e) => {
                console.log(curPromotion);
                if (!curPromotion) {
                  alert("There is no promotion event today");
                  return;
                }
                if (e.target.checked) {
                  const discountedRows = rows.map((row) => {
                    const promotionProduct = curPromotion.promotionProducts.find(
                        (promo) => promo.variantId === row.id
                      );
                      if (promotionProduct) {
                      console.log(promotionProduct.discount );
                      return {
                        ...row,
                        cost:
                          row.cost -
                          (row.cost * promotionProduct.discount) / 100,
                      };
                    }
                    return row;
                  });
                  console.log(discountedRows);
                  setRows(discountedRows);
                } else {
                  // const restoredRows = rows.map((row) => {
                  //   if (row?.originalCost !== undefined) {
                  //     return {
                  //       ...row,
                  //       cost: row.originalCost, // Khôi phục giá trị gốc của cost
                  //       originalCost: undefined, // Xóa thuộc tính originalCost
                  //     };
                  //   }
                  //   return row;
                  // });
                  // setRows(restoredRows);
                }
              }}
            />
            <span className="font-medium text-[16px]">
              Apply promotion event
            </span>
          </div>
          <p className="text-[20px] text-[#D91316] font-bold text-end">
            Total Cost: {totalCost}
          </p>
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
      {isShowAddCustomerPopup && (
        <AddCustomerPopup
          onCustomerUpdated={() => {}}
          onCustomerCreated={onCustomerCreated}
          onClose={() => {
            setIsShowAddCustomerPopup(false);
          }}
        />
      )}
    </div>
  );
}
