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

export const getApplicants = async (jobId: string) => {
	const response = await apiClient.get(`/jobs/${jobId}/applicants`);
	return response.data;
};

export const getJobs = async () => {
	const response = await apiClient.get("/jobs");
	return response.data;
};
export const getStudentDetailsById = async (studentId: string) => {
	const response = await apiClient.get(`/jobs/student/${studentId}`);
	return response.data;
};
