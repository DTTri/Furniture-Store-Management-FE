import { ProductStatus } from "../constants";

type Inventories = {
  quantity: number;
  defective: number;
  sold: number;
  available: number
}

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
  Inventories? : Inventories[];
};

export default ProductVariant;
