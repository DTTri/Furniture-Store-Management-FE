import GoodsReceiptStatus from "../constants/enums/GoodReceiptStatus";

type GoodsReceipt = {
    id: string,
    receiptDate: string,
    status: GoodsReceiptStatus,
    totalCost: number,
    shippingCost: number,
    staffId: string,
    providerId: string,
}

export default GoodsReceipt;