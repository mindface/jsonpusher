import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Provider } from "next-auth/providers"

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: {
      params: {
        redirect_uri: `${process.env.NEXT_PUBLIC_BASIC_URL}/api/auth/callback/google`,
      },
    },
  }),
]

export const authOptions: NextAuthConfig = {
  providers: providers,
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
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
