import { CourseFormProps, CourseProps } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";

export const createCourse = async (data: CourseFormProps) => {
	try {
		const response = await apiClient.post("/courses", data);
		return response.data;
	} catch (error) {
		console.error("Error creating course:", error);
		return null;
	}
};
export const getCourses = async () => {
	const response = await apiClient.get("/courses");
	return response.data;
};

export const assignWannaBeInterestToCourse = async (
	id: string,
	wannaBeInterestIds: string[]
) => {
	const response = await apiClient.put(`/courses/assign-wanna-be-interest`, {
		courseId: id,
		wannaBeInterestIds,
	});
	return response.data;
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
