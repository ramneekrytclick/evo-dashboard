import { LessonFormProps } from "@/Types/Lesson.type";
import { apiClient } from "@/utils/api";

export const createLesson = async(data:LessonFormProps)=>{
    try {
        const response = await apiClient.post(`/admin/create-lesson`,data);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}