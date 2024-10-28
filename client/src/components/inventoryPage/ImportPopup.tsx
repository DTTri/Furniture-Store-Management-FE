import { useEffect, useState } from "react";
import ProductVaraint from "../../entities/ProductVariant";
import { Product } from "../../entities";
import http from "../../api/http";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

interface ReceiptTableRow {
  id: number;
  productName: string;
  sku: string;
  quantity: number;
  buyingPrice: number;
  cost: number;
}
export default function ImportPopup({ onClose }: { onClose: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productVariants, setProductVariants] = useState<ProductVaraint[]>([]);
  useEffect(() => {
    const fetchProductsAndVariants = async () => {
      const response = Promise.all([
        http.get("/products/get-all-products"),
        http.get("/variants"),
      ]);
      const [productsResponse, variantsResponse] = await response;
      if (productsResponse.data.EC === 0) {
        setProducts(productsResponse.data.DT);
      } else {
        console.error("Failed to fetch products:", productsResponse.data.EM);
      }
      if (variantsResponse.data.EC === 0) {
        setProductVariants(variantsResponse.data.DT);
        console.log(variantsResponse.data.DT);
      } else {
        console.error("Failed to fetch variants:", variantsResponse.data.EM);
      }
    };
    fetchProductsAndVariants();
  }, []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVaraint | null>(
    null
  );
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [rows, setRows] = useState<ReceiptTableRow[]>([]);
  const handleAddRow = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProduct && selectedVariant) {
      const newRow: ReceiptTableRow = {
        id: rows.length + 1, // Assign a unique id
        productName: selectedProduct.name,
        sku: selectedVariant.SKU,
        quantity: currentQuantity,
        buyingPrice: selectedVariant.buyingPrice,
        cost: currentQuantity * selectedVariant.buyingPrice,
      };
      setRows([...rows, newRow]);
    }
  };

  const [filteredProductVariants, setFilteredProductVariants] = useState<
    ProductVaraint[]
  >([]);
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
  const [shippingCost, setShippingCost] = useState(0);
  const [showDataGrid, setShowDataGrid] = useState(true); // State to control unmount and mount of DataGrid

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
        id: index + 1,
      }));
      setRows(reindexedRows);
    }
  };
  const columns: GridColDef<ReceiptTableRow>[] = [
    { field: "id", headerName: "STT", flex: 0.5 },
    { field: "productName", headerName: "Product Name", flex: 2 },
    {
      field: "sku",
      headerName: "SKU",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 2,
    },
    {
      field: "buyingPrice",
      headerName: "Buying Price",
      flex: 2,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.5,
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
    const newTotalCost = rows.reduce((acc, row) => acc + row.cost, 0);
    setTotalCost(newTotalCost);
  }, [rows]);
  const handleImport = async () => {
    // type CreateGoodsReceiptDTO = {
    //   shipping: number;
    //   GoodsReceiptDetailsData: GoodsReceiptDetailsData[];
    //   totalCost: number;
    // };

    // type GoodsReceiptDetailsData = {
    //   variantId: number;
    //   quantity: number;
    //   cost: number;
    // };
    // map rows and fields to CreateGoodsReceiptDTO
    const goodsReceiptDetailsData = rows.map((row) => ({
      variantId: productVariants.find((variant) => variant.SKU === row.sku)?.id,
      quantity: row.quantity,
      cost: row.cost,
    }));
    const newGoodsReceipt = {
      shipping: shippingCost,
      GoodsReceiptDetailsData: goodsReceiptDetailsData,
      totalCost: totalCost,
    };
    console.log(newGoodsReceipt);
    try {
      const response = await http.post(
        "/goods-receipt/create-goods-receipt",
        newGoodsReceipt
      );
      if (response.data.EC === 0) {
        alert("Import successfully");
        onClose();
      } else {
        alert("Import failed");
        console.error("Failed to import goods receipt:", response);
      }
    } catch (error) {
      console.error("Error importing goods receipt:", error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white flex justify-between flex-wrap gap-4 relative rounded-xl p-4 w-2/3 min-w-[420px] h-[80vh] max-h-[80vh] overflow-auto">
        <button className="absolute top-2 right-2" onClick={onClose}>
          x
        </button>
        <div className="add-variant-to-import basis-1/3 min-w-96 border-r-2">
          <h3 className="text-center font-bold">Choose variant</h3>
          <form className="flex flex-col gap-4 p-4" onSubmit={handleAddRow}>
            <select
              id="selectedProduct"
              className="border border-gray-300 rounded-md p-1"
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
              className="border border-gray-300 rounded-md p-1"
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
                  {`${variant.color} - ${variant.size}`}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Số lượng"
              className="border border-gray-300 rounded-md p-1"
              id="importQuantity"
              required
              min={1}
              defaultValue={currentQuantity}
              onChange={(e) => setCurrentQuantity(parseInt(e.target.value))}
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                textTransform: "none",
              }}
            >
              Add
            </Button>
          </form>
        </div>
        <div className="imported-variants basis-[58%] h-full flex flex-col items-center gap-3">
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
              className="border border-gray-300 rounded-md p-1"
              min={0}
              onChange={(e) => setShippingCost(parseInt(e.target.value))}
            />
            <h3 className="text-lg font-semibold">Total cost: {totalCost}</h3>
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
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleImport}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
