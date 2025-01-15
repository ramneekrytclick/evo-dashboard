import { PromoCodeProps } from "@/Types/Course.type";
import { apiClient } from "@/utils/api"

export const getPromoCodes = async ()=>{
    try {
        const response = await apiClient.get(`/admin/promo-codes`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createPromoCode = async (data:PromoCodeProps)=>{
    try {
        const response = await apiClient.post(`/admin/promo-codes`, data);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export const updatePromoCode= async (data:PromoCodeProps,id:string)=>{
    try {
        const response = await apiClient.put(`/admin/promo-codes/${id}`, data);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export const deletePromoCode = async (id:string)=>{
    try {
        const response = await apiClient.delete(`/admin/promo-codes/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}