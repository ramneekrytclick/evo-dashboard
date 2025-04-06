import { apiClient } from "@/utils/api";

export const createQuiz = async (data: {
	lessonId: string;
	quizzes: {
		question: string;
		options: string[];
		correctAnswer: string;
	}[];
}) => {
	return (await apiClient.post(`/quizzes`, data)).data;
};

export const getQuizzesByLessonID = async (id: string) => {
	return (await apiClient.get(`/quizzes/${id}`)).data;
};
export const deleteQuiz = async (id: string) => {
	return (await apiClient.delete(`/quizzes/quiz/${id}`)).data;
};

export const updateQuiz = async (data: {
	lessonId: string;
	quizIndex: number;
	question: string;
	options: string[];
	correctAnswer: string;
}) => {
	return (await apiClient.put(`/quizzes/quiz`, data)).data;
};
