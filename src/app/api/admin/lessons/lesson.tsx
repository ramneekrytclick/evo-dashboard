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
export const getLessonById = async (lessonId: string, courseId: string) => {
	const response = await apiClient.get(`/lessons/${courseId}`);
	const lesson = response.data.find(
		(lesson: LessonFormProps) => lesson._id === lessonId
	);
	return lesson;
};
export const getLessons = async (id: string) => {
	const response = await apiClient.get(`/lessons/${id}`);
	return response.data;
};

export const deleteLesson = async (id: string) => {
	const response = await apiClient.delete(`/lessons/${id}`);
	return response.data;
};
