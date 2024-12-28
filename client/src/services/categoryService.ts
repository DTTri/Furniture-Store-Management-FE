import CategoryDTO from "../entities/DTO/CategoryDTO";
import http from "../api/http";

class categoryService {
  baseUri: string;
  constructor() {
    this.baseUri = "catalogues";
  }
  private getURI(uri: string) {
    return `${this.baseUri}/${uri}`;
  }

  async getAllCategory() {
    return await http.get(this.getURI("get-all-catalogues"));
  }
  async createCategory(createCategory: CategoryDTO) {
    return await http.post(this.getURI("create-catalogue"), createCategory);
  }
  async updateCategory(id: number, updateCategory: object) {
    console.log(id, updateCategory);
    return await http.put(
      this.getURI(`update-catalogue/${id}`),
      updateCategory
    );
  }
  async deleteCategory(id: number) {
    return await http.delete(this.getURI(`delete-catalogue/${id}`));
  }
}

export default new categoryService();
