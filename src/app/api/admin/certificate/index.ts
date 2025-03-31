import { apiClient } from "@/utils/api";

export const generateCertificate = async (data: FormData) => {
	return (await apiClient.post("/certificates/issue", data)).data;
};
export const getSubmittedAssignments = async () => {
	return (await apiClient.get("/mentors/submitted-assignments-admin")).data;
};
