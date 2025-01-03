import { signify } from "react-signify";
import { WarrantyOrder } from "../entities";
import Warranty from "../entities/Warranty";

const sWarranty = signify({
  warranties: [] as Warranty[],
  warrantyOrders: [] as WarrantyOrder[],
});
export default sWarranty;
