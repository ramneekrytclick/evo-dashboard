import { AddManagerFormProps } from "@/Types/Manager.type";
import { apiClient } from "@/utils/api";

export const createNewManager = async (formData:AddManagerFormProps)=>{
    try {
        const response  = apiClient.post("/admin/create-manager",formData)
        return response;
    }
    catch (error){
        console.log(error);
    }
}