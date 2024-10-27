import { useEffect, useState } from "react";
import ProductCard from "../../components/productPage/ProductCard";
import { Product, ProductVaraint } from "../../entities";
import ProductDetailsPopup from "../../components/productPage/ProductDetailsPopup";
import { productVariants } from "../../data/test";
import { Button } from "@mui/material";
import http from "../../api/http";

export default function ProductPage() {
  const [isProductDetailsPopupOpen, setIsProductDetailsPopupOpen] =
    useState(false);
  const [variantsOfSelectedProduct, setVariantsOfSelectedProduct] =
    useState<ProductVaraint[]>(productVariants);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await http.get("/products/get-all-products");
        if (response.data.EC === 0) {
          setProducts(response.data.DT);
        } else {
          console.error("Failed to fetch products:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchProductVariants = async () => {
      try {
        const response = await http.get("/products/get-all-product-variants");
        if (response.data.EC === 0) {
          setVariantsOfSelectedProduct(response.data.DT);
        } else {
          console.error("Failed to fetch product variants:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching product variants:", error);
      }
    };
    fetchProducts();
  }, []);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

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
        <Button variant="contained" color="primary">
          Thêm sản phẩm
        </Button>
      </div>

      <div className="product-gallery w-full h-full pb-24 overflow-y-auto grid grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSeeDetailsClick={() => {
              setSelectedProduct(product);
              setIsProductDetailsPopupOpen(true);
              setVariantsOfSelectedProduct(
                productVariants.filter(
                  (variant) => variant.productId === product.id
                )
              );
            }}
          />
        ))}
      </div>

      {isProductDetailsPopupOpen && (
        <ProductDetailsPopup
          product={selectedProduct}
          onClose={() => setIsProductDetailsPopupOpen(false)}
        />
      )}
    </div>
  );
}
