import { setCourses } from "@/Redux/Reducers/Courses/CoursesSlice";
import Store from "@/Redux/Store";
import { Course } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";
export const createCourseByCreator = async (formData: FormData) => {
	return (
		await apiClient.post(`/course-creators/auth/create`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		})
	).data;
};
export const updateCourse = async (courseId: string, data: any) => {
	const formData = new FormData();

	for (const key in data) {
		if (key === "photo" && data.photo) {
			formData.append("photo", data.photo);
		} else if (Array.isArray(data[key])) {
			data[key].forEach((item: string) => formData.append(`${key}[]`, item));
		} else {
			formData.append(key, data[key]);
		}
	}

	const response = await apiClient.put(
		`/course-creators/auth/course/update/${courseId}`,
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);
	return response.data;
};
export const deleteCourse = async (id: string) => {
	return (await apiClient.delete(`/course-creators/auth/${id}`)).data;
};
export const getAllCategories = async () => {
	return (await apiClient.get("/admin/allcat")).data;
};
export const getAllSubcategories = async () => {
	return (await apiClient.get("/admin/allsubcat")).data;
};
export const getAllWannaBeInterests = async () => {
	return (await apiClient.get("/admin/allwanna")).data;
};
export const getAllCourses = async () => {
	const state = Store.getState();
	const cachedCourses = state.courses;

	if (cachedCourses.loaded && cachedCourses.courses.length > 0) {
		return { courses: cachedCourses.courses };
	}

	const response = await apiClient.get("/courses");
	Store.dispatch(setCourses(response.data));
	return { courses: response.data };
};
