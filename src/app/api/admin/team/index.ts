import { AddUserFormProps } from "@/Types/Team.type";
import { apiClient } from "@/utils/api";

export const createNewUser = async (data: AddUserFormProps) => {
	console.log(data);
	try {
		const response = await apiClient.post("/admin/create-user", data);
		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};