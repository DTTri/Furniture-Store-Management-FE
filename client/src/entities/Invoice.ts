import InvoiceStatus from "../constants/enums/InvoiceStatus"
import Customer from "./Customer";
import InvoiceDetail from "./InvoiceDetail";
type Invoice = {
    id: number;
    totalCost: number;
    status: InvoiceStatus,
    customerId: number;
    staffId: number;
    createdAt: string;
    InvoiceDetails: InvoiceDetail[];
    Customer?: Customer
}

export default Invoice;