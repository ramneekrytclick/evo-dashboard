import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
	id: string;
	role: string;
	exp: number;
}

export function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	const pathname = request.nextUrl.pathname;
	if (token) {
		try {
			const { exp, role }: DecodedToken = jwtDecode(token);
			console.log(`[Middleware] Path: ${pathname} | Role: ${role}`);

			if (exp * 1000 > Date.now()) {
				if (pathname === "/auth/login") {
					return role.toLowerCase() == "Course Creator".toLowerCase()
						? NextResponse.redirect(
								new URL(`/course-creator/dashboard`, request.url)
						  )
						: NextResponse.redirect(
								new URL(`/${role.toLowerCase()}/dashboard`, request.url)
						  );
				}
				if (
					(pathname.startsWith("/admin") && role !== "Admin") ||
					(pathname.startsWith("/mentor") && role !== "Mentor") ||
					(pathname.startsWith("/student") && role !== "Student") ||
					(pathname.startsWith("/course-creator") &&
						role !== "Course Creator") ||
					(pathname.startsWith("/manager") && role !== "Manager") ||
					(pathname.startsWith("/employer") && role !== "Employer") ||
					(pathname.startsWith("/publisher") && role !== "Publisher")
				) {
					return NextResponse.redirect(new URL("/403", request.url));
				}
			} else {
				return NextResponse.redirect(new URL("/auth/login", request.url));
			}
		} catch (error) {
			console.error("Invalid token", error);
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}
	} else {
		if (
			pathname.startsWith("/admin") ||
			pathname.startsWith("/publisher") ||
			pathname.startsWith("/mentor") ||
			pathname.startsWith("/manager") ||
			pathname.startsWith("/student") ||
			pathname.startsWith("/course-creator") ||
			pathname.startsWith("/employer")
		) {
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/auth/login",
		"/admin/:path*",
		"/mentor/:path*",
		"/student/:path*",
		"/manager/:path*",
		"/course-creator/:path*",
		"/employer/:path*",
		"/publisher/:path*",
	],
};
