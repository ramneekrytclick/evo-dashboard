import { apiClient } from "@/utils/api";

export const getAllJobs = async () => {
	return (await apiClient.get(`/admin/jobs`)).data;
};

export const approveJob = async (id: string) => {
	return await apiClient.put(`/jobs/review`, { jobId: id, status: "Approved" });
};
