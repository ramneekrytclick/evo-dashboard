// Context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setUser, logout as reduxLogout } from "@/Redux/Reducers/AuthSlice";
import { toast } from "react-toastify";
import { getMyProfile } from "./api";

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	token: string;
}

interface AuthContextType {
	user: User | null;
	register: (
		data: FormData | { name: string; email: string; password: string },
		role: string
	) => Promise<any>;
	login: (email: string, password: string, role: string) => Promise<any>;
	logout: () => void;
	verifyStudentOtp: (email: string, otp: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	register: async () => {},
	login: async () => {},
	logout: () => {},
	verifyStudentOtp: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);

	const register = async (
		data: FormData | { name: string; email: string; password: string },
		role: string
	) => {
		const URL = process.env.NEXT_PUBLIC_BASE_URL;
		if (role === "admin") {
			const res = await axios.post(
				`${URL}${role.toLowerCase()}/register`,
				data
			);
			return res.data.message;
		} else {
			const res = await axios.post(`${URL}${role.toLowerCase()}/signup`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return res.data.message;
		}
	};

	const login = async (email: string, password: string, role: string) => {
		const loginData = { email, password };
		const URL = process.env.NEXT_PUBLIC_BASE_URL;
		const res = await axios.post(`${URL}${role}/login`, loginData);
		const data = res.data;

		const userData: User = {
			id: data._id,
			name: data.name,
			email: data.email,
			role: data.role,
			token: data.token,
		};

		dispatch(setUser(userData));
		Cookies.set("token", data.token, { expires: 1, path: "/" });

		return {
			status: res.status,
			token: data.token,
			role: data.role,
		};
	};

	const logout = () => {
		dispatch(reduxLogout());
		Cookies.remove("token");
		router.push("/auth/login");
	};

	const verifyStudentOtp = async (email: string, otp: string) => {
		const URL = process.env.NEXT_PUBLIC_BASE_URL;
		const res = await axios.post(`${URL}students/verify-otp`, { email, otp });
		return res.data;
	};
	const fetchProfile = async (role: string, token: string) => {
		try {
			const response = await getMyProfile(role);
			const data = response.user;
			dispatch(
				setUser({
					id: data._id,
					name: data.name,
					email: data.email,
					role: data.role,
					token,
				})
			);
		} catch (error) {
			toast.error("Failed to fetch profile");
		}
	};
	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			try {
				const decodedToken = jwtDecode<{
					id: string;
					role: string;
					iat: string;
					exp: number;
				}>(token);

				// Check if token is valid
				if (decodedToken.exp * 1000 > Date.now()) {
					dispatch(
						setUser({
							id: decodedToken.id,
							role: decodedToken.role,
							token,
							name: "",
							email: "",
						})
					);
					fetchProfile(decodedToken.role, token);
				} else {
					logout();
				}
			} catch (error) {
				console.error("Invalid token", error);
				logout();
			}
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, register, login, logout, verifyStudentOtp }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
