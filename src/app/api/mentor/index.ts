import { AddAssignmentProps } from "@/Types/AddAssignment.type";
import { apiClient } from "@/utils/api";

export const addAssignment = async (data: AddAssignmentProps) => {
	try {
		const response = await apiClient.post("/mentors/add-assignment", data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
export const getSubmittedAssignments = async () => {
	return (await apiClient.get("/mentors/submitted-assignments")).data;
};
