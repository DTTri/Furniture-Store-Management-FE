import ProductVariant from "./ProductVariant";

type InvoiceDetail = {
    id: number,
    variantId: string,
    invoiceId: string,
    quantity: number,
    cost: number,
    unitPrice: number,
    discountedAmount: number,
    promotionId?: number,
    ProductVariant?: ProductVariant
}

export default InvoiceDetail;