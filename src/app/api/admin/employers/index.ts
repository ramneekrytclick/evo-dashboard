import { EmployerProps } from "@/Types/Employer.type";
import { apiClient } from "@/utils/api";

export const getEmployers = async () => {
	try {
		const response = await apiClient.get("/admin/role/Employer");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const updateEmployer = async (id: string, data: EmployerProps) => {
	try {
		const response = await apiClient.put(`/admin/update-employer/${id}`, data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const createEmployer = async (data: EmployerProps) => {
	try {
		const response = await apiClient.post(`/admin/create-employer`, data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteEmployer = async (id: string) => {
	try {
		const response = await apiClient.delete(`/admin/delete-employer/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
