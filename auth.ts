import NextAuth, { User as NextAuthUser } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import authConfig from "./lib/auth.config";
import { getAccountByUserId, getUserById } from "./actions/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") {
        return true;
      }
      const existingUser = await getUserById(user.id!);
      if (!existingUser?.emailVerified) return false;
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.firstName = token.firstName ?? "";
        session.user.lastName = token.lastName ?? "";
        session.user.email = token.email ?? "";
        session.user.isOAuth = token.isOAuth;
        session.user.avatar = token.avatar ?? null;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      const existingAccount = await getAccountByUserId(existingUser.id);
      token.isOAuth = !!existingAccount;
      token.firstName = existingUser.firstName as string;
      token.lastName = existingUser.lastName as string;
      token.email = existingUser.email as string;
      token.avatar = existingUser.avatar as string | null;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})