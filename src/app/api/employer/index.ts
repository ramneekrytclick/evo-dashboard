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
	const response = await apiClient.get("/jobs/my-jobs");
	return response.data.jobs;
};
export const getStudentDetailsById = async (studentId: string) => {
	const response = await apiClient.get(`/jobs/student/${studentId}`);
	return response.data;
};
export const updateApplicationStatus = async (data: {
	jobId: string;
	studentId: string;
	newStatus: "Accepted" | "Rejected" | "Pending";
}) => {
	return (await apiClient.put(`/jobs/update-status`, data)).data;
};

export const updateJob = async (
	id: string,
	data: {
		title: string;
		description: string;
		companyName: string;
		location: string;
		jobType: string;
		experienceRequired: string;
		salary: string;
		applicationDeadline: string;
		openings: string;
		skillsRequired: string;
	}
) => {
	return (await apiClient.put(`/jobs/job/update/${id}`, data)).data;
};
export const deleteJob = async (id: string) => {
	return (await apiClient.delete(`/jobs/job/delete/${id}`)).data;
};
