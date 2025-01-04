type InvoiceDetailDTO = {
    id: number,  // variantId
    SKU: string, 
    name: string,
    quantity: number, 
    cost: number,
    unitPrice: number,
    discount?: number,
    discountAmount: number,
    finalPrice: number,
    promotionId?: number,
}

export default InvoiceDetailDTO;
