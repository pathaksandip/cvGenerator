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
    console.log("data", data);
    const { userEmail, userPassword, userPhone, userName } = JSON.parse(data);
    console.log(data);
    if (!userEmail || !userPassword || !userPhone)
      return { error: "Something went wrong" };

    const existingUser = await prisma.registerUser.findFirst({
      where: {
        userInEmail: userEmail.toLowerCase(),
      },
    });
    if (existingUser) {
      return { error: "User already exist" };
    }
    const hashed_password = await bcrypt.hash(userPassword, 12);
    const userAuth = await prisma.registerUser.create({
      data: {
        userInEmail: userEmail.toLowerCase(),
        userInPassword: hashed_password,
        userInPhone: userPhone,
        userName: userName,
      },
    });
    if (!userAuth) {
      return { error: "Failed to create user" };
    }
  } catch (error) {
    return { error: "Failed to create user" };
  }
};
