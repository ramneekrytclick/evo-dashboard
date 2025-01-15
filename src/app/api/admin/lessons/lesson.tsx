import { LessonFormProps } from "@/Types/Lesson.type";
import { apiClient } from "@/utils/api";

export const createLesson = async (data: LessonFormProps) => {
	try {
		const response = await apiClient.post(`/admin/create-lesson`, data);
        return response.data
	} catch (error) {
		console.error(error);
	}
};

export const getLessons = async (id: string) => {
	try {
		const response = await apiClient.get(`/admin/course/${id}`);
		console.log(response.data);
        return response.data
	} catch (error) {
		console.error(error);
	}
};

export const updateLesson = async (id:string,data:LessonFormProps,courseId:string)=>{
	try{
		console.log(courseId);
		
		const respData = {
			courseId:courseId,
			lessonId:data._id,
			updateData:data
		}
		const response = await apiClient.put(`/admin/update-lesson`,respData)
		return response.data
	}
	catch(error){
		console.error(error)
	}
}