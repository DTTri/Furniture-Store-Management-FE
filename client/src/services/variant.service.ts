import http from "../api/http";
import AddVariantDTO from "../components/productPage/AddVariantDTO";
class VariantService {
  baseUri = "/variants";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }
  async getAllVariants() {
    return await http.get(this.getUri(""));
  }
  async getVariantsOfProduct(productId: number) {
    return await http.get(this.getUri("/get-all-variants/" + productId));
  }
  async createVariant(productId: number, variant: AddVariantDTO) {
    return await http.post(
      this.getUri("/create-variant/" + productId),
      variant
    );
  }
  async updateVariant(variantId: number, variant: AddVariantDTO) {
    return await http.put(this.getUri("/update-variant/" + variantId), variant);
  }
  async deleteVariant(variantId: number) {
    return await http.delete(this.getUri("/delete-variant/" + variantId));
  }
}
const variantService = new VariantService();
export default variantService;
