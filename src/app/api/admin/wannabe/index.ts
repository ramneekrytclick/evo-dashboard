import { apiClient } from "@/utils/api";

export const getWannaBeInterests = async () => {
	const response = await apiClient.get(`/wanna-be-interest/`);
	return response.data;
};

export const createWannaBeInterest = async (data: FormData) => {
	const response = await apiClient.post(`/wanna-be-interest/`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};

export const deleteWannaBeInterest = async (id: string) => {
	const response = await apiClient.delete(`/wanna-be-interest/${id}`);
	return response.data;
};

export const updateWannaBeInterest = async (id: string, data: FormData) => {
	const response = await apiClient.put(
		`/wanna-be-interest/update/${id}`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);
	return response.data;
};
