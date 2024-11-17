import http from "../api/http";
import CreateGoodsReceiptDTO from "../components/inventoryPage/CreateGoodsReceiptDTO";
class GoodsReceiptService {
  baseUri = "/goods-receipt";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }
  async createGoodsReceipt(goodsReceipt: CreateGoodsReceiptDTO) {
    return await http.post(this.getUri("/create-goods-receipt"), goodsReceipt);
  }
  async acceptGoodsReceipt(goodsReceiptId: number) {
    return await http.put(
      this.getUri("/accept-goods-receipt/" + goodsReceiptId),
      {}
    );
  }
  async getAllGoodsReceipts() {
    return await http.get(this.getUri("/get-all-goods-receipts"));
  }
  async getGoodsReceipt(goodsReceiptId: number) {
    return await http.get(this.getUri("/get-goods-receipt/" + goodsReceiptId));
  }
  async updateGoodsReceipt(
    goodsReceiptId: number,
    goodsReceipt: CreateGoodsReceiptDTO
  ) {
    return await http.put(
      this.getUri("/update-goods-receipt/" + goodsReceiptId),
      goodsReceipt
    );
  }
  async rejectGoodsReceipt(goodsReceiptId: number) {
    return await http.put(
      this.getUri("/reject-goods-receipt/" + goodsReceiptId),
      {}
    );
  }
}
const goodsReceiptService = new GoodsReceiptService();
export default goodsReceiptService;
