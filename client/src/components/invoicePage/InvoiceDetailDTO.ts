type InvoiceDetailDTO = {
    id: number,  // variantId
    SKU: string, 
    quantity: number, 
    cost: number,
    buyingPrice: number,
    promotion: number
}

export default InvoiceDetailDTO;
