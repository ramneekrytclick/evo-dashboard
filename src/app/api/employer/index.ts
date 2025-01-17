import { JobProps } from "@/Types/Job.type";
import { apiClient } from "@/utils/api"

export const createJob = async (data:JobProps)=>{
    try {
        const response = await apiClient.post("/employer/create-job",data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getStudents = async ()=>{
    try {
        const response = await apiClient.get("/employer/students");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}