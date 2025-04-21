import { apiClient } from "@/utils/api";

export const getMyProfile = async (role: string) => {
	if (role === "Student") {
		return (await apiClient.get(`/mentors/student/me`)).data;
	}
	if (role === "Mentor") {
		return (await apiClient.get(`/mentors/mentor/me`)).data;
	}
	if (role === "Admin") {
		return (await apiClient.get(`/admin/me`)).data.admin;
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
export const getMyAnnouncements = async (role: string) => {
	const data = (await apiClient.get(`/announcements`)).data;
	console.log(role);

	if (role == "") {
		return data;
	}
	return data.filter((item: any) => item.roles.includes(role));
};
export const updateProfile = async (role: string, data: any) => {
	let roleRoute = "";
	if (role === "Student") {
		roleRoute = "students";
	}
	if (role === "Mentor") {
		roleRoute = "mentors";
	}
	if (role === "Admin") {
		roleRoute = "admin";
	}
	if (role === "Manager") {
		roleRoute = "managers/auth";
	}
	if (role === "Course Creator") {
		roleRoute = "course-creators/auth";
	}
	if (role === "Publisher") {
		roleRoute = "publishers/auth";
	}
	if (role === "Employer") {
		roleRoute = "/jobs";
	}
	const response = (await apiClient.put(`/${roleRoute}/profile`, data)).data;
	return response;
};
