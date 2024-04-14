"use server";
import prisma from "@/lib/prisma";

export const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    return {
      success: {
        userName: user?.name,
        userEmail: user?.email,
        userPhone: user?.userInPhone,
        userImage: user?.image,
      },
    };
  } catch (error) {
    return { error: "Failed to fetch user" };
  }
};
