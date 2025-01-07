import { AddUserFormProps } from "@/Types/Team.type";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiClient = axios.create({
	baseURL: URL,
	headers: { "x-api-key": apiKey },
});

export const createNewUser =(data:AddUserFormProps)=>{
    console.log(data);
    
    const response = apiClient.post('/admin/create-user', data);
    console.log(response);
    return response;
}