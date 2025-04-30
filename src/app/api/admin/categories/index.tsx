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
export const updateCategory = async (id: string, data: FormData) => {
	return (
		await apiClient.put(`/categories/update/${id}`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
	).data;
};
export const getCategoryBySlug = async (slug: string) => {
	return (await apiClient.get(`/categories/slug/${slug}`)).data;
};
