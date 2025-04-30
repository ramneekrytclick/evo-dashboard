import { apiClient } from "@/utils/api";

export const getSubcategories = async (id: string) => {
	const response = await apiClient.get(`/subcategories/category/${id}`);
	return response.data;
};

export const createSubcategory = async (data: FormData) => {
	const response = await apiClient.post("/subcategories", data, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response.data;
};

export const deleteSubcategory = async (id: string) => {
	return (await apiClient.delete(`/subcategories/subcategory/${id}`)).data;
};
export const updateSubcategory = async (id: string, data: FormData) => {
	return (
		await apiClient.put(`/subcategories/update/${id}`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
	).data;
};
export const getSubcategoryBySlug = async (slug: string) => {
	const response = await apiClient.get(`/subcategories/slug/${slug}`);
	return response.data;
};
