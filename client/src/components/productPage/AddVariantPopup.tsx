import { useState } from "react";
import { ProductVariant } from "../../entities";
import { Button } from "@mui/material";
import AddVariantDTO from "./AddVariantDTO";
import http from "../../api/http";

export default function AddVariantPopup({
  productId,
  onClose,
  onVariantCreated,
  variant,
  onVariantUpdated,
}: {
  productId: number;
  onClose: () => void;
  onVariantCreated: (variant: ProductVariant) => void;
  variant?: ProductVariant;
  onVariantUpdated: (variant: ProductVariant) => void;
}) {
  // "sku": "aaaa",
  // "buyingPrice": 10000,
  // "price": 9000,
  // "color": "green",
  // "size": "dài 25cm, rộng 30cm"
  const [sku, setSku] = useState(variant?.SKU || "");
  const [buyingPrice, setBuyingPrice] = useState(variant?.buyingPrice || 0);
  const [price, setPrice] = useState(variant?.price || 0);
  const [color, setColor] = useState(variant?.color || "");
  const [size, setSize] = useState(variant?.size || "");

  const handleAddVariant = async () => {
    if (!sku || sku === "") {
      alert("SKU is required");
      return;
    }
    if (!buyingPrice || buyingPrice === 0) {
      alert("Buying Price is required");
      return;
    }
    if (!price || price === 0) {
      alert("Price is required");
      return;
    }
    if (!color || color === "") {
      alert("Color is required");
      return;
    }
    if (!size || size === "") {
      alert("Size is required");
      return;
    }
    const newVariant: AddVariantDTO = {
      sku,
      buyingPrice,
      price,
      color,
      size,
    };
    try {
      const response = await http.post(
        "/variants/create-variant/" + productId,
        newVariant
      );
      console.log(response);
      if (response.data.EC === 0) {
        console.log("Variant created:", response.data.DT);
        onVariantCreated(response.data.DT);
        onClose();
      } else {
        console.error("Failed to add variant:", response.data.EM);
      }
    } catch (error) {
      console.error("Error adding variant:", error);
    }
  };

  const handleUpdateVariant = async () => {
    if (!sku || sku === "") {
      alert("SKU is required");
      return;
    }
    if (!buyingPrice || buyingPrice === 0) {
      alert("Buying Price is required");
      return;
    }
    if (!price || price === 0) {
      alert("Price is required");
      return;
    }
    if (!color || color === "") {
      alert("Color is required");
      return;
    }
    if (!size || size === "") {
      alert("Size is required");
      return;
    }
    const updatedVariant: AddVariantDTO = {
      sku,
      buyingPrice,
      price,
      color,
      size,
    };
    try {
      const response = await http.put(
        "/variants/update-variant/" + variant?.id,
        updatedVariant
      );
      console.log(response);
      if (response.data.EC === 0) {
        console.log("Variant updated:", response.data.DT);
        onVariantUpdated(response.data.DT);
        onClose();
      } else {
        console.error("Failed to update variant:", response.data.EM);
      }
    } catch (error) {
      console.error("Error updating variant:", error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/3 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
        <div className="container w-full flex justify-around ">
          <div className="image-container basis-[45%] flex justify-center items-center">
            <img
              src="https://via.placeholder.com/300"
              alt="variant"
              className="w-1/2 h-1/2"
            />
          </div>
          <div className="information-container basis-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="sku">SKU</label>
              <input
                id="addVariantSKUInput"
                name="sku"
                placeholder="SKU"
                className="border border-gray-300 px-2 py-1 rounded-md"
                defaultValue={sku}
                onChange={(e) => setSku(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="buyingPrice">Buying Price</label>
              <input
                type="number"
                id="addVariantBuyingPriceInput"
                name="buyingPrice"
                placeholder="Buying Price"
                className="border border-gray-300 px-2 py-1 rounded-md"
                defaultValue={buyingPrice}
                min={0}
                onChange={(e) => setBuyingPrice(Number(e.target.value))}
                style={{
                  appearance: "textfield",
                }}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="addVariantPriceInput"
                name="price"
                placeholder="Price"
                className="border border-gray-300 px-2 py-1 rounded-md"
                defaultValue={price}
                min={0}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="color">Color</label>
              <input
                id="addVariantColorInput"
                name="color"
                placeholder="Color"
                className="border border-gray-300 px-2 py-1 rounded-md"
                defaultValue={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="size">Size</label>
              <input
                id="addVariantSizeInput"
                name="size"
                placeholder="Size"
                className="border border-gray-300 px-2 py-1 rounded-md"
                defaultValue={size}
                onChange={(e) => setSize(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="buttons-container w-full flex justify-end gap-4">
          <Button
            variant="contained"
            style={{
              backgroundColor: "red",
              textTransform: "none",
            }}
            onClick={onClose}
            id="cancelAddVariantButton"
          >
            Cancel
          </Button>
          {variant ? (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleUpdateVariant}
              id="confirmUpdateVariantButton"
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleAddVariant}
              id="confirmAddVariantButton"
            >
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
