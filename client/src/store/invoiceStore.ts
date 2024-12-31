import { signify } from "react-signify";
import Invoice from "../entities/Invoice";

const sInvoice = signify({
    invoices: [] as Invoice[],
});

export default sInvoice;