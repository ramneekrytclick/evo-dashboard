import { AddMentorFormProps, MentorDataProps } from "@/Types/Mentor.type";
import { apiClient } from "@/utils/api";

export const getMentors = async () => {
	try {
		const response = await apiClient.get("/admin/role/Mentor");
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export const createNewMentor = async (data: AddMentorFormProps) => {
	try {
		const response = await apiClient.post("/admin/create-mentor", data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export const deleteMentor = async (id: string) => {
	try {
		const response = await apiClient.delete(`/admin/delete-mentor/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateMentor = async (id: string, data: AddMentorFormProps) => {
	try {
		const response = await apiClient.put(`/admin/update-mentor/${id}`, data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
