import { apiClient } from "@/utils/api";

export const addReview = async (
	courseId: string,
	rating: number,
	comment: string
) => {
	return (await apiClient.post(`/reviews`, { rating, comment, courseId })).data;
};
