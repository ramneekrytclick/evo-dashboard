import { BatchProps } from "@/Types/Course.type";
import { apiClient } from "@/utils/api";

export const getBatches = async () => {
	return (await apiClient.get("/admin/batches")).data;
};
export const getBatchesByCourse = async (id: string) => {
	return (await apiClient.get(`/admin/batches/by-course/${id}`)).data;
};

export const createBatch = async (data: BatchProps) => {
	const response = await apiClient.post("/batches", data);
	return response.data;
};

export const assignStudentsToBatch = async (data: {
	batchId: string;
	studentIds: string[];
}) => {
	return (await apiClient.put(`/batches/assign-students`, data)).data;
};

export const assignMentorToBatch = async (data: {
	batchId: string;
	mentorId: string;
}) => {
	return (await apiClient.put(`/batches/assign-mentor`, data)).data;
};
export const deleteBatch = async (id: string) => {
	return (await apiClient.delete(`/admin/batch/${id}`)).data;
};
