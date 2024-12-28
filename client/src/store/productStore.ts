import { signify } from "react-signify";
import { Product } from "../entities";

const sProduct = signify({
  products: [] as Product[],
});

export default sProduct;
