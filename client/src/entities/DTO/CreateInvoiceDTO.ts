export type CreateInvoiceDetailDTO = {
    variantId: number;
    quantity: number;
    cost: number;
}

type CreateInvoiceDTO = {
    InvoiceDetailsData: CreateInvoiceDetailDTO[];
    totalCost: number;
    staffId: number
    customerId: number
}

export default CreateInvoiceDTO;