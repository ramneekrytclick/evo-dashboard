import { apiClient } from "@/utils/api";

export const createAssignment = async (data: FormData) => {
	return (await apiClient.post(`/assignments`, data)).data;
};
export const updateAssignment = async (data: FormData) => {
	return (await apiClient.put(`/assignments/update`, data)).data;
};
