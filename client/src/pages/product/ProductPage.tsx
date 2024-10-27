import { useEffect, useState } from "react";
import ProductCard from "../../components/productPage/ProductCard";
import { Product } from "../../entities";
import ProductDetailsPopup from "../../components/productPage/ProductDetailsPopup";
import { Button } from "@mui/material";
import http from "../../api/http";
import { AddProductPopup } from "../../components";

export default function ProductPage() {
  const [isProductDetailsPopupOpen, setIsProductDetailsPopupOpen] =
    useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await http.get("/products/get-all-products");
        //console.log(response);
        if (response.data.EC === 0) {
          setProducts(response.data.DT);
        } else {
          console.error("Failed to fetch products:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

  const [isAddProductPopupOpen, setIsAddProductPopupOpen] = useState(false);
  const [isForUpdate, setIsForUpdate] = useState(false);
  return (
    <div className="bg-white w-full h-screen">
      <div className="header w-full flex gap-4 p-4">
        <div className="search-bar w-2/5">
          <input
            type="text"
            placeholder="Tìm sản phẩm"
            className="w-full p-2 rounded-md border border-gray-500"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddProductPopupOpen(true)}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <div className="product-gallery w-full h-full pb-24 overflow-y-auto flex flex-wrap gap-4 p-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSeeDetailsClick={() => {
              setSelectedProduct(product);
              setIsProductDetailsPopupOpen(true);
            }}
          />
        ))}
      </div>

      {isProductDetailsPopupOpen && (
        <ProductDetailsPopup
          product={selectedProduct}
          onClose={() => setIsProductDetailsPopupOpen(false)}
          onOpenUpdateProductPopup={(product) => {
            setSelectedProduct(product);
            setIsForUpdate(true);
            setIsAddProductPopupOpen(true);
          }}
        />
      )}
      {isAddProductPopupOpen && (
        <AddProductPopup
          onClose={() => {
            setIsAddProductPopupOpen(false);
            setIsForUpdate(false);
          }}
          onProductCreated={(product) => {
            setProducts([...products, product]);
          }}
          product={isForUpdate ? selectedProduct : undefined}
          onProductUpdated={(updatedProduct) => {
            setProducts(
              products.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
              )
            );
          }}
        />
      )}
    </div>
  );
}
