import { ProductStatus } from "../constants";

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  status: ProductStatus;
  available: number;
  quantity: number;
  defective: number;
  sold: number;
  catelogueId: string;
};

export default Product;
