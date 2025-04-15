import axios from "axios";
import Cookies from "js-cookie";

const URL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const apiClient = axios.create({
	baseURL: URL,
	headers: { "x-api-key": apiKey },
});

// 🔁 Attach token dynamically before every request
apiClient.interceptors.request.use(
	(config) => {
		const token = Cookies.get("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);
