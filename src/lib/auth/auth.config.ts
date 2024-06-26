/** @format */

import type { NextAuthOptions, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { z } from "zod";

import prisma from "../prisma";

export async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (user) {
      const UserData: User = {
        id: user?.id,
        email: user?.email || "",
        password: user?.userInPassword || "",
        name: user?.userName,
        image: user?.image,
        userId: user?.userInId,
      };
      return UserData;
    } else {
      return null;
    }
    // console.log('Usr' + user.password);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          console.log("userinauth", user);
          if (!user) {
            throw new Error("User not found. Please enter valid credentials");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return {
              ...user,

              email: user.email,
            };
          } else {
            throw new Error("Password is incorrect");
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.email && session) {
        session.user.email = token.email;
      }

      return session;
    },
    async signIn({ account, user }) {
      if (account && account.provider === "google") {
        if (user.email) {
          const exisitngUser = await prisma.login.findUnique({
            where: {
              email: user?.email,
            },
          });
          if (!exisitngUser) {
            await prisma.login.create({
              data: {
                email: user.email || "",
              },
            });
            return true;
          }
          return true;
        }
      }

      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    },
  },
};
