import { apiClient } from "@/utils/api";

export const generateCertificate = async (data: FormData) => {
	return (await apiClient.post("/certificates/issue", data)).data;
};
