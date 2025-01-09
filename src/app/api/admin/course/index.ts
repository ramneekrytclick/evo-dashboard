import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const token=localStorage.getItem("token")
const apiClient = axios.create({
	baseURL: URL,
	headers: { "x-api-key": apiKey ,Authorization:`Bearer ${token}`},
});

export const getCourses = async ()=>{
    const response = await apiClient.get("/admin/courses");
    console.log(response.data);
    return response.data
}