import { JobProps } from "@/Types/Job.type";
import { apiClient } from "@/utils/api";
export interface CreateJobPayload {
	title: string;
	description: string;
	companyName: string;
	location: string;
	jobType: "Full-Time" | "Part-Time" | "Internship" | "Contract";
	experienceRequired?: string;
	salary?: string;
	applicationDeadline: Date;
	skillsRequired: string[];
	openings: number;
	employer: string; // ObjectId string
}

export const createJob = async (data: CreateJobPayload) => {
	const response = await apiClient.post("/jobs", data);
	return response.data;
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
