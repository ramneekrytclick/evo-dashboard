import { apiClient } from "@/utils/api";
export interface announcementAPIProps {
	title: string;
	message: string;
	roles: string[];
}
export interface AnnouncementFormInput {
	title: string;
	description: string;
	roles: string[];
	image?: File | null;
}

export const createAnnouncement = async (formData: AnnouncementFormInput) => {
	const data = new FormData();
	data.append("title", formData.title);
	data.append("description", formData.description);
	formData.roles.forEach((role) => data.append("roles[]", role));
	if (formData.image) data.append("image", formData.image);
	const response = await apiClient.post("/announcements", data);
	return response;
};

export const getAnnouncements = async () => {
	try {
		const response = await apiClient.get("/announcements");
		return response.data;
	} catch (error) {
		console.error("Error fetching announcements:", error);
		return null;
	}
};

export const updateAnnouncement = async (
	formattedData: announcementAPIProps,
	id: string
) => {
	try {
		const response = await apiClient.put(
			`/admin/announcements/${id}`,
			formattedData
		);
		return response;
	} catch (error) {
		return error;
	}
};

export const deleteAnnouncement = async (id: string) => {
	try {
		const response = await apiClient.delete(`/admin/announcements/${id}`);
		return response;
	} catch (error) {
		return error;
	}
};
