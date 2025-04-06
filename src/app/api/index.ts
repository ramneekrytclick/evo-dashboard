import { apiClient } from "@/utils/api";

export const getMyProfile = async (role: string) => {
	if (role === "Student") {
		return (await apiClient.get(`/mentors/student/me`)).data;
	}
	if (role === "Mentor") {
		return (await apiClient.get(`/mentors/mentor/me`)).data;
	}
	if (role === "Admin") {
		return (await apiClient.get(`/mentors/admin/me`)).data;
	}
	if (role === "Manager") {
		return (await apiClient.get(`/mentors/manager/me`)).data;
	}
	if (role === "Course Creator") {
		return (await apiClient.get(`/mentors/coursecreator/me`)).data;
	}
	if (role === "Publisher") {
		return (await apiClient.get(`/mentors/publisher/me`)).data;
	}
	if (role === "Employer") {
		return (await apiClient.get(`/mentors/employer/me`)).data;
	}
	return (await apiClient.get(`/mentors/mentor/me`)).data;
};
