import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiClient = axios.create({
	baseURL: URL,
	headers: { "x-api-key": apiKey },
});
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
        console.log(token);
        
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
export const fetchUserData = async () => {
    try {
        const response = await apiClient.get("admin/users");
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};
