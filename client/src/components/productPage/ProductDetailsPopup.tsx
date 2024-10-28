import { useEffect, useState } from "react";
import { Product, ProductVariant } from "../../entities";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import http from "../../api/http";
import AddVariantPopup from "./AddVariantPopup";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function ProductDetailsPopup({
  product,
  onClose,
  onOpenUpdateProductPopup,
}: {
  product: Product;
  onClose: () => void;
  onOpenUpdateProductPopup: (product: Product) => void;
}) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  useEffect(() => {
    const fetchProductVariants = async () => {
      try {
        // get variants of the product by id
        const response = await http.get(
          "/variants/get-all-variants/" + product.id
        );
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
      const response = await http.put(
        "/products/stop-selling/" + product.id,
        {}
      );
      if (response.data.EC === 0) {
        alert("Stop selling successfully");
        onClose();
      } else {
        alert("Failed to stop selling: " + response.data.EM);
      }
    } catch (error) {
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
      const response = await http.delete(
        "/variants/delete-variant/" + selectedVariant?.id
      );
      if (response.data.EC === 0) {
        const updatedVariants = variants.filter(
          (variant) => variant.id !== selectedVariant?.id
        );
        setVariants(updatedVariants);
        console.log(variants);
        setSelectedVariant(updatedVariants.length > 0 ? variants[0] : null);
        console.log(selectedVariant);
      } else {
        alert("Failed to delete variant: " + response.data.EM);
      }
    } catch (error) {
      console.error("Error deleting variant:", error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white flex justify-around relative rounded-xl p-4 w-1/2 min-w-[420px] overflow-hidden">
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

        <div className="information-container flex flex-col gap-2 items-start w-1/2 border-r-2 border-r-black">
          <div className="product-information w-full flex flex-col gap-2">
            <p className="title text-black text-2xl font-semibold">
              Product information
            </p>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="title">Name:</td>
                  <td>{product.name}</td>
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
                  <td>{product.category}</td>
                </tr>
                <tr>
                  <td className="title">Price:</td>
                  <td>{product.price}</td>
                </tr>
                <tr>
                  <td className="title">Status:</td>
                  <td>{product.status}</td>
                </tr>
                <tr>
                  <td className="title">Warranty:</td>
                  <td>{product.warranty} tháng</td>
                </tr>
                <tr>
                  <td className="title">Total quantity:</td>
                  <td>{product.quantity}</td>
                </tr>
                <tr>
                  <td className="title">Available quantity:</td>
                  <td>{product.available}</td>
                </tr>
                <tr>
                  <td className="title">Sold quantity:</td>
                  <td>{product.sold}</td>
                </tr>
                <tr>
                  <td className="title">Defective quantity:</td>
                  <td>{product.defective}</td>
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
            >
              Stop selling
            </Button>
          </div>
        </div>
        <div className="variants-container w-1/2 flex flex-col items-center gap-4 justify-between">
          <p className="title text-black text-2xl font-semibold w-full px-4">
            Variants
          </p>
          <div className="w-full flex justify-center items-center gap-4">
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
              >
                <ModeEditIcon />
              </IconButton>
              <IconButton
                onClick={() => setIsDeleteVariantConfirmationOpen(true)}
                style={{
                  // make this button invisible if there is no variant selected
                  visibility: selectedVariant ? "visible" : "hidden",
                }}
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
                <td className="px-2">
                  {selectedVariant ? selectedVariant.SKU : ""}
                </td>
              </tr>
              <tr className="border border-gray-400">
                <td className="title font-semibold px-2 text-gray-700 border-r border-gray-400">
                  Color
                </td>
                <td className="px-2">
                  {selectedVariant ? selectedVariant.color : ""}
                </td>
              </tr>
              <tr className="border border-gray-400">
                <td className="title font-semibold px-2 text-gray-700 border-r border-gray-400">
                  Size
                </td>
                <td className="px-2">
                  {selectedVariant ? selectedVariant.size : ""}
                </td>
              </tr>
              <tr className="border border-gray-400">
                <td className="title font-semibold px-2 text-gray-700 border-r border-gray-400">
                  Price
                </td>
                <td className="px-2">
                  {selectedVariant ? selectedVariant.price : ""}
                </td>
              </tr>
            </tbody>
          </table>
          {/* slider for selecting variant */}
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
                />
              </div>
            ))}
          </div>
          <Button
            variant="contained"
            onClick={() => setIsAddVariantPopupOpen(true)}
            style={{
              textTransform: "none",
            }}
          >
            Add variant
          </Button>
        </div>
        {isStopSellingConfirmationOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl">
              <p className="text-center">
                Are you sure that you want to stop selling this product?
                <br /> This action cannot be undone.
              </p>
              <div className="flex justify-around gap-2 mt-4">
                <Button
                  variant="contained"
                  onClick={() => setIsStopSellingConfirmationOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleStopSelling}
                  style={{
                    backgroundColor: "#ff0000",
                  }}
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
            <div className="bg-white p-4 rounded-xl">
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
