import { CourseFormProps, CourseProps } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";

export const createCourse = async (data: FormData) => {
	const response = await apiClient.post("/courses", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
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
	const response = await apiClient.delete(`/admin/course/${id}`);
	return response.data;
};
