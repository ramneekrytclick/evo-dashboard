import { AddUserFormProps } from "@/Types/Team.type";
import { apiClient } from "@/utils/api";

export const getUsers = async () => {
	try {
		const responseManager = await apiClient.get("/admin/role/Manager");
		const responsePublisher = await apiClient.get("/admin/role/Publisher");
		const responseCreator = await apiClient.get("/admin/role/Creator");
		const responseCourseCreator = await apiClient.get(`/admin/course-creators`);
		const managers = responseManager.data;
		const employers = responsePublisher.data;
		const creators = responseCreator.data;
		const courseCreators = responseCourseCreator.data.creators;
		courseCreators.forEach((courseCreator: any) => {
			courseCreator.role = "Course Creator";
		});
		return [...managers, ...employers, ...creators, ...courseCreators];
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
export const updateUserStatus = async (
	userId: string,
	status: "Active" | "Inactive" | "Banned"
) => {
	try {
		const response = await apiClient.put(`/admin/status`, {
			userId,
			status,
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getUserProfile = async (userId: string) => {
	try {
		const response = await apiClient.get(`/admin/profile/${userId}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
