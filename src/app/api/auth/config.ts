// import { handlers } from "../config";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminAuth, certSet } from "@/lib/firebaseAdmin";
import { FirestoreAdapter } from "@auth/firebase-adapter";
const { NEXTAUTH_SECRET } = process.env;

interface Credentials {
	idToken?: string;
}

export const ConfigNextAuth = NextAuth({
	secret: NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			authorize: async (credentials: Credentials) => {
				const { idToken } = credentials;
				if (idToken !== null) {
					try {
						const decoded = await adminAuth.verifyIdToken(idToken ?? "");
						return { ...decoded };
					} catch (error) {
						console.log("Failed to verify ID token:", error);
					}
				}
				return null;
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		// async authorized({ auth, request: { nextUrl } }){
		//   const isLoggedIn = !!auth?.user;
		//   const isOnUser = nextUrl.pathname.includes("user");
		//   if (isOnUser) {
		//     if (isLoggedIn) return true;
		//     return false;
		//   } else if (isLoggedIn) {
		//     return Response.redirect(new URL('/', nextUrl));
		//   }
		//   return true;
		// },
		// jwt: async ({ token, user }) => {
		//   if (user) {
		//     console.log("////////////////");
		//     console.log(user);
		//     token.name = user.name;
		//   }
		//   return token;
		// },
		async jwt({ token, trigger, session, user }) {
			if (trigger === "update") token.name = session?.user?.name;
			return {
				...user,
				...token,
			};
		},
		async session({ session }) {
			const firebaseUser = await adminAuth.getUserByEmail(session.user.email);
			session.user.uid = firebaseUser.uid;
			return session;
		},
	},
	adapter: FirestoreAdapter({
		credential: certSet,
	}),
});

export const { handlers, auth, signIn, signOut } = ConfigNextAuth;
