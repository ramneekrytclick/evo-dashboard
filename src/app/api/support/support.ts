import { SupportTicketProps } from "@/Types/Support.type";
import { apiClient } from "@/utils/api";
export const createTicket = async (formData: FormData) => {
	const response = await apiClient.post("/tickets", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};

export const getAllTickets = async () => {
	const response = await apiClient.get("/tickets");
	return response.data;
};
export const getMyTickets = async (userId: string) => {
	return (await apiClient.get(`/tickets/${userId}`)).data;
};
