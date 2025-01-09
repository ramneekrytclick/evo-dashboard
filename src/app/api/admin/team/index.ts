import { AddUserFormProps } from "@/Types/Team.type";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const token=localStorage.getItem("token")
const apiClient = axios.create({
	baseURL: URL,
	headers: { "x-api-key": apiKey ,Authorization:`Bearer ${token}`},
});

export const createNewUser =async(data:AddUserFormProps)=>{
    console.log(data);
    try {
        const response =await apiClient.post('/admin/create-user',data);
        console.log(response);
        return response;
    }
    catch (error){
        console.log(error);
    }
    
}