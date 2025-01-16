import { BlogProps } from "@/Types/Blogs.type";
import { apiClient } from "@/utils/api";

export const submitBlog= async(data:BlogProps)=>{
    try {
        const response = await apiClient.post("/creator/submit-blog",data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getMyBlogs = async ()=>{
    try {
        const response = await apiClient.get("/creator/my-blogs");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}