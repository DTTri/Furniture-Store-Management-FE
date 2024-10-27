import { Catalogue } from "../../entities";
import { categories } from "../../constants";
import { Button } from "@mui/material";
import AddProductDTO from "./AddProductDTO";
import { useState } from "react";
import http from "../../api/http";

export default function AddProductPopup() {
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
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [catalogueId, setCatalogueId] = useState(1);
  const [warranty, setWarranty] = useState(1);
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
    const newProduct: AddProductDTO = {
      name,
      category,
      description,
      catalogueId,
      warranty,
    };
    try {
      const response = await http.post("/products/create-product", newProduct);
      console.log(response);
    } catch (error) {
      console.error("Error adding product:", error);
    }

    // call api to add product
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 w-1/2 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
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
                id="name"
                name="name"
                placeholder="Tên"
                className="border border-gray-300 px-2 py-1 rounded-md"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
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
                id="description"
                name="description"
                placeholder="Mô tả"
                className="border border-gray-300 px-2 py-1 rounded-md h-24"
                style={{
                  resize: "none",
                }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="catalogue">Catalogue</label>
              <select
                name="catalogue"
                id="catalogue"
                onChange={(e) => setCatalogueId(Number(e.target.value))}
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
                id="warranty"
                name="warranty"
                placeholder="Bảo hành"
                className="border border-gray-300 px-2 py-1 rounded-md"
                defaultValue={1}
                min={0}
                onChange={(e) => setWarranty(Number(e.target.value))}
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
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            style={{
              textTransform: "none",
            }}
            onClick={handleAddProduct}
          >
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
}
