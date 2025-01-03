import ProductVariant from "./ProductVariant";

type InvoiceDetail = {
    id: number,
    variantId: string,
    invoiceId: string,
    quantity: number,
    cost: number,
    unitPrice: number,
    discountedAmount: number,
    ProductVariant?: ProductVariant
}

export default InvoiceDetail;