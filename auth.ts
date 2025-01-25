import NextAuth, { User as NextAuthUser } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/lib/auth.config";

import { db } from "./lib/prisma.config";
import { getAccountByUserId, getUserByID } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
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
      const existingUser = await getUserByID(user.id!);
      // if (!existingUser?.emailVerified) return false;
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.isOAuth = token.isOAuth;
        session.user.image = token.image;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserByID(token.sub);
      if (!existingUser) return token;
      const existingAccount = await getAccountByUserId(existingUser.id);
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});