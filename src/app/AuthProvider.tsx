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

interface User {
	id: string;
	token: string;
}

interface AuthContextType {
	user: User | null;
	role: string | null;
	userEmail: string;
	login: (email: string, password: string) => Promise<number | void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	role: null,
	userEmail: "",
	login: async () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [role, setRole] = useState<string | null>(null);
	const [userEmail, setEmail] = useState<string>("");
	const login = async (email: string, password: string) => {
		try {
			const loginData = { email, password };
			const URL = process.env.NEXT_PUBLIC_BASE_URL;
			const apiKey = process.env.NEXT_PUBLIC_API_KEY;
			const res = await axios.post(`${URL}admin/login`, loginData, {
				headers: { "x-api-key": apiKey },
			});
			const data = res.data;
			if (res.status === 200) {
				const decodedToken = jwtDecode<{ id: string; role: string }>(
					data.token
				);
				setUser({ id: decodedToken.id, token: data.token });
				setRole(decodedToken.role);
				setEmail(email);
				router.push(`/${decodedToken.role.toLowerCase()}/dashboard`);
				Cookies.set("token", data.token, { expires: 1, path: "/" }); // Expires in 1 day
			} else {
				throw new Error(data.message || "Login failed");
			}
			return res.status;
		} catch (error) {
			console.error(error);
		}
	};

	const logout = () => {
		setUser(null);
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
		<AuthContext.Provider value={{ user, userEmail, role, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
