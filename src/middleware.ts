import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// import { auth } from "./lib/firebaseClient";
// import { auth } from "./app/api/auth/config";
// import { withAuth } from 'next-auth/middleware';
// 認証基盤の自作するケースの確認で残している
// export function middleware(request: NextRequest) {
//   let cookie = request.cookies.get('nextjs')
//   console.log(cookie)
//   const allCookies = request.cookies.getAll()
//   console.log(allCookies)
//   console.log("/////////////")

//   request.cookies.has('nextjs') // => true
//   request.cookies.delete('nextjs')
//   request.cookies.has('nextjs') // => false

//   // Setting cookies on the response using the `ResponseCookies` API
//   const response = NextResponse.next()
//   response.cookies.set('vercel', 'fast')
//   response.cookies.set({
//     name: 'vercel',
//     value: 'fast',
//     path: '/',
//   })
//   cookie = response.cookies.get('vercel')
//   console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
//   // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.

//   return response
// }
// export default withAuth({
//   callbacks: {
//     authorized: ({ token }) => !!token,
//   },
//   pages: {
//     signIn: '/login',
//   },
// });

export async function middleware(request: NextRequest) {
	// const response = NextResponse.next({
	// 	request: {
	// 		headers: request.headers,
	// 	},
	// });
	const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
	const protectedRoutes = ["/", "/health", "/sports", "/questionAi", "/sportAndJob"];
	const path = new URL(request.url).pathname;
	console.log(token);
  if (path === "/login" || path.startsWith("/_next")) {
		console.log("NextResponse.next() one");
    return NextResponse.next();
  }
  // if (protectedRoutes.includes(path)) {
  //   return NextResponse.next();
  // }

	if (protectedRoutes.includes(path) && token && !token.uid) {
		console.log("NextResponse.redirect(new URL(/login, request.url)");
		return NextResponse.redirect(new URL("/login", request.url));
	}
	console.log("last one");
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
		"/login",
	],
};
