"use client";
import { createContext, useContext, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setUser, logout as reduxLogout } from "@/Redux/Reducers/AuthSlice";

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
		email: string,
		password: string,
		name: string,
		role: string,
		expertise?: string,
		wannaBe?: string
	) => Promise<any>;
	login: (email: string, password: string, role: string) => Promise<any>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	register: async () => {},
	login: async () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);

	const register = async (
		email: string,
		password: string,
		role: string,
		name: string,
		expertise?: string,
		wannaBe?: string
	) => {
		const URL = process.env.NEXT_PUBLIC_BASE_URL;
		const apiKey = process.env.NEXT_PUBLIC_API_KEY;

		const registerData: any = {
			name,
			email,
			password,
		};

		if (role.toLowerCase() === "mentors" && expertise) {
			registerData.expertise = expertise;
		}
		if (role.toLowerCase() === "students" && wannaBe) {
			registerData.wannaBeInterest = wannaBe;
		}

		const res = await axios.post(
			`${URL}${role.toLowerCase()}/register`,
			registerData,
			{
				headers: { "x-api-key": apiKey },
			}
		);
		return res.data.message;
	};

	const login = async (email: string, password: string, role: string) => {
		const loginData = { email, password };
		const URL = process.env.NEXT_PUBLIC_BASE_URL;
		const apiKey = process.env.NEXT_PUBLIC_API_KEY;

		const res = await axios.post(`${URL}${role}/login`, loginData, {
			headers: { "x-api-key": apiKey },
		});

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

	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			try {
				const decodedToken = jwtDecode<{
					id: string;
					role: string;
					name: string;
					email: string;
					exp: number;
				}>(token);
				if (decodedToken.exp * 1000 > Date.now()) {
					dispatch(
						setUser({
							id: decodedToken.id,
							role: decodedToken.role,
							name: decodedToken.name,
							email: decodedToken.email,
							token,
						})
					);
				} else {
					logout();
				}
			} catch (error) {
				console.error("Token parsing error", error);
				logout();
			}
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
