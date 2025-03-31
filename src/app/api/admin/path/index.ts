import { PathProps } from "@/Types/Path.type";
import { apiClient } from "@/utils/api";

export const getPaths = async () => {
	const respnonse = await apiClient.get(`/paths`);
	return respnonse.data;
};

export const createPath = async (data: PathProps & { photo?: File }) => {
	try {
		const formData = new FormData();

		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("timing", data.timing);
		formData.append("price", data.price.toString());

		// Append array values as comma-separated strings
		formData.append("courseIds", data.courses.join(","));
		formData.append("wannaBeInterestIds", data.wannaBeInterest.join(","));

		if (data.photo) {
			formData.append("photo", data.photo);
		}

		const response = await apiClient.post("/paths", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error creating path:", error);
		throw error;
	}
};

export const updatePath = async (id: string, data: PathProps) => {
	const response = await apiClient.put(`/path/update/${id}`, data);
	return response.data;
};

export const deletePath = async (id: string) => {
	const response = await apiClient.delete(`/path/delete/${id}`);
	return response.data;
};
