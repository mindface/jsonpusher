import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./app/api/auth/config";
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
	const response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const path = new URL(request.url).pathname;
	const session = await auth();
	const user = session?.user?.name ?? false;

	// ログイン実装時の確認後調査
	if (
		(path === "/" ||
		 path === "/health" ||
		 path === "/sports" ||
		 path === "/sportAndJob")
		 && !user) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return response;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
		"/login",
	],
};
