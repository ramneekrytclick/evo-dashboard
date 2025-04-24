import { apiClient } from "@/utils/api";

export const getManagers = async () => {
	try {
		const response = await apiClient.get("/admin/managers");
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export const assignMentorsToManager = async (data: {
	managerId: string;
	mentorIds: string[];
}) => {
	const response = await apiClient.put(`/admin/assign-mentors`, data);
	return response.data;
};
export const updateAssignedMentors = async (data: {
	managerId: string;
	mentorIds: string[];
}) => {
	const response = await apiClient.put(`/admin/manager/update-mentors`, data);
	return response.data;
};
