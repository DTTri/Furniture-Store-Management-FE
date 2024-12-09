import { Category, Product } from "../../entities";
import { Button } from "@mui/material";
import AddProductDTO from "./AddProductDTO";
import { useState, useRef, useEffect } from "react";
import { categoryService, productService } from "../../services";
import http from "../../api/http";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone, { IFileWithMeta, StatusValue } from "react-dropzone-uploader";
import { toast } from "react-toastify";

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
  const [catalogues, setCatalogues] = useState<Category[]>([]);
  const [catalogueId, setCatalogueId] = useState(product?.catalogueId || 0);
  const [image, setImage] = useState(product?.image || "");
  const [warranty, setWarranty] = useState(product?.warranty || 0);

  const [presignedUrl, setPresignedUrl] = useState("");
  const [key, setKey] = useState("");
  const dropzoneRef = useRef<any>(null);

  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        const response = await categoryService.getAllCategory();
        console.log(response);
        if (response.EC === 0) {
          setCatalogues(response.DT);
          if (response.DT.length > 0) {
            setCatalogueId(response.DT[0].id);
          }
        } else {
          console.error("Failed to fetch catalogues:", response.EM);
        }
      } catch (error) {
        console.error("Error fetching catalogues:", error);
      }
    };
    fetchCatalogues();
  }, []);
  const handleChangeStatus = (
    { meta }: { meta: { name: string } },
    status: StatusValue
  ) => {
    console.log(status, meta);
  };

  const handleSubmit = async (files: IFileWithMeta[]) => {
    const f = files[0];

    try {
      const response = await http.get(
        "/file/presigned-url?fileName=" +
          f["file"].name +
          "&contentType=" +
          f["file"].type
      );
      console.log(response);
      setPresignedUrl(response.data.presignedUrl);
      setKey(response.data.key);

      // PUT request: upload file to S3
      const result = await fetch(response.data.presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": f["file"].type,
        },
        body: f["file"],
      });
      if (!result.ok) {
        throw new Error("Failed to upload image to S3");
      }
      toast("Image uploaded successfully", { type: "success" });
      console.log(result);
      return true;
    } catch (error) {
      console.error("Error uploading image:", error);
      return false;
    }
  };

  const handleAddProduct = async () => {
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
    try {
      const response = await productService.createProduct(newProductDTO);
      if (response.data.EC === 0) {
        onProductCreated(response.data.DT);
        onClose();
      } else {
        console.error("Failed to add product:", response.data.EM);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async () => {
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
    const newProductDTO: AddProductDTO = {
      name,
      description,
      catalogueId,
      warranty,
    };
    console.log(newProductDTO);
    try {
      const response = await productService.updateProduct(
        product?.id,
        newProductDTO
      );
      if (response.data.EC === 0) {
        console.log(response.data.DT);
        toast("Product updated successfully", { type: "success" });
        onProductUpdated(response.data.DT);
        onClose();
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
    if (dropzoneRef.current && dropzoneRef.current.files.length > 0) {
      const uploadSuccess = await handleSubmit(dropzoneRef.current.files);
      if (uploadSuccess) {
        handleAddProduct();
      }
    } else {
      handleAddProduct();
    }
  };

  const handleUpdateButtonClick = async () => {
    if (dropzoneRef.current && dropzoneRef.current.files.length > 0) {
      const uploadSuccess = await handleSubmit(dropzoneRef.current.files);
      if (uploadSuccess) {
        handleUpdateProduct();
      }
    } else {
      handleUpdateProduct();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/2 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
        <div className="container w-full flex justify-around ">
          <div className="image-container basis-[45%] flex justify-center items-center gap-4 overflow-hidden ">
            <Dropzone
              ref={dropzoneRef}
              onChangeStatus={handleChangeStatus}
              maxFiles={1}
              multiple={false}
              inputContent="Drop a file here or click to browse"
              accept="image/*"
              submitButtonDisabled={false}
              classNames={{
                dropzone: `w-full min-h-[250px] bg-white text-2xl text-placeHolder flex items-center justify-center text-center`,
                submitButton: "hidden",
                previewImage:
                  "w-full rounded-md flex items-center justify-center",
                submitButtonContainer: "hidden",
                inputLabel: "text-blue-500 hover:text-blue-700 cursor-pointer",
              }}
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
                className="border border-gray-300 px-2 py-1 rounded-md"
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
