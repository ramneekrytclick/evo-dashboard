import { CourseFormProps, CourseProps } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";

export const createCourse = async (data: FormData) => {
	const response = await apiClient.post("/courses", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};
export const getCourses = async () => {
	const response = await apiClient.get("/courses");
	return response.data;
};

export const assignWannaBeInterestToCourse = async (
	id: string,
	wannaBeInterestIds: string[]
) => {
	const response = await apiClient.put(`/courses/assign-wanna-be-interest`, {
		courseId: id,
		wannaBeInterestIds,
	});
	return response.data;
};
export const updateCourse = async (
	courseId: string,
	data: {
		title: string;
		description: string;
		whatYouWillLearn: string;
		youtubeLink: string;
		timing: string;
		categoryId: string;
		subcategoryId: string;
		wannaBeInterestIds: string;
		realPrice: string;
		discountedPrice: string;
		tags: string;
		createdBy: string;
		photo: File;
	}
) => {
	const formPayload = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			formPayload.append(key, value.join(","));
		} else {
			formPayload.append(key, value || "");
		}
	});
	const response = await apiClient.put(
		`/courses/course/update/${courseId}`,
		formPayload
	);
	return response.data;
};
export const deleteCourse = async (id: string) => {
	const response = await apiClient.delete(`/admin/course/${id}`);
	return response.data;
};
export const getAllReviews = async () => {
	const response = await apiClient.get(`/admin/reviews`);
	return response.data;
};
export const updateReview = async (
	id: string,
	comment: any,
	rating: number
) => {
	const response = await apiClient.put(`/admin/admin/${id}`, {
		rating,
		comment,
	});
	return response.data;
};
export const deleteReview = async (id: string) => {
	const response = await apiClient.delete(`/admin/admin/${id}`);
	return response.data;
};
