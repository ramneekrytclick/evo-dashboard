import { JobProps } from "@/Types/Job.type";
import { apiClient } from "@/utils/api";

export const createJob = async (data: {
	title: string;
	description: string;
	employerId: string;
}) => {
	try {
		const response = await apiClient.post("/employer/create-job", data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getStudents = async () => {
	try {
		const response = await apiClient.get("/employer/students");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getJobs = async () => {
	try {
		const response = await apiClient.get("/employer/jobs");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
