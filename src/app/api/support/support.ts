import { SupportTicketProps } from "@/Types/Support.type";
import { apiClient } from "@/utils/api";

export const createTicket = async (data: {
	subject: string;
	message: string;
}) => {
	try {
		const response = await apiClient.post("/tickets", data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getMyTickets = async () => {
	try {
		const response = await apiClient.get("/tickets");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
