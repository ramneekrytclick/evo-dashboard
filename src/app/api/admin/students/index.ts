import { StudentProps } from "@/Types/Student.type";
import { apiClient } from "@/utils/api";
import { getLessonsByCourseID } from "../../student";
import { LessonFormProps } from "@/Types/Lesson.type";

export const getStudents = async () => {
	const response = await apiClient.get("/admin/role/Student");
	return response.data;
};

export const getLessonById = async (lessonId: string, courseId: string) => {
	const response = await getLessonsByCourseID(courseId);
	const lesson = response.lessons.find(
		(lesson: LessonFormProps) => lesson._id === lessonId
	);
	return lesson;
};
export const getStudentsByCourseID = async (id: string) => {
	return (await apiClient.get(`/admin/students/by-course/${id}`)).data;
};
