import { useAuth } from "@/app/AuthProvider";
import { GetAnnouncementsResponse } from "@/Types/Announcement.type";
import axios, { AxiosError, AxiosResponse } from "axios";

const URL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const token = localStorage.getItem("token");
const apiClient = axios.create({
	baseURL: URL,
	headers: { "x-api-key": apiKey, Authorization: `Bearer ${token}` },
});
console.log(token);

export interface formattedDataProps {
	title: string;
	message: string;
	media: string;
	targetAudience: string[];
	visibilityStart: Date;
	visibilityEnd: Date;
}

export const createAnnouncement = async (formattedData: formattedDataProps) => {
	console.log(formattedData);
	try {
		const response = await apiClient.post(
			"/admin/announcements",
			formattedData
		);
		return response;
	} catch (error) {
		return error;
	}
};

export const getAnnouncements =
	async (): Promise<GetAnnouncementsResponse | null> => {
		try {
			const response: AxiosResponse<GetAnnouncementsResponse> =
				await apiClient.get("/admin/announcements");
			return response.data;
		} catch (error) {
			console.error("Error fetching announcements:", error);
			return null;
		}
	};
