/** @format */

import type { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { z } from "zod";

import { User } from "next-auth";
import prisma from "../prisma";

export async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.registerUser.findUnique({
      where: {
        userInEmail: email.toLowerCase(),
      },
    });

    if (user) {
      const UserData: User = {
        email: user?.userInEmail,
        password: user?.userInPassword || "",
        name: user?.userName,
        id: user?.id.toString(),
      };
      console.log("user", user);
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
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     username: {
    //       label: "Username:",
    //       type: "text",
    //     },
    //     password: {
    //       label: "Password:",
    //       type: "password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     const parsedCredentials = z
    //       .object({ email: z.string().email(), password: z.string().min(6) })
    //       .safeParse(credentials);

    //     if (parsedCredentials.success) {
    //       const { email, password } = parsedCredentials.data;

    //       const user = await getUser(email);
    //       console.log(user);
    //       if (!user) {
    //         throw new Error("User not found. Please enter valid credentials");
    //       }

    //       const passwordsMatch = await bcrypt.compare(password, user.password);
    //       if (passwordsMatch) {
    //         return {
    //           ...user,

    //           email: user.email,
    //         };
    //       } else {
    //         throw new Error("Password is incorrect");
    //       }
    //     }

    //     return null;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
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
    async session({ session, token, user }) {
      if (token.email && session) {
        session.user.email = token.email;
        session.user.id = user.id;
      }
      console.log("gs", session);
      return session;
    },
    async signIn({ account, profile }) {
      if (account && account.provider === "google") {
        console.log(profile?.email);

        // return profile && profile.email_verified && profile.email.endsWith("@example.com")
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async redirect({ url, baseUrl }) {
      // if (url.startsWith(baseUrl + "/api/auth/callback/google")) {
      //   return baseUrl + "/dashboard";
      // } else {
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
      // }
    },
  },
};
