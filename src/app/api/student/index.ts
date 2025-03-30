import { apiClient } from "@/utils/api";

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
	pathId: string;
	userId: string;
	originalAmount: number;
	paymentMethod: "Credit Card" | "PayPal" | "Bank Transfer";
}) => {
	return (await apiClient.post(`/students/apply-purchase`, data)).data;
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
	fileUrl: string;
}) => {
	return (await apiClient.post(`/students/submit-assignment`, data)).data;
};
export const bookMentorSession = async (data: {
	studentId: string;
	mentorId: string;
	date: any;
	timeSlot: any;
}) => {
	return (await apiClient.post(`/mentor-bookings/book`, data)).data;
};
