import { StudentProps } from "@/Types/Student.type";
import { apiClient } from "@/utils/api";

export const getStudents = async () => {
	try {
		const response = await apiClient.get("/admin/students");
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateStudent = async (id:string,data:StudentProps)=>{
    try {
        const response = await apiClient.put(`/admin/update-student/${id}`,data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteStudent = async (id:string)=>{
    try {
        const response = await apiClient.delete(`/admin/delete-student/${id}`);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}
