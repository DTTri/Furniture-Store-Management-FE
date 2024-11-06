import InvoiceStatus from "../constants/enums/InvoiceStatus"
type Invoice = {
    id: string;
    totalCost: number;
    status: InvoiceStatus,
    customerId: string;
    staffId: string;
    createdAt: string;
}

export default Invoice;