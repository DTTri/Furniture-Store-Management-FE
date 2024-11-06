import InvoiceStatus from "../constants/enums/InvoiceStatus"
import InvoiceDetail from "./InvoiceDetail";
type Invoice = {
    id: string;
    totalCost: number;
    status: InvoiceStatus,
    customerId: string;
    staffId: string;
    createdAt: string;
    InvoiceDetails: InvoiceDetail[];
}

export default Invoice;