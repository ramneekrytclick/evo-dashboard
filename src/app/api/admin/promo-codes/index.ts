import { PromoCodeProps } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";

export const getPromoCodes = async (): Promise<PromoCodeProps[]> => {
	const response = await apiClient.get("/promos");
	return response.data;
};

export const createPromoCode = async (data: Partial<PromoCodeProps>) => {
	const dataToSend = { ...data, courseId: data.course?._id };
	const response = await apiClient.post("/promos", dataToSend);
	return response.data;
};

export const updatePromoStatus = async (promoId: string, isActive: boolean) => {
	const response = await apiClient.put("/promos/status", { promoId, isActive });
	return response.data;
};
