import { apiClient } from "@/utils/api";

export const respondToTicket = async (
	ticketId: string,
	status: string,
	response: string
) => {
	const apiResponse = await apiClient.put(`tickets/respond`, {
		ticketId,
		status,
		response,
	});
	return apiResponse.data;
};
