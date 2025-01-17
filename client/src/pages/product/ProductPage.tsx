import { useEffect, useState } from "react";
import ProductCard from "../../components/productPage/ProductCard";
import { Product } from "../../entities";
import ProductDetailsPopup from "../../components/productPage/ProductDetailsPopup";
import { Button } from "@mui/material";
import { AddProductPopup } from "../../components";
import { sCategory, sProduct, sUser } from "../../store";

export default function ProductPage() {
  const [isProductDetailsPopupOpen, setIsProductDetailsPopupOpen] =
    useState(false);
  const products = sProduct.use((v) => v.products);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

  const [isAddProductPopupOpen, setIsAddProductPopupOpen] = useState(false);
  const [isForUpdate, setIsForUpdate] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const categories = sCategory.use((v) => v.categories);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          (selectedCategory === -1
            ? true
            : product.catalogueId === selectedCategory)
      )
    );
  }, [searchValue, products, selectedCategory]);

  const userPermissions = sUser.use((v) => v.permissions);
  return (
    <div className="w-full flex flex-col p-4 gap-4">
      <div className="header w-full flex gap-4 justify-between px-4 items-center">
        <h2 className="page-header">Product</h2>
        {userPermissions.includes(5) && (
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
        )}
      </div>
      <div className="filter-bar w-full flex flex-wrap gap-4">
        <div className="search-bar basis-1/4 min-w-32">
          <input
            type="text"
            placeholder="Search product"
            className="w-full p-2 rounded-md border-2 border-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent

            "
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            id="searchProductInput"
          />
        </div>
        <div className="category-filter basis-1/6 min-w-40">
          <select
            className="w-full p-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
            id="categoryFilter"
          >
            <option value={-1}>All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {userPermissions.includes(8) && (
        <div
          id="productGallery"
          className="product-gallery h-[400px] max-h-full w-full overflow-y-auto flex flex-wrap gap-4 scroll-smooth"
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
      )}

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
