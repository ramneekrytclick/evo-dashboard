import { apiClient } from "@/utils/api";

export const getPlatformAnalytics = async () => {
	try {
		const response = await apiClient.get("/admin/analytics");
		return response.data;
	} catch (error) {
		console.error("Error fetching analytics:", error);
		return null;
	}
};
