import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Provider } from "next-auth/providers"

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
]

export const authOptions: NextAuthConfig = {
  providers: providers,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // jwt: ({ token, user, account }) => {
    //   if (user) {
    //     const u = user as unknown as any;
    //     token.role = u.role;
    //     return {
    //       ...token,
    //       id: u.id,
    //     };
    //   }
    //   if(account) {
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
    // session: ({ session, token }) => {
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: token.id,
    //     },
    //   };
    // },
    jwt({ token, trigger, session }) {
      if (trigger === 'update') token.name = session.user.name
      return token
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
