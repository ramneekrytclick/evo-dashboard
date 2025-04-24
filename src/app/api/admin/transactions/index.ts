import { apiClient } from "@/utils/api";

export const getTransactionsCSV = async () => {
	const response = await apiClient.get("/admin/transactions/export");
	return response.data;
};
export const getTransactions = async () => {
	const response = await apiClient.get("/admin/admin/transactions");
	return response.data;
};
export const confirmTransaction = async (id: string) => {
	const response = await apiClient.put(`/admin/transactions/${id}/mark-paid`);
	return response.data;
};
