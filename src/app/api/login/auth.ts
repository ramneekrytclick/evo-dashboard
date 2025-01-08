import { LoginSubmitProp } from "@/Types/Auth.type";
import axios, { AxiosError } from "axios";

const URL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const apiClient = axios.create({
  baseURL: URL,
  headers: { "x-api-key": apiKey },
});

export const getLoginToken = async ({ email, password }: LoginSubmitProp) => {
    try {
        const response = await apiClient.post("admin/login", { email, password });
        console.log("API",response.data);
        
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data?.message || "Login failed");
        }
        throw new Error("An unknown error occurred");
    }
};