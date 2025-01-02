import NextAuth, { type NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";

const { SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

if (!SECRET) throw new Error("You must provide SECRET env var.");
if (!GOOGLE_CLIENT_ID) throw new Error("You must provide GOOGLE_ID env var.");
if (!GOOGLE_CLIENT_SECRET)
	throw new Error("You must provide GOOGLE_SECRET env var.");

const providers: Provider[] = [
	GoogleProvider({
		clientId: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		authorization: {
			params: {
				redirect_uri: `${process.env.NEXT_PUBLIC_BASIC_URL}/api/auth/callback/google`,
			},
		},
	}),
];

export const authOptions: NextAuthConfig = {
	providers: providers,
	secret: SECRET,
	callbacks: {
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			// 確認次第実装
			// if (token.role && session.user) {
			//   session.user.role = token.role as any;
			// }
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			// const existingUser = await getUserById(token.sub);
			// if (!existingUser) return token;
			// token.role = existingUser.role;
			return token;
		},
	},
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
