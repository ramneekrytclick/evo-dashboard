import { SupportTicketProps } from "@/Types/Support.type"
import { apiClient } from "@/utils/api"

export const createTicket = async(data:SupportTicketProps)=>{
    try {
        const response = await apiClient.post("/support/create-ticket",data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getMyTickets = async ()=>{
    try {
        const response = await apiClient.get("/support/my-tickets");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}