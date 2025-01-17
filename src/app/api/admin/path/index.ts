import { PathProps } from "@/Types/Path.type"
import { apiClient } from "@/utils/api"

export const getPaths=async()=>{
    try {
        const respnonse = await apiClient.get(`/path`)
        return respnonse.data
    } catch (error) {
        console.error(error)
    }
}

export const createPath = async (data:PathProps)=>{
    try {
        const response = await apiClient.post(`/path/create`,data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export const updatePath = async (id:string,data:PathProps)=>{
    try {
        const response = await apiClient.put(`/path/update/${id}`,data);
        return response.data
    }
    catch (error) {
        console.error(error);
    }
}

export const deletePath = async (id:string)=>{
    try {
        const response = await apiClient.delete(`/path/delete/${id}`);
        return response.data
    }
    catch(error){
        console.error(error);
    }
}