import { apiClient } from "@/utils/api";

export const generateApiKey = async () => {
	const response = (await apiClient.post(`/admin/generate-key`)).data;
	console.log(response);

	return response;
};
