import ProductVariant from "./ProductVariant";

type InvoiceDetail = {
    id: string,
    variantId: string,
    invoiceId: string,
    quantity: number,
    cost: number,
    unitPrice: number,
    discountedAmount: number,
    ProductVariant?: ProductVariant
}

export default InvoiceDetail;