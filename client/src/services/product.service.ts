import http from "../api/http";
import AddProductDTO from "../components/productPage/AddProductDTO";
class ProductService {
  baseUri = "/products";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }
  async getAllProducts() {
    return await http.get(this.getUri("/get-all-products"));
  }
  async createProduct(product: AddProductDTO) {
    return await http.post(this.getUri("/create-product"), product);
  }
  async updateProduct(productId: number, product: AddProductDTO) {
    return await http.put(this.getUri("/update-product/" + productId), product);
  }
  async stopSellingProduct(productId: number) {
    return await http.put(this.getUri("/stop-selling/" + productId), {});
  }
}

const productService = new ProductService();
export default productService;
