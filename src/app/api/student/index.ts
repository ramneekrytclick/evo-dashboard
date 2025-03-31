import { apiClient } from "@/utils/api";
import { lessonSampleData } from "../admin/lessons/lessonSampleData";

export const getStudentProfile = async () => {
	return (await apiClient.get(`/students/me`)).data;
};
export const getCourses = async () => {
	return (await apiClient.get(`/courses`)).data;
};
export const getEnrolledCourses = async () => {
	return (await apiClient.get(`/students/enrolled-courses`)).data;
};
export const getEnrolledPaths = async () => {
	return (await apiClient.get(`/students/enrolled-paths`)).data;
};
export const enrollInCourse = async (courseId: string) => {
	return (await apiClient.post(`/students/course`, { courseId })).data;
};
export const enrollInPath = async (pathId: string) => {
	return (await apiClient.post(`/students/path`, { pathId })).data;
};
export const applyPromoCodeAndPurchase = async (data: {
	code: string;
	courseId: string;
}) => {
	return (await apiClient.post(`/promos/apply`, data)).data;
};
export const submitQuiz = async (data: {
	lessonId: string;
	answers: {
		question: string;
		selectedAnswer: string;
	}[];
}) => {
	return (await apiClient.post(`/students/submit-quiz`, data)).data;
};
export const submitAssignment = async (data: {
	lessonId: string;
	description: string;
	file: File;
}) => {
	const formData = new FormData();
	formData.append("lessonId", data.lessonId);
	formData.append("description", data.description);
	formData.append("file", data.file);
	return (await apiClient.post(`/students/submit-assignment`, formData)).data;
};
export const bookMentorSession = async (data: {
	studentId: string;
	mentorId: string;
	date: any;
	timeSlot: any;
}) => {
	return (await apiClient.post(`/mentor-bookings/book`, data)).data;
};
export const getLessonsByCourseID = async (courseId: string) => {
	// return (await apiClient.get(`/lessons/course/${courseId}`)).data;
	return (await apiClient.get(`/lessons/${courseId}`)).data;
};
