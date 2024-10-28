import { ProductStatus } from "../constants";

type ProductVariant = {
  id: number;
  SKU: string;
  productId: number;
  price: number;
  status: ProductStatus;
  color: string;
  size: string;
  image: string;
  buyingPrice: number;
};

export default ProductVariant;
