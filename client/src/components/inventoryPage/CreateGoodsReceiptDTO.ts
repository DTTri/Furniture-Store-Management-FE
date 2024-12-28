type CreateGoodsReceiptDTO = {
  shipping: number;
  GoodsReceiptDetailsData: GoodsReceiptDetailsData[];
  totalCost: number;
  providerId: number;
};

type GoodsReceiptDetailsData = {
  variantId: number;
  quantity: number;
  cost: number;
};
export default CreateGoodsReceiptDTO;
