import { apiClient } from "@/utils/api";

export const getSubcategories = async (id: string) => {
	try {
		const response = await apiClient.get(`admin/subcategories`, {
			params: { categoryId: id },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching subcategories:", error);
		throw error;
	}
};

export const createSubcategory = async (data: any) => {
	try {
		const response = await apiClient.post("admin/create-subcategory", data);
		return response.data;
	} catch (error) {
		console.error("Error creating subcategory:", error);
	}
};
