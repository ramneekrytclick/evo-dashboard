import { SupportTicketProps } from "@/Types/Support.type";
import { apiClient } from "@/utils/api";

export const createTicket = async (data: {
	subject: string;
	message: string;
}) => {
	const response = await apiClient.post("/tickets", data);
	return response.data;
};

export const getAllTickets = async () => {
	const response = await apiClient.get("/tickets");
	return response.data;
};
export const getMyTickets = async (userId: string) => {
	return (await apiClient.get(`/tickets/${userId}`)).data;
};
