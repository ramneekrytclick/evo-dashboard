import { apiClient } from "@/utils/api";

export const createTagCode = async (code: string, title: string) => {
	return (await apiClient.post(`/tagcodes`, { title, code })).data;
};
export const getTagCodes = async () => {
	return (await apiClient.get(`/tagcodes`)).data;
};

export const updateTagCode = async ({
	id,
	data,
}: {
	id: string;
	data: { title: string; code: string };
}) => {
	return (await apiClient.put(`/tagcodes/${id}`, data)).data;
};
export const deleteTagCode = async (id: string) => {
	return (await apiClient.delete(`/tagcodes/${id}`)).data;
};
