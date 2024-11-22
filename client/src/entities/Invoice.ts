import InvoiceStatus from "../constants/enums/InvoiceStatus"
import InvoiceDetail from "./InvoiceDetail";
type Invoice = {
    id: number;
    totalCost: number;
    status: InvoiceStatus,
    customerId: number;
    staffId: number;
    createdAt: string;
    InvoiceDetails: InvoiceDetail[];
}

export default Invoice;