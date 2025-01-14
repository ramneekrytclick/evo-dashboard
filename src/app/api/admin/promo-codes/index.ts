import { apiClient } from "@/utils/api"

export const getPromoCodes = async ()=>{
    try {
        const response = await apiClient.get(`/admin/promo-codes`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}