import { apiClient } from "@/utils/api";

export const createAssignment = async (data: FormData) => {
	return (await apiClient.post(`/assignments`, data)).data;
};
