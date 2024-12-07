import CategoryDTO from "../entities/DTO/CategoryDTO";
import http from "./http"

class categoryService {
    baseUri: string;
    constructor() {
        this.baseUri = "catalogues";
    }
    private getURI(uri: string) {
        return `${this.baseUri}/${uri}`;
    }

    async getAllCategory() {
        return http.get(this.getURI("get-all-catalogues"));
    }
    async createCategory(createCategory: CategoryDTO) {
        return http.post(this.getURI("create-catalogue"), createCategory);
    }
    async updateCategory(id: number, updateCategory: object) {
        console.log(id, updateCategory);
        return http.put(this.getURI(`update-catalogue/${id}`), updateCategory);
    }
    async deleteCategory(id: number) {
        return http.delete(this.getURI(`delete-catalogue/${id}`));
    }
}

export default new categoryService();