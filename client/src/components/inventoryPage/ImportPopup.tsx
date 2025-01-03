import { useEffect, useState } from "react";
import ProductVariant from "../../entities/ProductVariant";
import { Product } from "../../entities";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  goodsReceiptService,
  productService,
  providerService,
} from "../../services";
import CreateGoodsReceiptDTO from "./CreateGoodsReceiptDTO";
import { toast } from "react-toastify";
import { sVariant } from "../../store";
import formatMoney from "../../utils/formatMoney";

interface ReceiptTableRow {
  index: number;
  id: number;
  productName: string;
  sku: string;
  quantity: number;
  buyingPrice: number;
  cost: number;
}

export default function ImportPopup({ onClose }: { onClose: () => void }) {
  const [providers, setProviders] = useState<Product[]>([]);
  const [providerId, setProviderId] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const productVariants = sVariant.use((v) => v.variants);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [rows, setRows] = useState<ReceiptTableRow[]>([]);
  const [filteredProductVariants, setFilteredProductVariants] = useState<
    ProductVariant[]
  >([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [showDataGrid, setShowDataGrid] = useState(true); // State to control unmount and mount of DataGrid

  useEffect(() => {
    const fetchProducts = async () => {
      const productsResponse = await productService.getAllProducts();
      if (productsResponse.data.EC === 0) {
        setProducts(productsResponse.data.DT);
      } else {
        console.error("Failed to fetch products:", productsResponse.data.EM);
      }
    };
    const fetchProviders = async () => {
      try {
        const res = await providerService.getAllProviders();
        if (res.data.EC === 0) {
          setProviders(res.data.DT);
          if (res.data.DT.length > 0) {
            setProviderId(res.data.DT[0].id);
          }
        } else {
          console.error("Failed to fetch providers:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProducts();
    fetchProviders();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setFilteredProductVariants(
        productVariants.filter(
          (variant) => variant.productId === selectedProduct?.id
        )
      );
      console.log("Selected product id:", selectedProduct?.id);
      console.log(
        productVariants.filter(
          (variant) => variant.productId === selectedProduct?.id
        )
      );
    }
  }, [selectedProduct, productVariants]);

  const handleAddRow = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProduct && selectedVariant) {
      // Kiểm tra xem biến thể đã tồn tại trong bảng chưa
      const existingRow = rows.find((row) => row.id === selectedVariant.id);
      if (existingRow) {
        return;
      }

      const newRow: ReceiptTableRow = {
        index: rows.length + 1,
        id: selectedVariant.id, // Assign a unique id
        productName: selectedProduct.name,
        sku: selectedVariant.SKU,
        quantity: 1, // Default quantity
        buyingPrice: selectedVariant.buyingPrice,
        cost: selectedVariant.buyingPrice, // Default cost
      };
      setRows([...rows, newRow]);
    }
  };

  const handleDeleteRow = (id: number) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    if (updatedRows.length === 0) {
      // Tri: because there's a bug in DataGrid which Material-UI team hasn't fixed yet:
      //when delete the last row, the DataGrid doesn't re-render
      // solution: unmount and mount the DataGrid
      setShowDataGrid(false);
      setTimeout(() => {
        setRows([]);
        setShowDataGrid(true);
      }, 0);
    } else {
      // Update STT (index) for remaining rows
      const reindexedRows = updatedRows.map((row, index) => ({
        ...row,
        index: index + 1,
      }));
      setRows(reindexedRows);
    }
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedRows = rows.map((row) =>
      row.id === id
        ? { ...row, quantity, cost: quantity * row.buyingPrice }
        : row
    );
    setRows(updatedRows);
  };

  const columns: GridColDef<ReceiptTableRow>[] = [
    {
      field: "index",
      headerName: "STT",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sku",
      headerName: "SKU",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <input
          type="number"
          min={1}
          onChange={(e) =>
            handleQuantityChange(params.row.id, parseInt(e.target.value))
          }
          value={params.row.quantity}
          className="text-center w-full"
        />
      ),
    },
    {
      field: "buyingPrice",
      headerName: "Buying Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatMoney(row.buyingPrice.toString());
      },
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1.2,
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
      headerAlign: "center",
      align: "center",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params.row.id);
          }}
        />,
      ],
    },
  ];

  const [totalCost, setTotalCost] = useState(0);
  useEffect(() => {
    const newTotalCost =
      rows.reduce((acc, row) => acc + row.cost, 0) + shippingCost;
    setTotalCost(newTotalCost);
  }, [rows, shippingCost]);

  const handleImport = async () => {
    // check if shipping cost is number
    if (
      isNaN(shippingCost) ||
      shippingCost < 0 ||
      !Number.isInteger(shippingCost)
    ) {
      toast("Please enter shipping cost", { type: "error" });
      return;
    }
    if (isNaN(totalCost) || totalCost < 0) {
      toast("Invalid quantity", { type: "error" });
      return;
    }
    const goodsReceiptDetailsData = rows.map((row) => ({
      variantId: row.id,
      quantity: row.quantity,
      cost: row.cost,
    }));
    const newGoodsReceipt: CreateGoodsReceiptDTO = {
      shipping: shippingCost,
      GoodsReceiptDetailsData: goodsReceiptDetailsData,
      totalCost: totalCost,
      providerId: providerId,
    };
    console.log(newGoodsReceipt);
    try {
      const response = await goodsReceiptService.createGoodsReceipt(
        newGoodsReceipt
      );
      if (response.data.EC === 0) {
        toast("Import goods receipt successfully", { type: "success" });
        onClose();
      } else {
        toast("Failed to import goods receipt: " + response.data.EM, {
          type: "error",
        });
        console.error("Failed to import goods receipt:", response);
      }
    } catch (error) {
      toast("Failed to import goods receipt", { type: "error" });
      console.error("Error importing goods receipt:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white flex justify-between flex-wrap relative rounded-xl p-4 w-2/3 min-w-[420px] h-[80vh] max-h-[80vh] overflow-auto">
        <button className="absolute top-2 right-2" onClick={onClose}>
          x
        </button>
        <div className="add-variant-to-import basis-1/4 min-w-80 border-r-2 flex flex-col gap-4  px-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="provider" className="text-center font-bold text-lg">
              Choose provider
            </label>
            <select
              id="provider"
              onChange={(e) => setProviderId(parseInt(e.target.value))}
              className="border border-gray-500 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
            >
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-center font-bold text-lg">Choose variant</p>
            <form
              id="addRowForm"
              className="flex flex-col gap-4"
              onSubmit={handleAddRow}
            >
              <select
                id="selectedProduct"
                className="border border-gray-500 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                onChange={(e) => {
                  setSelectedVariant(null);
                  const selectedProductId = parseInt(e.target.value);
                  setSelectedProduct(
                    products.find(
                      (product) => product.id === selectedProductId
                    ) ?? null
                  );
                }}
              >
                <option value="">Choose product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <select
                id="selectedVariant"
                className="border border-gray-500 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                disabled={!selectedProduct}
                onChange={(e) => {
                  const selectedVariantId = parseInt(e.target.value);
                  setSelectedVariant(
                    filteredProductVariants.find(
                      (variant) => variant.id === selectedVariantId
                    ) ?? null
                  );
                }}
              >
                <option value="">Choose variant</option>
                {filteredProductVariants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {`${variant.SKU} - ${variant.color} - ${variant.size}`}
                  </option>
                ))}
              </select>
              <Button
                type="submit"
                variant="contained"
                style={{
                  textTransform: "none",
                }}
                id="addRowButton"
              >
                Add
              </Button>
            </form>
          </div>
        </div>
        <div className="imported-variants flex-1 h-full flex flex-col items-center gap-3">
          <h2 className="text-center text-xl font-bold">Goods Receipt</h2>

          <div className="table-container w-[98%] h-full overflow-hidden">
            {showDataGrid && (
              <DataGrid
                style={{
                  borderRadius: "20px",
                  backgroundColor: "white",
                  height: "100%",
                }}
                rows={rows}
                columns={columns}
                disableDensitySelector
                rowHeight={40}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 6,
                    },
                  },
                }}
                pageSizeOptions={
                  rows.length < 6 ? [6, rows.length] : [6, rows.length + 1]
                }
                slots={{ toolbar: GridToolbar }}
                rowSelection={false}
              />
            )}
          </div>
          <div className="flex justify-between w-full px-8">
            <input
              type="number"
              placeholder="Shipping Cost"
              className="border border-gray-500 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
              min={0}
              onChange={(e) => setShippingCost(parseInt(e.target.value))}
              id="shippingCostInput"
              value={shippingCost}
            />
            <h3 className="text-lg font-semibold">
              Total cost: {formatMoney(totalCost.toString())}
            </h3>
          </div>
          <div className="buttons-container w-full flex justify-end gap-4">
            <Button
              variant="contained"
              onClick={onClose}
              color="primary"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #1976d2",
                color: "#1976d2",
                textTransform: "none",
              }}
              id="cancelImportButton"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleImport}
              id="confirmImportButton"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
