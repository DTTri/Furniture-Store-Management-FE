import { signify } from "react-signify";
import { WarrantyOrder } from "../entities";

const sWarranty = signify({
  warrantyOrders: [] as WarrantyOrder[],
});
export default sWarranty;
