import { PromoCodeProps } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";

export const getPromoCodes = async () => {
	try {
		const response = await apiClient.get(`/promos`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const createPromoCode = async (data: PromoCodeProps) => {
	try {
		const response = await apiClient.post(`/promos`, data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const updatePromoCode = async (promoId: string, isActive: boolean) => {
	try {
		const response = await apiClient.put(`/promos/status`, {
			promoId,
			isActive,
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const deletePromoCode = async (id: string) => {
	try {
		const response = await apiClient.delete(`/admin/promo-codes/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
