import { AddUserFormProps } from "@/Types/Team.type";
import { apiClient } from "@/utils/api";

export const getUsers = async () => {
	try {
		const response = await apiClient.get("/admin/users");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
export const getPendingApprovals = async () => {
	try {
		const response = await apiClient.get("/admin/pending-approvals");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
export const createNewUser = async (data: AddUserFormProps) => {
	// console.log(data);
	try {
		const response = await apiClient.post("/admin/create-user", data);
		// console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export const approveUser = async (userId: string, status: string) => {
	try {
		const response = await apiClient.put(`/admin/approve-user`, {
			userId,
			status,
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
