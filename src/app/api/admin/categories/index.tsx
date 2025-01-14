import { Category } from "@/Types/Category.type";
import { apiClient } from "@/utils/api"

export const getCategories = async ()=>{
    try {
        const response =await apiClient.get("/admin/categories");
        return response.data;
    }
    catch (error){
        console.error(error);
    }
}

export const createCategory = async (data:Category)=>{
    try {
        const response = await apiClient.post("/admin/create-category",data)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}