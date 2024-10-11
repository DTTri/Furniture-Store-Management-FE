import { ProductStatus } from "../constants";

type ProductVaraint = {
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

export default ProductVaraint;
