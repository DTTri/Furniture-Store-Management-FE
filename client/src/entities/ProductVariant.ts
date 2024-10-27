import { ProductStatus } from "../constants";

type ProductVariant = {
  id: string;
  SKU: string;
  productId: string;
  price: number;
  status: ProductStatus;
  color: string;
  size: string;
  image: string;
  buyingPrice: number;
};

export default ProductVariant;
