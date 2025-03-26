import { Course } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";

export const getMyCourses = async () => {
	return (await apiClient.get(`/course-creators/auth`)).data;
};
export const updateCourse = async (
	id: string,
	data: {
		name: string;
		description: string;
		categoryId: string;
		subcategoryId: string;
		wannaBeInterest: any[];
	}
) => {
	return (await apiClient.put(`/course-creators/auth/${id}`, data)).data;
};
export const deleteCourse = async (id: string) => {
	return (await apiClient.delete(`/course-creators/auth/${id}`)).data;
};
