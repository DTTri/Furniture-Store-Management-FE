import http from "../api/http";
class WarrantyService {
  baseUri = "/maintainance/warranty";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }
  async getAllWarranties() {
    return await http.get(this.getUri("/"));
  }
  async getWarrantyOrderById(id: number) {
    return await http.get(this.getUri(`/order/${id}`));
  }
  async getWarrantyOrderByStatus(status: string) {
    return await http.get(this.getUri(`/order/status/${status}`));
  }
  async getAllWarrantyOrders() {
    return await http.get(this.getUri("/order/"));
  }
  async createWarrantyOrder(warrantyOrder: object) {
    return await http.post(this.getUri("/order"), warrantyOrder);
  }
  async updateWarrantyOrder(id: number, warrantyOrder: object) {
    return await http.patch(this.getUri(`/order/${id}`), warrantyOrder);
  }
  async deleteWarrantyOrder(id: number) {
    return await http.delete(this.getUri(`/order/${id}`));
  }
}
const warrantyService = new WarrantyService();
export default warrantyService;
