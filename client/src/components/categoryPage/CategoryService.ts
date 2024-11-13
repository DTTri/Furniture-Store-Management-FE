import http from "../../api/http";
import { Product } from "../../entities";

export const addProductIntoCategory = async (product: Product, categoryId: number) => {
    try {
        const response = await http.put(`/products/update-product/${product.id}`, {
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

export const deleteProductFromCategory = async (product: Product) => {
    try {
        const response = await http.put(`/products/update-product/${product.id}`, {
            "category": product.category,
            "name": product.name,
            "description": product.description,
            "warranty": product.warranty,
            "catalogueId": 0
        }); 
        if (response.data.EC === 0) {
            console.log("Successfully delete product into category");
        } else {
            console.log("Failed to delete product into category:", response.data);
            return;
        }
        return await http.get(`/products/get-all-products`);
    } catch (error) {
        console.error("Error delete product into category:", error);
        return;
    }
}