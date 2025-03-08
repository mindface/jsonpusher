import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
	// const response = NextResponse.next({
	// 	request: {
	// 		headers: request.headers,
	// 	},
	// });
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});
	const protectedRoutes = [
		"/",
		"/health",
		"/sports",
		"/questionAi",
		"/sportAndJob",
		"/memoryTask",
		"/memoryView",
	];
	const path = new URL(request.url).pathname;
	if (path === "/login" || path.startsWith("/_next")) {
		return NextResponse.next();
	}

	if (
		process.env.APP_ENV !== "test" &&
		protectedRoutes.includes(path) &&
		!token?.uid
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
		"/login",
	],
};
