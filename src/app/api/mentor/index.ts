import { AddAssignmentProps } from "@/Types/AddAssignment.type";
import { apiClient } from "@/utils/api";

export const addAssignment = async (data: AddAssignmentProps) => {
	const response = await apiClient.post("/mentors/add-assignment", data);
	return response.data;
};
export const getSubmittedAssignments = async () => {
	return (await apiClient.get("/mentors/submitted-assignments")).data;
};
export const gradeAssignment = async (data: {
	assignmentId: string;
	score: number;
	feedback: string;
}) => {
	return (await apiClient.post(`/mentors/grade-assignment`, data)).data;
};
export const getBookedSessions = async (id: string) => {
	return (await apiClient.get(`/mentor-bookings/${id}`)).data;
};
export const updateBookingStatus = async (id: string, status: string) => {
	return (
		await apiClient.put(`/mentor-bookings/update-status`, {
			bookingId: id,
			status,
		})
	).data;
};
export const replyToSessionBooking = async (
	reply: string,
	bookingId: string
) => {
	return (
		await apiClient.put(`/mentor-bookings/reply-booking/${bookingId}`, {
			reply,
		})
	).data;
};
export const getMentorBatches = async () => {
	return (await apiClient.get("/mentor-bookings/my-batches")).data;
};
export const getBatchByID = async (id: string) => {
	return (await apiClient.get(`/mentor-bookings/batch/${id}`)).data;
};
