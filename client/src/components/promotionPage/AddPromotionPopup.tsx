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
import { Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import { sUser } from "../../store";
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
  console.log(promotion);
  const [isEditing, setIsEditing] = useState(false);
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
  const [showDataGrid, setShowDataGrid] = useState(true);
  const [rows, setRows] = useState<CreatePromotionDTO["promotionProducts"]>([]);
  const userPermissions = sUser.use((v) => v.permissions);
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
    if (promotion) {
      const fetchPromotionDetails = async () => {
        try {
          const res = await promotionService.getPromotionById(promotion?.id);
          if (res.data.EC === 0) {
            const promotion = res.data.DT;
            console.log(res.data.DT);

            setRows(promotion.PromotionProducts);
          } else {
            console.error("Failed to fetch promotion details:", res.data.EM);
          }
        } catch (error) {
          console.error("Error fetching promotion details:", error);
        }
      };
      fetchPromotionDetails();
    }
  }, [promotion]);

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
        return;
      }

      const newRow = {
        variantId: selectedVariant.id,
        discount: 0,
      };
      setRows([...rows, newRow]);
    }
  };

  const handleDeleteRow = (variantId: number) => {
    const updatedRows = rows.filter((row) => row.variantId !== variantId);
    if (updatedRows.length === 0) {
      setShowDataGrid(false);
      setTimeout(() => {
        setRows([]);
        setShowDataGrid(true);
      }, 0);
    } else {
      setRows(updatedRows);
    }
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
      toast("Please fill in all fields", { type: "error" });
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
        toast("Promotion created successfully", { type: "success" });
        onPromotionCreated(res.data.DT);
        onClose();
      } else {
        toast(res.data.EM, { type: "error" });
        console.error("Failed to create promotion:", res.data.EM);
      }
    } catch (error) {
      toast("Error creating promotion", { type: "error" });
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
      toast("Please fill in all fields", { type: "error" });
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
        toast("Promotion updated successfully", { type: "success" });
        onPromotionUpdated(res.data.DT);
        onClose();
      } else {
        toast("Failed to update promotion", { type: "error" });
        console.error("Failed to update promotion:", res.data.EM);
      }
    } catch (error) {
      toast("Failed to update promotion", { type: "error" });
      console.error("Error updating promotion:", error);
    }
  };

  const handleStopPromotion = async () => {
    if (!promotion) {
      toast("No promotion to stop", { type: "error" });
      return;
    }
    try {
      const res = await promotionService.stopPromotion(promotion.id);
      onClose();
      if (res.data.EC === 0) {
        toast("End promotion successfully", { type: "success" });
        onPromotionUpdated({
          ...promotion,
          finishDate: new Date().toISOString().split("T")[0],
        });
        onClose();
      } else {
        toast("Failed to stop promotion", { type: "error" });
        console.error("Failed to stop promotion:", res.data.EM);
      }
    } catch (error) {
      toast("Failed to stop promotion", { type: "error" });
      console.error("Error stopping promotion:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-2/3 min-w-[390px] max-h-[80%] overflow-y-auto relative flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-[#383E49] font-bold flex-1">
            {promotion ? "Update" : "Add new"} promotion
          </h2>
          {promotion && (
            <Edit
              sx={{ width: 32, height: 32 }}
              className=" hover:bg-slate-100 rounded-full cursor-pointer p-[2px]"
              onClick={() => setIsEditing(!isEditing)}
            />
          )}
        </div>
        <hr className="w-full border-[#E1E8F1] border-t-2 mb-2" />
        <div className="flex justify-between h-full flex-wrap">
          <div className="flex flex-col gap-4 basis-1/3 w-full mb-4">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                placeholder="Name"
                className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                required
                onChange={(e) => setName(e.target.value)}
                defaultValue={promotion?.name}
                disabled={promotion && !isEditing}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <input
                id="description"
                name="description"
                placeholder="Description"
                className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                required
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={promotion?.description}
                disabled={promotion && !isEditing}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                required
                onChange={(e) => setStartDate(e.target.value)}
                defaultValue={promotion?.startDate}
                disabled={promotion && !isEditing}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="finishDate">Finish Date</label>
              <input
                id="finishDate"
                name="finishDate"
                type="date"
                className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                required
                onChange={(e) => setFinishDate(e.target.value)}
                defaultValue={promotion?.finishDate}
                disabled={promotion && !isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 basis-[63%] w-full">
            <form
              id="addRowForm"
              className="flex w-full justify-between gap-2"
              onSubmit={handleAddRow}
            >
              <select
                id="selectedProduct"
                className="basis-[48%] w-full border border-gray-500 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                onChange={(e) => {
                  setSelectedVariant(null);
                  const selectedProductId = parseInt(e.target.value);
                  setSelectedProduct(
                    products.find(
                      (product) => product.id === selectedProductId
                    ) ?? null
                  );
                }}
                disabled={promotion && !isEditing}
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
                className="basis-1/2 w-full border border-gray-500 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                disabled={promotion && !isEditing && !selectedProduct}
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
                  width: "30%",
                }}
                id="addRowButton"
                disabled={promotion && !isEditing}
              >
                Add
              </Button>
            </form>
            <div className="table-container w-full h-full">
              {showDataGrid && (
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
                    {
                      field: "id",
                      headerName: "ID",
                      flex: 0.5,
                      headerAlign: "center",
                      align: "center",
                    },
                    {
                      field: "variant",
                      headerName: "Variant",
                      flex: 2,
                      headerAlign: "center",
                      align: "center",
                      valueGetter: (_, row) => {
                        const variant = allVariants.find(
                          (variant) => variant.id === row.variantId
                        );
                        return `${variant?.SKU} - ${variant?.color} - ${variant?.size}`;
                      },
                    },
                    {
                      field: "discount",
                      headerName: "Discount Rate",
                      flex: 1,
                      headerAlign: "center",
                      align: "center",
                      renderCell: (params) => (
                        <div className="flex justify-center">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={params.value}
                            onChange={(e) =>
                              handleDiscountRateChange(
                                params.row.variantId,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-16 text-center"
                            disabled={promotion && !isEditing}
                          />
                          <span className="ml-2 font-semibold">%</span>
                        </div>
                      ),
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
                          onClick={() => handleDeleteRow(params.row.variantId)}
                          disabled={promotion && !isEditing}
                        />,
                      ],
                    },
                  ]}
                  disableDensitySelector
                  rowHeight={40}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 3,
                      },
                    },
                  }}
                  pageSizeOptions={
                    rows.length < 3 ? [3, rows.length] : [3, rows.length + 1]
                  }
                  slots={{ toolbar: GridToolbar }}
                  rowSelection={false}
                />
              )}
            </div>
          </div>
        </div>
        <div className="buttons-container flex gap-4 w-full justify-end">
          {userPermissions.includes(46) &&
            promotion &&
            promotion.finishDate > new Date().toISOString().split("T")[0] && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "red",
                  textTransform: "none",
                }}
                onClick={handleStopPromotion}
                id="stopPromotionButton"
              >
                End promotion
              </Button>
            )}
          <Button
            variant="outlined"
            style={{
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
              disabled={promotion && !isEditing}
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
  );
}
