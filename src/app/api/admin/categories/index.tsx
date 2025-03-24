import { Category } from "@/Types/Category.type";
import { apiClient } from "@/utils/api";

export const getCategories = async () => {
	try {
		const response = await apiClient.get("/categories");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const createCategory = async (data: { name: string }) => {
	try {
		const response = await apiClient.post("/categories", data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
