import CreatePromotionDTO from "../components/promotionPage/CreatePromotionDTO";
import Promotion from "../entities/Promotion";
import http from "./http";

class PromotionService {
  baseUri = "/promotion";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }
  async getAllPromotions() {
    return await http.get(this.getUri("/get-all-promotions"));
  }
  async getPromotionById(id: number) {
    return await http.get(this.getUri(`/get-promotion/${id}`));
  }
  async createPromotion(promotion: CreatePromotionDTO) {
    return await http.post(this.getUri("/create-promotion"), promotion);
  }
  async updatePromotion(promotion: Promotion) {
    return await http.put(this.getUri(`/update-promotion`), promotion);
  }
  async deletePromotion(id: number) {
    return await http.delete(this.getUri(`/delete-promotion/${id}`));
  }
}
const promotionService = new PromotionService();
export default promotionService;
