import { apiClient } from "@/utils/api"

export const getPaths=async(id:string)=>{
    try {
        const respnonse = await apiClient.get(`/admin/paths`)
        return respnonse.data
    } catch (error) {
        console.error(error)
    }
}