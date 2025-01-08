import { JwtPayload } from "jwt-decode";
import { UserProps } from "./Team.type";

export interface DecodedToken {
    role?: string; // Add other fields as needed
    [key: string]: any; // Allow additional fields
}

export interface AuthContextType {
    user: DecodedToken|null;
    login: (token: string) => JwtPayload;
    logout: () => void;
}