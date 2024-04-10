"use server";
import prisma from "@/lib/prisma";

export const getUser = async (email: string) => {
  try {
    const user = await prisma.registerUser.findUnique({
      where: {
        userInEmail: email,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    return {
      success: {
        userName: user.userName,
        userEmail: user.userInEmail,
        userPhone: user.userInPhone,
      },
    };
  } catch (error) {
    return { error: "Failed to fetch user" };
  }
};
