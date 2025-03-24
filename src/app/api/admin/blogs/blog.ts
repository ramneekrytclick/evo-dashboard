import { apiClient } from "@/utils/api";

export const getBlogs = async () => {
	try {
		const response = await apiClient.get("/admin/blogs");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const approveBlog = async (id: string, updatedStatus: string) => {
	try {
		const response = await apiClient.put(`/admin/blogs/${id}`, {
			status: updatedStatus,
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
