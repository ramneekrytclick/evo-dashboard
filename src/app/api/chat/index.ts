import { apiClient } from "@/utils/api";

export const getChats = async (batchId: string) => {
	return (await apiClient.get(`/chat/${batchId}`)).data;
};

export const sendMessage = async (batchId: string, message: string) => {
	return (await apiClient.post(`/chat/send`, { batchId, message })).data;
};
