import { apiClient } from "@/utils/api";

export const getTransactionsCSV = async () => {
	try {
		const response = await apiClient.get("/admin/export");
		return response.data;
	} catch (error: any) {
		throw new Error(error);
	}
};
export const getTransactions = async () => {
	try {
		const response = await apiClient.get("/admin");
		return response.data;
	} catch (error: any) {
		throw new Error(error);
	}
};
