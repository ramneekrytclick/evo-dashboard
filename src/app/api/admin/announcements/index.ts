import { apiClient } from "@/utils/api";
export interface announcementAPIProps {
	title: string;
	message: string;
	roles: string[];
}

export const createAnnouncement = async (
	formattedData: announcementAPIProps
) => {
	const response = await apiClient.post("/announcements", formattedData);
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
