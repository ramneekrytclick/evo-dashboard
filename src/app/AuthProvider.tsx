"use client";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { DecodedTokenProps } from "@/Types/Auth.type";

interface User {
	id: string;
	token: string;
}

interface AuthContextType {
	user: User | null;
	role: string | null;
	login: (email: string, password: string, role: string) => Promise<any>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	role: null,
	login: async () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [role, setRole] = useState<string | null>(null);
	const login = async (email: string, password: string, role: string) => {
		try {
			const loginData = { email, password };
			const URL = process.env.NEXT_PUBLIC_BASE_URL;
			const apiKey = process.env.NEXT_PUBLIC_API_KEY;

			const res = await axios.post(`${URL}${role}/login`, loginData, {
				headers: { "x-api-key": apiKey },
			});

			const data = res.data;
			const decodedToken = jwtDecode<DecodedTokenProps>(data.token);

			// Save token & user data
			setUser({ id: decodedToken.id, token: data.token });
			setRole(decodedToken.role);

			localStorage.setItem("token", data.token);
			Cookies.set("token", data.token, { expires: 1, path: "/" });

			// Optional: You can redirect here, or let frontend do it
			// router.push(`/${decodedToken.role.toLowerCase()}/dashboard`);

			return {
				status: res.status,
				token: data.token,
				role: decodedToken.role,
			};
		} catch (error: any) {
			const message =
				error?.response?.data?.message ||
				error?.message ||
				"Login failed. Please try again.";
			throw new Error(message);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("token");
		setRole(null);
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
					exp: number;
				}>(token);
				if (decodedToken.exp * 1000 > Date.now()) {
					setUser({ id: decodedToken.id, token });
					setRole(decodedToken.role);
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
		<AuthContext.Provider value={{ user, role, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
