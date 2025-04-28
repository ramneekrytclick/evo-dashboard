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
export const getReviewsByCourseSlug = async (courseId: string) => {
	return (await apiClient.get(`/reviews/course/slug/${courseId}`)).data;
};
