import { Course } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";
export const createCourse = async (data: {
	name: string;
	description: string;
	categoryId: string;
	subcategoryId: string;
	wannaBeInterest: string;
}) => {
	return (await apiClient.post(`/course-creators/auth/create`, data)).data;
};
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
export const getAllCategories = async () => {
	return (await apiClient.get("/admin/allcat")).data;
};
export const getAllSubcategories = async () => {
	return (await apiClient.get("/admin/allsubcat")).data;
};
export const getAllWannaBeInterests = async () => {
	return (await apiClient.get("/admin/allwanna")).data;
};
export const getAllCourses = async () => {
	return (await apiClient.get("/admin/Allcourses")).data;
};
