type InvoiceDetailDTO = {
    id: number,  // variantId
    SKU: string, 
    name: string,
    quantity: number, 
    cost: number,
    price: number,
    discount: number,
    discountedPrice: number,
}

export default InvoiceDetailDTO;
