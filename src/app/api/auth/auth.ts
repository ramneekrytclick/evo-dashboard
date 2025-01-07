import { LoginSubmitProp } from "@/Types/Auth.type";
import axios from "axios";


const URL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiClient = axios.create({
	baseURL: URL,
	headers: { "x-api-key": apiKey },
});
// apiClient.interceptors.request.use(
// 	(config) => {
// 		const token = localStorage.getItem("token");
//         console.log(token);
        
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );
export const login=({email,password}:LoginSubmitProp)=>{
    try{
        const data = {email,password};
        const response = apiClient.post("admin/login",data);
        return response;
    }
    catch{
        return {error:"Invalid credentials"};
    }
}