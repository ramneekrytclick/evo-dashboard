import { apiClient } from "@/utils/api";

export const addReview = async (
	courseId: string,
	rating: number,
	comment: string,
	name: string
) => {
	return (
		await apiClient.post(`/admin/review`, { rating, comment, courseId, name })
	).data;
};
