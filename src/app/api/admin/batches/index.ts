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

export const updateBatch = async (id:string,data:BatchProps)=>{
    try {
        const response = await apiClient.put(`/admin/batch/update/${id}`,data);
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const deleteBatch = async (id:string)=>{
    try {
        const response = await apiClient.delete(`/admin/batch/delete/${id}`);
        return response.data
    }
    catch (error) {
        console.error(error)
    }
}