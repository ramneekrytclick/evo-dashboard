import Cookies from "js-cookie";
import { useAuth } from "@/app/AuthProvider";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const token = Cookies.get("token");
export const apiClient = axios.create({
	baseURL: URL,
	headers: { "x-api-key": apiKey, Authorization: `Bearer ${token}` },
});
