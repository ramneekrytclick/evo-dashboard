import { apiClient } from "@/utils/api";

export const submitBlog = async (formData: FormData) => {
	try {
		const response = await apiClient.post("/blogs", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getMyBlogs = async () => {
	try {
		const response = await apiClient.get("/publishers/auth/my-blogs");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
export const getBlog = async (id: string) => {
	return (await apiClient.get(`/blogs/${id}`)).data;
};
export const deleteBlogById = async (id: string) => {
	return (await apiClient.delete(`/blogs/${id}`)).data;
};
export const updateBlogById = async (
	id: string,
	data: { title: string; content: string }
) => {
	return (await apiClient.put(`/blogs/${id}`, data)).data;
};
