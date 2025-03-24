import { apiClient } from "@/utils/api";

export const getSubcategories = async (id: string) => {
	const response = await apiClient.get(`/subcategories/category/${id}`);
	return response.data;
};

export const createSubcategory = async (data: {
	name: string;
	categoryId: string;
}) => {
	const response = await apiClient.post("/subcategories", data);
	return response.data;
};
