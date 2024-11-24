import http from "../api/http";
class RepairService {
  baseUri = "/maintainance/repair";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }
  async getRepairOrderById(id: number) {
    return await http.get(this.getUri(`/order/${id}`));
  }
  async getRepairOrderByStatus(status: string) {
    return await http.get(this.getUri(`/order/status/${status}`));
  }
  async getAllRepairOrders() {
    return await http.get(this.getUri("/order/"));
  }
  async createRepairOrder(repairOrder: object) {
    return await http.post(this.getUri("/order"), repairOrder);
  }
  async updateRepairOrder(id: number, repairOrder: object) {
    return await http.patch(this.getUri(`/order/${id}`), repairOrder);
  }
  async deleteRepairOrder(id: number) {
    return await http.delete(this.getUri(`/order/${id}`));
  }
}
const repairService = new RepairService();
export default repairService;
