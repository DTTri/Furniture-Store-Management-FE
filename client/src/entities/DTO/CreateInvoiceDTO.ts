export type CreateInvoiceDetailDTO = {
    variantId: number;
    quantity: number;
    cost: number;
    promotionId: number;
    unitPrice: number,
    discountAmount: number,
}

type CreateInvoiceDTO = {
    InvoiceDetailsData: CreateInvoiceDetailDTO[];
    totalCost: number;
    customerId: number
}   

export default CreateInvoiceDTO;