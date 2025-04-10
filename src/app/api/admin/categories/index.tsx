import { Category } from "@/Types/Category.type";
import { apiClient } from "@/utils/api";

export const getCategories = async () => {
	const response = await apiClient.get("/categories");
	return response.data;
};

export const createCategory = async (data: FormData) => {
	const response = await apiClient.post("/categories", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};
export const deleteCategory = async (id: string) => {
	return (await apiClient.delete(`/categories/category/${id}`)).data;
};
