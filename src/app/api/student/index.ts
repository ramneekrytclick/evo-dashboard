import { apiClient } from "@/utils/api";
import { lessonSampleData } from "../admin/lessons/lessonSampleData";
import { getPaths } from "../admin/path";
import { PathProps } from "@/Types/Path.type";

export const getStudentProfile = async () => {
	return (await apiClient.get(`/students/me`)).data;
};
export const getCourses = async () => {
	return (await apiClient.get(`/students/courses`)).data;
};
export const getEnrolledCourses = async () => {
	return (await apiClient.get(`/students/enrolled-courses`)).data;
};
export const getEnrolledPaths = async () => {
	const enrolledCoursesRes = await apiClient.get(`/students/enrolled-courses`);
	const enrolledCourseIds = enrolledCoursesRes.data.enrolledCourses.map(
		(item: any) => item.course._id
	);

	// Fetch all paths
	const allPathsRes = await getPaths();
	const allPaths = allPathsRes.paths;

	// Filter paths that include at least one enrolled course
	const filteredPaths = allPaths.filter((path: any) =>
		path.courses?.some((course: any) => enrolledCourseIds.includes(course._id))
	);

	return filteredPaths;
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
	message: string;
}) => {
	return (await apiClient.post(`/mentor-bookings/book`, data)).data;
};
export const getMyMentorBookings = async () => {
	return (await apiClient.get(`/students/my-mentor-sessions`)).data;
};
export const getLessonsByCourseID = async (courseId: string) => {
	// return (await apiClient.get(`/lessons/course/${courseId}`)).data;
	return (await apiClient.get(`/students/lessons/${courseId}`)).data;
};

export const getMyBatches = async () => {
	return (await apiClient.get(`/students/batches`)).data;
};
export const getBatchByID = async (id: string) => {
	return (await apiClient.get(`/students/batches/${id}`)).data;
};
export const getJobs = async () => {
	return (await apiClient.get(`/students/jobs`)).data;
};
export const applyJobApplication = async (formData: FormData) => {
	return (await apiClient.post(`/jobs/apply`, formData)).data;
};
export const getPathById = async (id: string) => {
	return (await apiClient.get(`/paths/${id}`)).data;
};
export const getMyCertificates = async () => {
	return (await apiClient.get(`/students/certificates`)).data;
};
export const getMyApplications = async () => {
	return (await apiClient.get(`/students/my-applications`)).data;
};
