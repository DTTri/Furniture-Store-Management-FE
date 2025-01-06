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
import formatMoney from "../../utils/formatMoney";
import { sUser } from "../../store";
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
    {
      field: "index",
      headerName: "STT",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "SKU",
      headerName: "SKU",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "color",
      headerName: "Color",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "size",
      headerName: "Size",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "buyingPrice",
      headerName: "Buying Price",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (_, row) => {
        return formatMoney(row.buyingPrice.toString());
      },
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (_, row) => {
        return formatMoney(row.price.toString());
      },
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeEditIcon />}
          label="Edit"
          onClick={() => {
            setSelectedVariant(params.row as ProductVariant);
            setIsAddVariantPopupOpen(true);
            setIsForUpdateVariant(true);
          }}
          style={{
            visibility: userPermissions.includes(12) ? "visible" : "hidden",
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            setSelectedVariant(params.row as ProductVariant);
            setIsDeleteVariantConfirmationOpen(true);
          }}
          style={{
            visibility: userPermissions.includes(13) ? "visible" : "hidden",
          }}
        />,
      ],
    },
  ];
  const userPermissions = sUser.use((v) => v.permissions);
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white flex justify-around relative rounded-xl py-4 px-3 w-2/3 min-w-[420px] overflow-hidden">
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

        <div className="information-container flex flex-col gap-2 items-center justify-between basis-2/5 border-r-2 border-r-black">
          <div className="product-information w-full flex flex-col items-center gap-4 overflow-y-auto">
            <div className="w-full">
              <p className="title text-black text-2xl font-semibold">
                Product information
              </p>
            </div>
            <div className="product-image w-40 h-40 overflow-hidden rounded-t-lg">
              <img
                src={
                  product.image && product.image !== ""
                    ? product.image
                    : "/images/chair.jpg"
                }
                alt="product"
                className="object-contain w-full h-full"
              />
            </div>
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
                    Description:
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
              </tbody>
            </table>
          </div>
          <div className="buttons-container flex justify-between items-center gap-4">
            {userPermissions.includes(6) && (
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
            )}
            {userPermissions.includes(7) && (
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
            )}
          </div>
        </div>
        <div className="variants-container basis-3/5 flex flex-col items-center justify-between gap-4">
          <div className="w-full h-full px-4 flex flex-col gap-2">
            <p className="title text-black text-2xl font-semibold w-full">
              Variants
            </p>
            {userPermissions.includes(14) && (
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
            )}
          </div>
          {userPermissions.includes(11) && (
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
          )}
        </div>
        {isStopSellingConfirmationOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="confirmStopSellingPopup popup bg-white p-4 rounded-xl">
              <p className="text-center">
                Are you sure that you want to stop selling this product?
                <br /> This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4 mt-4">
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
