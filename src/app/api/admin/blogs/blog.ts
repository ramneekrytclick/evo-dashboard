import { apiClient } from "@/utils/api";

export const getBlogs = async () => {
	const response = await apiClient.get("/admin/blogs");
	return response.data;
};

export const approveBlog = async (id: string, updatedStatus: string) => {
	const response = await apiClient.put(`/admin/blogs/${id}`, {
		status: updatedStatus,
	});
	return response.data;
};
export const getBlogBySlug = async (slug: string) => {
	const response = await apiClient.get(`/blogs/slug/${slug}`);
	return response.data;
};
