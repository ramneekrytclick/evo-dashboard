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