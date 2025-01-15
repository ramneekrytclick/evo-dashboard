import { BatchProps } from "@/Types/Course.type";
import { apiClient } from "@/utils/api"

export const getBatches = async ()=>{
    try {
        const response = await apiClient.get("/admin/batch");
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const createBatch = async (data:BatchProps)=>{
    try {
        const response = await apiClient.post("/admin/batch/create",data);
        return response.data
    } catch (error) {
        console.error(error)
    }
}