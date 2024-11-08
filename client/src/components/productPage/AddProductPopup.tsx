import { Catalogue, Product } from "../../entities";
import { categories } from "../../constants";
import { Button } from "@mui/material";
import AddProductDTO from "./AddProductDTO";
import { useState } from "react";
import http from "../../api/http";

export default function AddProductPopup({
  onClose,
  onProductCreated,
  product,
  onProductUpdated,
}: {
  onClose: () => void;
  onProductCreated: (product: Product) => void;
  product?: Product;
  onProductUpdated: (product: Product) => void;
}) {
  const catalogues: Catalogue[] = [
    {
      id: 1,
      name: "Bàn ghế gỗ",
    },
    {
      id: 2,
      name: "Bàn ghế sofa",
    },
  ];
  const [name, setName] = useState(product?.name || "");
  const [category, setCategory] = useState(product?.category || categories[0]);
  const [description, setDescription] = useState(product?.description || "");
  const [catalogueId, setCatalogueId] = useState(
    product?.catalogueId || catalogues[0].id
  );
  const [warranty, setWarranty] = useState(product?.warranty || 0);
  //   type AddProductDTO = {
  //     name: string;
  //     category: string;
  //     description: string;
  //     catalogueId: number;
  //     warranty: number;
  //   };

  const handleAddProduct = async () => {
    if (!name || name === "") {
      alert("Name is required");
      return;
    }
    const newProductDTO: AddProductDTO = {
      name,
      category,
      description,
      catalogueId,
      warranty,
    };
    try {
      const response = await http.post(
        "/products/create-product",
        newProductDTO
      );
      if (response.data.EC === 0) {
        onProductCreated(response.data.DT);
        onClose();
      } else {
        console.error("Failed to add product:", response.data.EM);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }

    // call api to add product
  };

  const handleUpdateProduct = async () => {
    if (
      name === product?.name &&
      category === product?.category &&
      description === product?.description &&
      catalogueId === product?.catalogueId &&
      warranty === product?.warranty
    ) {
      alert("No change to update");
      return;
    }
    if (!name || name === "") {
      alert("Name is required");
      return;
    }
    const newProductDTO: AddProductDTO = {
      name,
      category,
      description,
      catalogueId,
      warranty,
    };
    console.log(newProductDTO);
    try {
      const response = await http.put(
        "/products/update-product/" + product?.id,
        newProductDTO
      );
      if (response.data.EC === 0) {
        console.log(response.data.DT);
        onProductUpdated(response.data.DT);
        onClose();
      } else {
        console.error("Failed to update product:", response.data.EM);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/2 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
        <div className="container w-full flex justify-around ">
          <div className="image-container basis-[45%] flex justify-center items-center">
            <img
              src="https://via.placeholder.com/300"
              alt="product"
              className="w-1/2 h-1/2"
            />
          </div>
          <div className="information-container basis-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                id="newProductNameInput"
                name="name"
                placeholder="Tên"
                className="border border-gray-300 px-2 py-1 rounded-md"
                required
                onChange={(e) => setName(e.target.value)}
                defaultValue={product?.name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="newProductCategoryInput"
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="newProductDescriptionInput"
                name="description"
                placeholder="Mô tả"
                className="border border-gray-300 px-2 py-1 rounded-md h-24"
                style={{
                  resize: "none",
                }}
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={description}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="catalogue">Catalogue</label>
              <select
                name="catalogue"
                id="newProductCatalogueInput"
                onChange={(e) => setCatalogueId(Number(e.target.value))}
                defaultValue={catalogueId}
              >
                {catalogues.map((catalogue) => (
                  <option value={catalogue.id}>{catalogue.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="warranty">Warranty</label>
              <input
                type="number"
                id="newProductWarrantyInput"
                name="warranty"
                placeholder="Bảo hành"
                className="border border-gray-300 px-2 py-1 rounded-md"
                min={0}
                onChange={(e) => setWarranty(Number(e.target.value))}
                defaultValue={warranty}
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
            id="cancelAddProductButton"
          >
            Cancel
          </Button>
          {product ? (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleUpdateProduct}
              id="confirmUpdateProductButton"
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleAddProduct}
              id="confirmAddProductButton"
            >
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
