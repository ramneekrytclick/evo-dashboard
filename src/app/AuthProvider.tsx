"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import {jwtDecode} from "jwt-decode"
import { AuthContextType, DecodedToken } from "@/Types/AuthProvider.type";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType|null>(null);

export const AuthProvider = ({ children }:{children:ReactNode}) => {
    const router = useRouter();
    const [user, setUser] = useState<DecodedToken|null>(null);
    useEffect(()=>{
        localStorage.setItem("token", process.env.NEXT_PUBLIC_ADMIN_TOKEN);
        const token = localStorage.getItem('token');
        if(token){
            try {
                const decoded= jwtDecode(token);
                console.log("DecodedToken:",decoded);
                setUser(decoded);
            } catch (error) {
                console.error("Invalid token");
                localStorage.removeItem("token");
            }
        }
    },[])
    // useEffect(()=>{
    //   if (user){
    //     console.log("Redirecting...Logged In as:",user);
    //     router.push("/admin");
    //   }
    //   else {
    //     console.log("Redirecting...Logged Out");
    //     router.push("/login");
    //   }
    // },[user,router])
    const login = (token:string) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        setUser(decoded);
        return decoded;
      };
    
      const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
      };
    
      return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };
    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
    };