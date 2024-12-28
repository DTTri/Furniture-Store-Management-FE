import GoodsReceiptStatus from "../constants/enums/GoodReceiptStatus";

type GoodsReceipt = {
  id: number;
  receiptDate: string;
  status: GoodsReceiptStatus;
  totalCost: number;
  shipping: number;
  staffId: string;
  providerId: string;
};

export default GoodsReceipt;
