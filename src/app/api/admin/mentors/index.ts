import { AddMentorFormProps } from "@/Types/Mentor.type";
import { apiClient } from "@/utils/api"

export const getMentors = async ()=>{
    try {
        const response = await apiClient.get('/admin/mentors')
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}
export const createNewMentor = async (data:AddMentorFormProps)=>{
    try {
        const response = await apiClient.post('/admin/create-mentor',data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}