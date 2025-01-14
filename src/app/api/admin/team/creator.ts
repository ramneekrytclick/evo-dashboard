import { AddCreatorFormProps } from "@/Types/Creator.type";
import { apiClient } from "@/utils/api";

export const createNewCreator = async (data: AddCreatorFormProps) => {
	// console.log(data);
	try {
		const response = await apiClient.post("/admin/create-creator", data);
		// console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
        return null;
	}
};