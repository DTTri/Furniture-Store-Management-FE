import { useEffect, useState } from "react";
import { Product, ProductVariant } from "../../entities";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddVariantPopup from "./AddVariantPopup";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { productService, variantService } from "../../services";
import { toast } from "react-toastify";
export default function ProductDetailsPopup({
  product,
  onClose,
  onOpenUpdateProductPopup,
  onStopSellingProduct,
}: {
  product: Product;
  onClose: () => void;
  onOpenUpdateProductPopup: (product: Product) => void;
  onStopSellingProduct: () => void;
}) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  useEffect(() => {
    const fetchProductVariants = async () => {
      try {
        // get variants of the product by id
        const response = await variantService.getVariantsOfProduct(product.id);
        console.log(response);
        if (response.data.EC === 0) {
          setVariants(response.data.DT);
          setSelectedVariant(response.data.DT[0]);
        } else {
          console.error("Failed to fetch product variants:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching product variants:", error);
      }
    };
    fetchProductVariants();
  }, [product.id]);

  const handleUpdateProduct = () => {
    onOpenUpdateProductPopup(product);
    onClose();
  };
  const handleStopSelling = async () => {
    try {
      const response = await productService.stopSellingProduct(product.id);
      if (response.data.EC === 0) {
        toast.success("Product stopped selling successfully");
        onStopSellingProduct();
        onClose();
      } else {
        toast.error("Failed to stop selling: " + response.data.EM);
        console.error("Failed to stop selling:", response.data.EM);
      }
    } catch (error) {
      toast.error("Failed to stop selling");
      console.error("Error stopping selling:", error);
    }
  };
  const [isStopSellingConfirmationOpen, setIsStopSellingConfirmationOpen] =
    useState(false);

  const [isForUpdateVariant, setIsForUpdateVariant] = useState(false);
  const [isAddVariantPopupOpen, setIsAddVariantPopupOpen] = useState(false);
  const [isDeleteVariantConfirmationOpen, setIsDeleteVariantConfirmationOpen] =
    useState(false);

  const handleDeleteVariant = async () => {
    try {
      if (!selectedVariant) {
        return;
      }
      const response = await variantService.deleteVariant(selectedVariant?.id);
      if (response.data.EC === 0) {
        const updatedVariants = variants.filter(
          (variant) => variant.id !== selectedVariant?.id
        );
        toast.success("Variant deleted successfully");
        setVariants(updatedVariants);
        console.log(variants);
        setSelectedVariant(updatedVariants.length > 0 ? variants[0] : null);
        console.log(selectedVariant);
      } else {
        toast.error("Failed to delete variant");
        console.error("Failed to delete variant:", response.data.EM);
      }
    } catch (error) {
      toast.error("Failed to delete variant");
      console.error("Error deleting variant:", error);
    }
  };

  const rows = variants.map((variant, index) => {
    return {
      ...variant,
      index: index + 1,
    };
  });
  const columns: GridColDef[] = [
    { field: "index", headerName: "STT", flex: 0.5 },
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "SKU", headerName: "SKU", flex: 0.5 },
    { field: "color", headerName: "Color", flex: 1 },
    { field: "size", headerName: "Size", flex: 1 },
    { field: "buyingPrice", headerName: "Buying Price", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "actions",
      type: "actions",
      flex: 0.5,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeEditIcon />}
          label="Edit"
          onClick={() => {
            setSelectedVariant(params.row as ProductVariant);
            setIsAddVariantPopupOpen(true);
            setIsForUpdateVariant(true);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            setSelectedVariant(params.row as ProductVariant);
            setIsDeleteVariantConfirmationOpen(true);
          }}
        />,
      ],
    },
  ];
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white flex justify-around relative rounded-xl p-4 w-2/3 min-w-[420px] overflow-hidden">
        <IconButton
          style={{
            position: "absolute",
            top: "0",
            right: "0",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <div className="information-container flex flex-col gap-2 items-start w-1/3 border-r-2 border-r-black">
          <div className="product-information w-full flex flex-col gap-2">
            <p className="title text-black text-2xl font-semibold">
              Product information
            </p>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="title">Name:</td>
                  <td id="productDetailsName">{product.name}</td>
                </tr>
                <tr>
                  <td
                    className="title"
                    style={{
                      verticalAlign: "top",
                    }}
                  >
                    Mô tả:
                  </td>
                  <td>
                    <textarea
                      id="productDetailsDescription"
                      style={{
                        width: "100%",
                        resize: "none",
                      }}
                      value={product.description}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="title">Category:</td>
                  <td id="productDetailsCategory">{product.catalogueId}</td>
                </tr>
                <tr>
                  <td className="title">Price:</td>
                  <td id="productDetailsPrice">{product.price}</td>
                </tr>
                <tr>
                  <td className="title">Status:</td>
                  <td id="productDetailsStatus">{product.status}</td>
                </tr>
                <tr>
                  <td className="title">Warranty:</td>
                  <td id="productDetailsWarranty">{product.warranty}</td>
                </tr>
                <tr>
                  <td className="title">Total quantity:</td>
                  <td id="productDetailsTotalQuantity">{product.quantity}</td>
                </tr>
                <tr>
                  <td className="title">Available quantity:</td>
                  <td id="productDetailsaAvailable">{product.available}</td>
                </tr>
                <tr>
                  <td className="title">Sold quantity:</td>
                  <td id="productDetailsSold">{product.sold}</td>
                </tr>
                <tr>
                  <td className="title">Defective quantity:</td>
                  <td id="productDetailsDefective">{product.defective}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="provider-information w-full flex flex-col gap-2 items-start">
            <p className="title text-black text-2xl font-semibold">
              Provider information
            </p>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="title">Name:</td>
                  <td>Ronald Martin</td>
                </tr>
                <tr>
                  <td className="title">Phone number:</td>
                  <td>0987654321</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="buttons-container flex justify-between items-center gap-2">
            <Button
              onClick={handleUpdateProduct}
              variant="contained"
              style={{
                textTransform: "none",
              }}
              id="updateProductButton"
            >
              Update
            </Button>
            <Button
              onClick={() => setIsStopSellingConfirmationOpen(true)}
              disabled={product.status === "stop selling"}
              variant="contained"
              style={{
                textTransform: "none",
                backgroundColor: "#ff0000",
              }}
              id="stopSellingButton"
            >
              Stop selling
            </Button>
          </div>
        </div>
        <div className="variants-container w-2/3 flex flex-col items-center justify-between gap-4">
          {/* <div className="w-full flex justify-center items-center gap-4">
            <div className="variant-image h-32 w-32 overflow-hidden rounded-lg">
              <img
                src="https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg"
                alt="variant"
                className="object-cover"
              />
            </div>
            <div className="buttons-container flex gap-1">
              <IconButton
                onClick={() => {
                  setIsAddVariantPopupOpen(true);
                  setIsForUpdateVariant(true);
                }}
                style={{
                  // make this button invisible if there is no variant selected
                  visibility: selectedVariant ? "visible" : "hidden",
                }}
                id="updateVariantButton"
              >
                <ModeEditIcon />
              </IconButton>
              <IconButton
                onClick={() => setIsDeleteVariantConfirmationOpen(true)}
                style={{
                  // make this button invisible if there is no variant selected
                  visibility: selectedVariant ? "visible" : "hidden",
                }}
                id="deleteVariantButton"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
          <table className="w-5/6 ml-16 border-collapse">
            <tbody>
              <tr className="border border-gray-400">
                <td className="title font-semibold px-2 text-gray-700 border-r border-gray-400">
                  SKU
                </td>
                <td id="variantInfoSKU" className="px-2">
                  {selectedVariant ? selectedVariant.SKU : ""}
                </td>
              </tr>
              <tr className="border border-gray-400">
                <td className="title font-semibold px-2 text-gray-700 border-r border-gray-400">
                  Color
                </td>
                <td id="variantInfoColor" className="px-2">
                  {selectedVariant ? selectedVariant.color : ""}
                </td>
              </tr>
              <tr className="border border-gray-400">
                <td className="title font-semibold px-2 text-gray-700 border-r border-gray-400">
                  Size
                </td>
                <td id="variantInfoSize" className="px-2">
                  {selectedVariant ? selectedVariant.size : ""}
                </td>
              </tr>
              <tr className="border border-gray-400">
                <td className="title font-semibold px-2 text-gray-700 border-r border-gray-400">
                  Price
                </td>
                <td id="variantInfoPrice" className="px-2">
                  {selectedVariant ? Number(selectedVariant.buyingPrice) : ""}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="variant-slider w-5/6 flex gap-1 overflow-x-auto">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className={`image-container w-16 h-16 overflow-hidden hover:cursor-pointer min-w-16 ${
                  selectedVariant?.id === variant.id
                    ? "border-2 border-black"
                    : ""
                }`}
              >
                <img
                  src="https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg"
                  alt="variant"
                  className="object-cover"
                  onClick={() => setSelectedVariant(variant)}
                  id="variantSelector"
                />
              </div>
            ))}
          </div>
           */}
          <div className="w-full px-4 flex flex-col gap-2">
            <p className="title text-black text-2xl font-semibold w-full">
              Variants
            </p>
            <DataGrid
              style={{
                borderRadius: "20px",
                backgroundColor: "white",
                height: "100%",
              }}
              rows={rows}
              columns={columns}
              rowHeight={40}
              disableDensitySelector
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={
                rows.length < 5 ? [5, rows.length] : [5, rows.length + 1]
              }
              slots={{ toolbar: GridToolbar }}
              rowSelection={false}
            />
          </div>
          <Button
            variant="contained"
            onClick={() => setIsAddVariantPopupOpen(true)}
            style={{
              textTransform: "none",
            }}
            id="addVariantButton"
          >
            Add variant
          </Button>
        </div>
        {isStopSellingConfirmationOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="confirmStopSellingPopup popup bg-white p-4 rounded-xl">
              <p className="text-center">
                Are you sure that you want to stop selling this product?
                <br /> This action cannot be undone.
              </p>
              <div className="flex justify-around gap-2 mt-4">
                <Button
                  variant="contained"
                  onClick={() => setIsStopSellingConfirmationOpen(false)}
                  id="cancelStopSellingButton"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleStopSelling}
                  style={{
                    backgroundColor: "#ff0000",
                  }}
                  id="confirmStopSellingButton"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
        {isAddVariantPopupOpen && (
          <AddVariantPopup
            productId={product.id}
            onClose={() => {
              setIsAddVariantPopupOpen(false);
              setIsForUpdateVariant(false);
            }}
            onVariantCreated={(variant) => {
              setVariants([...variants, variant]);
              if (!selectedVariant) {
                setSelectedVariant(variant);
              }
            }}
            onVariantUpdated={(updatedVariant) => {
              setVariants(
                variants.map((variant) =>
                  variant.id === updatedVariant.id ? updatedVariant : variant
                )
              );
              setSelectedVariant(updatedVariant);
            }}
            variant={
              isForUpdateVariant && selectedVariant
                ? selectedVariant
                : undefined
            }
          />
        )}
        {isDeleteVariantConfirmationOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="confirmDeleteVariantPopup popup bg-white p-4 rounded-xl">
              <p className="text-center">
                Are you sure that you want to delete this variant?
                <br /> This action cannot be undone.
              </p>
              <div className="flex justify-around gap-2 mt-4">
                <Button
                  variant="contained"
                  onClick={() => setIsDeleteVariantConfirmationOpen(false)}
                  style={{
                    textTransform: "none",
                  }}
                  id="cancelDeleteVariantButton"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsDeleteVariantConfirmationOpen(false);
                    handleDeleteVariant();
                  }}
                  style={{
                    backgroundColor: "#ff0000",
                    textTransform: "none",
                  }}
                  id="confirmDeleteVariantButton"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
