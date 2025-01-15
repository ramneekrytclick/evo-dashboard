import { CourseFormProps, CourseProps } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";

export const createCourse = async (data: CourseFormProps) => {
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

export const updateCourse = async ( id: string,data: CourseProps) => {
	try {
		const response = await apiClient.put(`/admin/update-course`, {courseId:id,updateData:data});
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
