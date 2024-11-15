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
    async updateCategory(id: number, updateCategory: CategoryDTO) {
        console.log("updateCategory", updateCategory);
        console.log("id", id);
        console.log("this.getURI(`update-catalogue/${id}`)", this.getURI(`update-catalogue/${id}`));
        return http.put(this.getURI(`update-catalogue/${id}`), updateCategory);
    }
}

export default new categoryService();