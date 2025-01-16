import { apiClient } from "@/utils/api"

export const getBlogs = async ()=>{
    try {
        const response = await apiClient.get("/admin/blogs");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const approveBlog= async(id:string)=>{
    try {
        const response = await apiClient.post("/admin/approve-blog",{blogId:id});
        return response.data;
    } catch (error) {
        console.error(error);
    }
}