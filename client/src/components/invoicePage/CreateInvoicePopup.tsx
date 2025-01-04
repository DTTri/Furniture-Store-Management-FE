import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, InputLabel } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProductVariant } from "../../entities";
import Customer from "../../entities/Customer";
import CreateInvoiceDTO, {
  CreateInvoiceDetailDTO,
} from "../../entities/DTO/CreateInvoiceDTO";
import Invoice from "../../entities/Invoice";
import Promotion from "../../entities/Promotion";
import {
  customerService,
  promotionService,
  variantService,
} from "../../services";
import invoiceService from "../../services/invoiceService";
import AddCustomerPopup from "../customerPage/AddCustomerPopup";
import InvoiceDetailDTO from "./InvoiceDetailDTO";
import formatMoney from "../../utils/formatMoney";

export default function CreateInvoicePopup({
  onClose,
  onInvoiceCreated,
  onInvoiceUpdated,
  updatedInvoice,
}: {
  onClose: () => void;
  onInvoiceCreated: (invoice: Invoice) => void;
  onInvoiceUpdated: (invoice: Invoice) => void;
  updatedInvoice?: Invoice | null;
}) {
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  //const [productList, setProductList] = useState<Product[]>([]);
  //const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [variantList, setVariantList] = useState<ProductVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [curPromotion, setCurPromotion] = useState<Promotion | null>(null);
  // const [staffList, setStaffList] = useState<Staff[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersResponse, variantsResponse, promtionResponse] =
          await Promise.all([
            customerService.getAllCustomers(),
            variantService.getAllVariants(),
            promotionService.getPromotionByDate(
              new Date().toISOString().slice(0, 10)
            ),
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

  const [quatanty, setQuantanty] = useState<number>(0);
  const [showDataGrid, setShowDataGrid] = useState<boolean>(true);
  const [rows, setRows] = useState<InvoiceDetailDTO[]>(    
    (updatedInvoice?.InvoiceDetails || []).map((detail) => {
      let discount = 0;
      let finalPrice = detail.unitPrice;
      if(detail.promotionId){
        const promotionProduct = curPromotion?.PromotionProducts.find(
          (promo) => promo.variantId === detail.ProductVariant?.id
        );
        if (promotionProduct) {
          discount = promotionProduct.discount
          finalPrice = Math.floor(
            detail.unitPrice -
              (detail.unitPrice * promotionProduct.discount) / 100
          );
        }
      }
      return {
        id: detail.ProductVariant?.id || 0,
        SKU: detail.ProductVariant?.SKU || "",
        quantity: detail.quantity,
        name: detail.ProductVariant?.size + " " + detail.ProductVariant?.color,
        unitPrice: Math.floor(detail.unitPrice || 0),
        discountAmount: detail.discountedAmount || 0,
        cost: Math.floor(detail.cost),
        finalPrice: finalPrice,
        promotionId: detail.promotionId,
        discount: discount,
      };
    })
  );
  const [totalCost, setTotalCost] = useState<number>(
    Math.floor(updatedInvoice?.totalCost || 0)
  );

  const [isShowAddCustomerPopup, setIsShowAddCustomerPopup] =
    useState<boolean>(false);
  const onCustomerCreated = (createdCustomer: Customer) => {
    setCustomerList([...customerList, createdCustomer]);
  };

  //Customer information
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(() => {
    if (updatedInvoice?.Customer) {
      return {
        id: updatedInvoice?.customerId || 0,
        name: updatedInvoice?.Customer?.name || "",
        phone: updatedInvoice?.Customer?.phone || "",
        email: updatedInvoice?.Customer?.email || "",
      };
    } else {
      return null;
    }
  });
  console.log("customerInfo", customerInfo);
  const [returnedCustomer, setReturnedCustomer] = useState<boolean>(false);
  const handleAddProduct = () => {
    if (!selectedVariant) {
      toast("Please select a variant", { type: "error" });
      return;
    }
    if (quatanty == 0) {
      toast("Please set quantity", { type: "error" });
      return;
    }
    if (
      selectedVariant.Inventories &&
      quatanty > (selectedVariant.Inventories[0]?.available || 0)
    ) {
      toast("Not enough product in stock", { type: "error" });
      return;
    }
    if (rows.find((row) => row.id === selectedVariant.id)) {
      toast("Product already added", { type: "error" });
      return;
    }
    console.log("selected variant " + selectedVariant);
    const newRow: InvoiceDetailDTO = {
      id: selectedVariant?.id,
      SKU: selectedVariant.SKU,
      name: selectedVariant.size + " " + selectedVariant.color,
      unitPrice: Math.floor(selectedVariant.price),
      discountAmount: 0,
      quantity: quatanty,
      discount: 0,
      finalPrice: Math.floor(selectedVariant.price),
      cost: Math.floor(selectedVariant.price * quatanty),
    };
    if (curPromotion) {
      const promotionProduct = curPromotion.PromotionProducts.find(
        (promo) => promo.variantId === selectedVariant.id
      );
      console.log("promotionProduct", promotionProduct);
      if (promotionProduct) {
        newRow.discountAmount = Math.floor(
          (selectedVariant.price * promotionProduct.discount) / 100
        );
        newRow.finalPrice = newRow.unitPrice - newRow.discountAmount;
        newRow.discount = promotionProduct.discount;
        newRow.cost = Math.floor(newRow.finalPrice * quatanty);
        newRow.promotionId = curPromotion.id;
        console.log(newRow);
      }
    }
    // else{
    //   const newRow: InvoiceDetailDTO = {
    //     id: selectedVariant?.id,
    //     SKU: selectedVariant.SKU,
    //     name: selectedVariant.size + " " + selectedVariant.color,
    //     price: Math.floor(selectedVariant.price),
    //     discountedPrice: Math.floor(selectedVariant.price),
    //     discount: 0,
    //     quantity: quatanty,
    //     cost: Math.floor(selectedVariant.price * quatanty),
    //   };
    console.log(newRow);
    setRows([...rows, newRow]);
    setTotalCost((prev) => Math.floor(prev + newRow.cost));
  };

  console.log("rows", rows);
  const handleCreateInvoice = async () => {
    if (!customerInfo) {
      toast("Please select a customer", { type: "error" });
      return;
    }
    if (rows.length === 0) {
      toast("Please add product", { type: "error" });
      return;
    }
    const rowInvoice: CreateInvoiceDetailDTO[] = rows.map((row) => {
      return {
        variantId: row.id,
        quantity: row.quantity,
        cost: row.cost,
        discountAmount: row.discountAmount,
        unitPrice: row.unitPrice,
        promotionId: row.promotionId,
      };
    });

    const createdInvoice: CreateInvoiceDTO = {
      //missing customerId, paymentMethod, createdDate
      //wait for staff global state
      customerId: customerInfo.id,
      totalCost: totalCost,
      InvoiceDetailsData: rowInvoice,
    };
    console.log("createdInvoice", createdInvoice);

    if (updatedInvoice) {
      const response = await invoiceService.updateInvoice(
        updatedInvoice.id,
        createdInvoice
      );
      if (response.data.EC === 0) {
        toast.success("Invoice updated successfully");
        console.log("update" + response.data.DT);
        onInvoiceUpdated({
          ...response.data.DT,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        toast("Failed to create invoice: " + response.data.EM, {
          type: "error",
        });
        console.log("Failed to create invoice:", response.data.EM);
      }
    } else {
      const response = await invoiceService.createInvoice(createdInvoice);
      if (response.data.EC === 0) {
        toast.success("Invoice created successfully");
        onInvoiceCreated(response.data.DT);
      } else {
        toast("Failed to create invoice: " + response.data.EM, {
          type: "error",
        });
        console.log("Failed to create invoice:", response.data.EM);
      }
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
      field: "name",
      headerName: "Variant Name",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatMoney(row.unitPrice.toString());
      },
    },
    {
      field: "discount",
      headerName: "Discount %",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      valueGetter: (_params, row) => {
        return row.discount + "%";
      },
    },
    {
      field: "discountAmount",
      headerName: "Discounted Amount",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatMoney(row.discountAmount.toString());
      },
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
      headerName: "Total",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatMoney(row.cost.toString());
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
      toast("Can't find customer information", { type: "error" });
      setCustomerInfo(null);
    }
    setReturnedCustomer(true);
  };

  const handleOnSearchVariant = () => {
    const inputElement = document.getElementById(
      "searchProductVariantInput"
    ) as HTMLInputElement;
    console.log("inputElement", inputElement.value);
    console.log("variantList", variantList);
    const searchedVariantInList = variantList.find(
      (variant) => variant.SKU === inputElement.value
    );
    console.log("searchedVariantInList", searchedVariantInList);
    if (searchedVariantInList) {
      setSelectedVariant(searchedVariantInList);
    } else {
      setSelectedVariant(null);
    }
  };

  // useEffect(() => {
  //   if (selectedProduct) {
  //     const filtedVariant = variantList.filter(
  //       (variant) => variant.productId === selectedProduct.id
  //     );
  //     setvariantFiltered(filtedVariant);
  //   }
  // }, [selectedProduct]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 max-w-[1096px] w-full max-h-[650px] overflow-auto flex flex-col gap-2">
        <h2 className="text-[22px] font-semibold text-[#383E49]">
          {updatedInvoice ? "Update Invoice" : "Create Invoice"}
        </h2>
        <hr className="w-full border-[#E1E8F1] border-t-2" />
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
                maxWidth: "140px",
              }}
            >
              Search Customer
            </Button>
            {(returnedCustomer || updatedInvoice?.Customer) &&
              (customerInfo != null ? (
                <div className="col-span-4 pr-5 w-full flex flex-row justify-between">
                  <p className="font-semibold">
                    Customer name: {customerInfo.name}
                  </p>
                  <p className="font-semibold">
                    Customer phone: {customerInfo.phone}
                  </p>
                  <p className="font-semibold">
                    Customer email: {customerInfo.email}
                  </p>
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
              ))}
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

          <div className="row-2 py-2 pb-6 px-4 grid grid-cols-[14%_1fr_24%_1fr] items-center grid-rows-[1fr_1fr_20%] gap-x-3 gap-y-4 border-b-[1px] border-b-slate-400">
            {/* <span className="text-base text-[#667085] block">Product</span>
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
            </FormControl> */}
            <InputLabel id="demo-select-small-label">
              Type Variant SKU
            </InputLabel>
            {/* <FormControl sx={{ maxWidth: 250, borderRadius: 6 }} size="small">
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
            </FormControl> */}
            <input
              type="text"
              placeholder="Search SKU"
              className="border max-w-[250px] border-slate-400 max-h-[38px] rounded-md p-[6px] px-3"
              id="searchProductVariantInput"
            />
            <div className="col-span-2 items-center gap-2 grid grid-cols-[27%_1fr]">
              <Button
                onClick={handleOnSearchVariant}
                className="col-span-1 row-span-1"
                variant="contained"
                color="primary"
                style={{
                  textTransform: "none",
                  fontSize: "14px",
                  padding: "6px",
                  maxWidth: "140px",
                  maxHeight: "35px",
                }}
              >
                Search Variant
              </Button>
              {selectedVariant && (
                <div className="col-span-1 pr-5 w-full flex flex-col items-center">
                  <div className="w-full grid grid-cols-[65%_1fr] items-center">
                    <p className="font-semibold">
                      Size: {selectedVariant.size}
                    </p>
                    <p className="font-semibold">
                      Color: {selectedVariant.color}
                    </p>
                  </div>
                  <div className="w-full grid grid-cols-[65%_1fr] items-center">
                    <p className="font-semibold text-red-500">
                      Available:{" "}
                      {selectedVariant.Inventories?.[0]?.available || 0}
                    </p>
                    <p className="font-semibold">
                      Price: {selectedVariant.price}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <span className="text-base text-[#667085] block">Quantity</span>
            <input
              type="number"
              value={quatanty}
              name="quatanty"
              placeholder="Set Quantanty"
              onChange={(e) => setQuantanty(Number.parseInt(e.target.value))}
              className="border max-w-[250px] border-slate-400 max-h-[38px] rounded-md p-[6px] px-3"
            />
            <div className="col-span-2 w-full">
              <Button
                variant="contained"
                color="primary"
                style={{
                  textTransform: "none",
                  fontSize: "14px",
                  padding: "6px",
                  width: "140px",
                }}
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
        <div className="px-3 w-full mb-3">
          <p className="text-[20px] text-[#D91316] font-bold text-end">
            Total Cost: {formatMoney(totalCost.toString())}
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
            {updatedInvoice ? "Update" : "Create"}
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
