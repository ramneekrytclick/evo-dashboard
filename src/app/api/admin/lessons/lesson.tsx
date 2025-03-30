import { LessonFormProps } from "@/Types/Lesson.type";
import { apiClient } from "@/utils/api";
import { lessonSampleData } from "./lessonSampleData";

export const createLesson = async (data: LessonFormProps) => {
	try {
		const response = await apiClient.post(`/lessons`, data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
export const getLessonById = async (id: string) => {
	const response = lessonSampleData.filter((l) => l._id === id);
	return response;
};
export const getLessons = async (id: string) => {
	const response = await apiClient.get(`/lessons/${id}`);
	return response.data;
};

export const deleteLesson = async (id: string) => {
	const response = await apiClient.delete(`/lessons/${id}`);
	return response.data;
};
