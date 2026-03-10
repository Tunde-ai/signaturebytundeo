import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        // Tunde (accountant)
        if (
          email === process.env.TUNDE_EMAIL &&
          password === process.env.TUNDE_PASSWORD
        ) {
          return {
            id: "1",
            email,
            name: "Tunde O",
            role: "accountant",
          };
        }

        // Demo client account
        if (email === "demo@finclear.com" && password === "demo123") {
          return {
            id: "2",
            email,
            name: "Demo Client",
            role: "client",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/finclear",
  },
  session: {
    strategy: "jwt",
  },
});
