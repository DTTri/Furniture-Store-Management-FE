import { useEffect, useState } from "react";
import ProductCard from "../../components/productPage/ProductCard";
import { Product } from "../../entities";
import ProductDetailsPopup from "../../components/productPage/ProductDetailsPopup";
import { Button } from "@mui/material";
import { AddProductPopup } from "../../components";
import { sProduct } from "../../store";

export default function ProductPage() {
  const [isProductDetailsPopupOpen, setIsProductDetailsPopupOpen] =
    useState(false);
  const products = sProduct.use((v) => v.products);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

  const [isAddProductPopupOpen, setIsAddProductPopupOpen] = useState(false);
  const [isForUpdate, setIsForUpdate] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, products]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="header w-full flex gap-4 p-4">
        <div className="search-bar w-2/5">
          <input
            type="text"
            placeholder="Search product"
            className="w-full p-2 rounded-md border border-gray-500"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            id="searchProductInput"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddProductPopupOpen(true)}
          style={{
            textTransform: "none",
          }}
          id="addProductButton"
        >
          Add product
        </Button>
      </div>

      <div
        id="productGallery"
        className="product-gallery w-full overflow-y-auto max-h-[500px] flex flex-wrap gap-4 p-4"
      >
        {filteredProducts.map((product) => (
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
          onStopSellingProduct={() => {
            // setProducts(
            //   products.map((product) =>
            //     product.id === selectedProduct.id
            //       ? { ...product, status: "stop selling" }
            //       : product
            //   )
            // );
            sProduct.set((v) => {
              v.value.products = v.value.products.map((product) =>
                product.id === selectedProduct.id
                  ? { ...product, status: "stop selling" }
                  : product
              );
            });
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
            sProduct.set((v) => {
              v.value.products.push(product);
            });
          }}
          product={isForUpdate ? selectedProduct : undefined}
          onProductUpdated={(updatedProduct) => {
            sProduct.set((v) => {
              v.value.products = v.value.products.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
              );
            });
          }}
        />
      )}
    </div>
  );
}
