import { signify } from "react-signify";
import { Customer } from "../entities";

const sCustomer = signify({
  customers: [] as Customer[],
});
export default sCustomer;
