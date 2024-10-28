// {
//     "shipping": 1000,
//     "GoodsReceiptDetailsData": [
//         {"variantId": 1, "quantity": 10, "cost": 1000},
//         {"variantId": 1, "quantity": 10, "cost": 1000},
//         {"variantId": 1, "quantity": 10, "cost": 1000},
//         {"variantId": 1, "quantity": 10, "cost": 1000}
//     ],
//     "totalCost": 10000
// }
type CreateGoodsReceiptDTO = {
  shipping: number;
  GoodsReceiptDetailsData: GoodsReceiptDetailsData[];
  totalCost: number;
};

type GoodsReceiptDetailsData = {
  variantId: number;
  quantity: number;
  cost: number;
};
export default CreateGoodsReceiptDTO;
