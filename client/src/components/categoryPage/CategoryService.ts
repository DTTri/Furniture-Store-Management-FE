import http from "../../api/http";
import { Product } from "../../entities";

export const addProductIntoCategory = async (product: Product, categoryId: number) => {
    try {
        const response = await http.post(`/products/update-product/${product.id}`, {
            "category": product.category,
            "name": product.name,
            "description": product.description,
            "warranty": product.warranty,
            "catalogueId": categoryId
        }); 
        if (response.data.EC === 0) {
            console.log("Successfully added product into category");
        } else {
            console.log("Failed to add product into category:", response.data);
        }
    } catch (error) {
        console.error("Error adding product into category:", error);
    }
}