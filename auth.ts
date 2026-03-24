import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "SSA Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // For MVP: simple hardcoded accounts per SSA
        // In production, this would check against Sanity or a database
        const ssaAccounts: Record<
          string,
          { password: string; name: string; ssaSlug: string }
        > = {
          "admin@unitedsikhmovement.org": {
            password: "usm2025!",
            name: "USM Admin",
            ssaSlug: "all",
          },
          "rusikh@unitedsikhmovement.org": {
            password: "rusikh2025!",
            name: "RUSIKH Officer",
            ssaSlug: "rusikh",
          },
          "ucberkeley@unitedsikhmovement.org": {
            password: "berkeley2025!",
            name: "Cal Sikh Officer",
            ssaSlug: "uc-berkeley",
          },
        };

        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const account = ssaAccounts[email];
        if (account && account.password === password) {
          return {
            id: email,
            email: email,
            name: account.name,
            ssaSlug: account.ssaSlug,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.ssaSlug = (user as any).ssaSlug;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).ssaSlug = token.ssaSlug;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "usm-dev-secret-change-in-production",
});
