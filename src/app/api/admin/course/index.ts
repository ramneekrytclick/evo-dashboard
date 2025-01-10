import { apiClient } from "@/utils/api";

export interface courseAPIProps {}
export const createCourse = async (data: courseAPIProps) => {
	try {
		const response = await apiClient.post("/admin/create-course", data);
		return response.data;
	} catch (error) {
		console.error("Error creating course:", error);
		return null;
	}
};
export const getCourses = async () => {
	try {
		const response = await apiClient.get("/admin/courses");
		return response.data;
	} catch (error) {
		console.error("Error fetching courses:", error);
		return null;
	}
};

export const updateCourse = async (data: courseAPIProps, id: string) => {
	try {
		const response = await apiClient.put(`/admin//update-course/${id}`, data);
		return response.data;
	} catch (error) {
		console.error("Error updating course:", error);
		return null;
	}
};

export const deleteCourse = async (id: string) => {
	try {
		const response = await apiClient.delete(`/admin/delete-course/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting course:", error);
		return null;
	}
};
