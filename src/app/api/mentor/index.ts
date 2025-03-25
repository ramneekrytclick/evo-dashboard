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
