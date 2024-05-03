/** @format */

"use server";

import { authOptions } from "@/lib/auth/auth.config";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const validateUser = async () => {
  const session = await getServerSession(authOptions);

  // const employeeStatus = await isValidEmployee();
  const userEmail = session?.user?.email;

  try {
    if (!userEmail) {
      return { error: "Session expired" };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: userEmail?.toLowerCase(),
      },
    });

    if (!existingUser) {
      return { error: "User does not exist" };
    }

    // Additional validation or processing can be added here

    return {
      userId: existingUser.userInId,
    };
  } catch (error) {
    return { error: "Failed to validate user" };
  }
};
