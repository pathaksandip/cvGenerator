/** @format */

"use server";
import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcrypt";
import DOMPurify from "isomorphic-dompurify";
import { cache } from "react";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/app/Components/schema/loginSchema";

export const registerUser = async (data: string) => {
  if (!data) {
    return { error: "no data" };
  }
  try {
    const { userEmail, userPassword, userPhone, userName } = JSON.parse(data);
    console.log("s", data);
    if (!userEmail || !userPassword || !userPhone)
      return { error: "Something went wrong" };

    const existingUser = await prisma.user.findFirst({
      where: {
        email: userEmail.toLowerCase(),
      },
    });
    if (existingUser) {
      return { error: "User already exist" };
    }
    const hashed_password = await bcrypt.hash(userPassword, 12);
    const userAuth = await prisma.user.create({
      data: {
        email: userEmail.toLowerCase(),
        userInPassword: hashed_password,
        userInPhone: userPhone,
        name: userName,
      },
    });
    console.log("userAut", userAuth);
    if (!userAuth) {
      return { error: "Failed to create user" };
    }
  } catch (error) {
    return { error: "Failed to add user" };
  }
};
