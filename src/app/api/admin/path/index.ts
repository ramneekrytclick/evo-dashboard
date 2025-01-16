import { PathProps } from "@/Types/Path.type"
import { apiClient } from "@/utils/api"

export const getPaths=async(id:string)=>{
    try {
        const respnonse = await apiClient.get(`/admin/paths`)
        return respnonse.data
    } catch (error) {
        console.error(error)
    }
}

export const createPath = async (data:PathProps)=>{
    try {
        const response = await apiClient.post(`/admin/create-path`,data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}