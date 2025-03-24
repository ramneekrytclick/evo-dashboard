import { LessonFormProps } from "@/Types/Lesson.type";
import { apiClient } from "@/utils/api";

export const createLesson = async (data: LessonFormProps) => {
	try {
		const response = await apiClient.post(`/admin/create-lesson`, data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getLessons = async (id: string) => {
	const response = await apiClient.get(`/lessons/${id}`);
	return response.data;
};

export const deleteLesson = async (id: string) => {
	try {
		const response = await apiClient.delete(`/lessons/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
