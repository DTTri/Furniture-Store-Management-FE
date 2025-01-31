import { Product } from "../../entities";
import { Button } from "@mui/material";
import AddProductDTO from "./AddProductDTO";
import { useEffect, useState } from "react";
import { productService } from "../../services";
import http from "../../api/http";
import "react-dropzone-uploader/dist/styles.css";
import { toast } from "react-toastify";
import { sCategory } from "../../store";

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
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const catalogues = sCategory.use((v) => v.categories);
  const [catalogueId, setCatalogueId] = useState(product?.catalogueId || 0);
  const [image, setImage] = useState(product?.image || "");
  const [warranty, setWarranty] = useState(product?.warranty || 0);

  useEffect(() => {
    if (catalogues.length > 0 && !product) {
      setCatalogueId(catalogues[0].id);
    }
  }, [catalogues]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (f: File) => {
    try {
      const response = await http.get(
        "/file/presigned-url?fileName=" + f.name + "&contentType=" + f.type
      );
      console.log(response);

      // PUT request: upload file to S3
      const result = await fetch(response.data.presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": f.type,
        },
        body: f,
      });
      if (!result.ok) {
        throw new Error("Failed to upload image to S3");
      }
      console.log(result);
      return response.data.key;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  const handleAddProduct = async (key: string) => {
    if (!name || name === "") {
      return;
    }

    const uploadedImage = "https://seuit-qlnt.s3.amazonaws.com/" + key;
    const newProductDTO: AddProductDTO = {
      name,
      description,
      catalogueId,
      warranty,
      image: key !== "" ? uploadedImage : undefined,
    };
    onClose();

    try {
      const response = await productService.createProduct(newProductDTO);
      if (response.data.EC === 0) {
        onProductCreated(response.data.DT);
      } else {
        console.error("Failed to add product:", response.data.EM);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async (key: string) => {
    if (!product) {
      toast("Product not found", { type: "error" });
      return;
    }
    if (
      name === product?.name &&
      description === product?.description &&
      catalogueId === product?.catalogueId &&
      warranty === product?.warranty &&
      image === product?.image
    ) {
      toast("No changes to update", { type: "error" });
      return;
    }
    if (!name || name === "") {
      toast("Name is required", { type: "error" });
      return;
    }
    if (!description || description === "") {
      toast("Description is required", { type: "error" });
      return;
    }
    if (!catalogueId) {
      toast("Catalogue is required", { type: "error" });
      return;
    }
    if (!warranty) {
      toast("Warranty is required", { type: "error" });
      return;
    }

    const newProductDTO: AddProductDTO = {
      name,
      description,
      catalogueId,
      warranty,
      image:
        key !== "" ? "https://seuit-qlnt.s3.amazonaws.com/" + key : undefined,
    };
    console.log(newProductDTO);
    onClose();

    try {
      const response = await productService.updateProduct(
        product?.id,
        newProductDTO
      );
      if (response.data.EC === 0) {
        console.log(response.data.DT);
        toast("Product updated successfully", { type: "success" });
        onProductUpdated(response.data.DT);
      } else {
        toast(response.data.EM, { type: "error" });
        console.error("Failed to update product:", response.data.EM);
      }
    } catch (error) {
      toast("Error updating product", { type: "error" });
      console.error("Error updating product:", error);
    }
  };

  const handleCreateButtonClick = async () => {
    let key = "";
    if (selectedFile) {
      key = await handleSubmit(selectedFile);
      if (key === "") {
        return;
      }
    }
    handleAddProduct(key);
  };

  const handleUpdateButtonClick = async () => {
    let key = "";
    if (selectedFile) {
      key = await handleSubmit(selectedFile);
      if (key === "") {
        return;
      }
    }
    handleUpdateProduct(key);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/2 min-w-[390px] overflow-y-auto flex flex-col gap-2">
        <h2 className="text-xl text-[#383E49] font-bold flex-1">
          {product ? "Update" : "Add new"} product
        </h2>
        <hr className="w-full border-[#E1E8F1] border-t-2" />
        <div className="container w-full flex justify-center gap-4 mb-4">
          <div className="image-container basis-[45%] flex flex-col justify-center items-center gap-4 overflow-hidden ">
            <img
              src={image !== "" ? image : "/images/chair.jpg"}
              alt="product"
              className="w-full max-h-[250px] object-contain"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  setImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
              className="mx-auto w-2/3 max-w-48 text-sm"
            />
          </div>
          <div className="add-product-information-container basis-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                id="newProductNameInput"
                name="name"
                placeholder="Tên"
                className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                required
                onChange={(e) => setName(e.target.value)}
                defaultValue={product?.name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="newProductDescriptionInput"
                name="description"
                placeholder="Mô tả"
                className="border border-gray-500 px-2 py-1 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                style={{
                  resize: "none",
                }}
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={description}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="catalogue">Category</label>
              <select
                value={catalogueId}
                name="catalogue"
                id="newProductCatalogueInput"
                onChange={(e) => {
                  console.log(e.target.value);
                  setCatalogueId(Number(e.target.value));
                }}
                className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                //defaultValue={catalogueId}
              >
                {catalogues.map((catalogue, index) => (
                  <option key={index} value={catalogue.id}>
                    {catalogue.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="warranty">Warranty (month) </label>
              <input
                type="number"
                id="newProductWarrantyInput"
                name="warranty"
                placeholder="Bảo hành"
                className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                hover:border-blue-500
                "
                min={0}
                onChange={(e) => setWarranty(Number(e.target.value))}
                defaultValue={warranty}
              />
            </div>
          </div>
        </div>
        <div className="buttons-container w-full flex justify-end gap-4">
          <Button
            variant="outlined"
            style={{
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
              onClick={handleUpdateButtonClick}
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
              onClick={handleCreateButtonClick}
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
