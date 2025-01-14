import { apiClient } from "@/utils/api"

export const getManagers = async ()=>{
    try {
        const response = await apiClient.get("/admin/managers");
        return response.data;
    } catch (error) {
        console.log(error)
    }
}