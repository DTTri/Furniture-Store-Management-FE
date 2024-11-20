import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import CreatePromotionDTO from "./CreatePromotionDTO";
import {
  promotionService,
  productService,
  variantService,
} from "../../services";
import { Product, ProductVariant } from "../../entities";
import Promotion from "../../entities/Promotion";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { all } from "axios";

export default function AddPromotionPopup({
  onClose,
  onPromotionCreated,
  promotion,
  onPromotionUpdated,
}: {
  onClose: () => void;
  onPromotionCreated: (promotion: Promotion) => void;
  promotion?: Promotion;
  onPromotionUpdated: (promotion: Promotion) => void;
}) {
  const [name, setName] = useState(promotion?.name || "");
  const [description, setDescription] = useState(promotion?.description || "");
  const [startDate, setStartDate] = useState(promotion?.startDate || "");
  const [finishDate, setFinishDate] = useState(promotion?.finishDate || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [allVariants, setAllVariants] = useState<ProductVariant[]>([]);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [rows, setRows] = useState<CreatePromotionDTO["promotionProducts"]>([]);

  useEffect(() => {
    const fetchProductsAndVariants = async () => {
      const response = Promise.all([
        productService.getAllProducts(),
        variantService.getAllVariants(),
      ]);
      const [productsResponse, variantsResponse] = await response;
      if (productsResponse.data.EC === 0) {
        setProducts(productsResponse.data.DT);
      } else {
        console.error("Failed to fetch products:", productsResponse.data.EM);
      }
      if (variantsResponse.data.EC === 0) {
        setAllVariants(variantsResponse.data.DT);
      } else {
        console.error("Failed to fetch variants:", variantsResponse.data.EM);
      }
    };
    fetchProductsAndVariants();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setProductVariants(
        allVariants.filter(
          (variant) => variant.productId === selectedProduct.id
        )
      );
    }
  }, [selectedProduct, allVariants]);

  const handleAddRow = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProduct && selectedVariant) {
      const existingRow = rows.find(
        (row) => row.variantId === selectedVariant.id
      );
      if (existingRow) {
        alert("Variant already added to the promotion.");
        return;
      }

      const newRow: CreatePromotionDTO["promotionProducts"][0] = {
        variantId: selectedVariant.id,
        discount: 0,
      };
      setRows([...rows, newRow]);
    }
  };

  const handleDeleteRow = (variantId: number) => {
    const updatedRows = rows.filter((row) => row.variantId !== variantId);
    setRows(updatedRows);
  };

  const handleDiscountRateChange = (variantId: number, discount: number) => {
    const updatedRows = rows.map((row) =>
      row.variantId === variantId ? { ...row, discount } : row
    );
    setRows(updatedRows);
  };

  const handleAddPromotion = async () => {
    if (
      !name ||
      !description ||
      !startDate ||
      !finishDate ||
      rows.length === 0
    ) {
      alert("Invalid input");
      return;
    }
    try {
      // change startDate and finishDate format to yyyy-MM-dd
      const newPromotion: CreatePromotionDTO = {
        name,
        description,
        promotionProducts: rows,
        startDate: startDate.split("/").reverse().join("-"),
        finishDate: finishDate.split("/").reverse().join("-"),
      };
      console.log(newPromotion);
      const res = await promotionService.createPromotion(newPromotion);
      if (res.data.EC === 0) {
        onPromotionCreated(res.data.DT);
        onClose();
      } else {
        console.error("Failed to create promotion:", res.data.EM);
      }
    } catch (error) {
      console.error("Error creating promotion:", error);
    }
  };

  const handleUpdatePromotion = async () => {
    if (
      !name ||
      !description ||
      !startDate ||
      !finishDate ||
      rows.length === 0 ||
      !promotion
    ) {
      alert("Invalid input or promotion not found");
      return;
    }
    try {
      const updatedPromotion: CreatePromotionDTO = {
        name,
        description,
        startDate: startDate.split("/").reverse().join("-"),
        finishDate: finishDate.split("/").reverse().join("-"),
        promotionProducts: rows,
      };
      console.log(updatedPromotion);
      console.log(promotion);
      const res = await promotionService.updatePromotion({
        ...updatedPromotion,
        id: promotion.id,
      });
      if (res.data.EC === 0) {
        onPromotionUpdated(res.data.DT);
        onClose();
      } else {
        console.error("Failed to update promotion:", res.data.EM);
      }
    } catch (error) {
      console.error("Error updating promotion:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-2/3 min-w-[420px] h-[80vh] max-h-[80vh] overflow-auto">
        <button className="absolute top-2 right-2" onClick={onClose}>
          x
        </button>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              placeholder="Name"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => setName(e.target.value)}
              defaultValue={promotion?.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              placeholder="Description"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={promotion?.description}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => setStartDate(e.target.value)}
              defaultValue={promotion?.startDate.split("-").reverse().join("/")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="finishDate">Finish Date</label>
            <input
              id="finishDate"
              name="finishDate"
              type="date"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => setFinishDate(e.target.value)}
              defaultValue={promotion?.finishDate
                .split("-")
                .reverse()
                .join("/")}
            />
          </div>
          <form
            id="addRowForm"
            className="flex flex-col gap-4 p-4"
            onSubmit={handleAddRow}
          >
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
                  productVariants.find(
                    (variant) => variant.id === selectedVariantId
                  ) ?? null
                );
              }}
            >
              <option value="">Choose variant</option>
              {productVariants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {`${variant.color} - ${variant.size}`}
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
          <div className="table-container w-full h-full overflow-hidden">
            <DataGrid
              style={{
                borderRadius: "20px",
                backgroundColor: "white",
                height: "100%",
              }}
              rows={rows.map((row, index) => ({
                ...row,
                id: index + 1,
              }))}
              columns={[
                { field: "id", headerName: "ID", flex: 0.5 },
                { field: "variantId", headerName: "Variant ID", flex: 1 },
                {
                  field: "discount",
                  headerName: "Discount Rate",
                  flex: 1,
                  renderCell: (params) => (
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={params.row.discount}
                      onChange={(e) =>
                        handleDiscountRateChange(
                          params.row.variantId,
                          parseInt(e.target.value)
                        )
                      }
                    />
                  ),
                },
                {
                  field: "actions",
                  type: "actions",
                  flex: 0.5,
                  getActions: (params: GridRowParams) => [
                    <GridActionsCellItem
                      icon={<DeleteIcon />}
                      label="Delete"
                      onClick={() => handleDeleteRow(params.row.variantId)}
                    />,
                  ],
                },
              ]}
              disableDensitySelector
              rowHeight={40}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 6,
                  },
                },
              }}
              pageSizeOptions={[6, rows.length + 1]}
              slots={{ toolbar: GridToolbar }}
              rowSelection={false}
            />
          </div>
          <div className="buttons-container w-full flex justify-end gap-2">
            <Button
              variant="contained"
              style={{
                backgroundColor: "red",
                textTransform: "none",
              }}
              onClick={onClose}
              id="cancelAddPromotionButton"
            >
              Cancel
            </Button>
            {promotion ? (
              <Button
                variant="contained"
                style={{
                  textTransform: "none",
                }}
                onClick={handleUpdatePromotion}
                id="confirmUpdatePromotionButton"
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  textTransform: "none",
                }}
                onClick={handleAddPromotion}
                id="confirmAddPromotionButton"
              >
                Create
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}