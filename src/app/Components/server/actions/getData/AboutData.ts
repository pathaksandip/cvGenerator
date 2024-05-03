"use server";
import prisma from "@/lib/prisma";
import { validateUser } from "../../Validation/validateUser";
import { error } from "console";

export const getAbout = async () => {
  try {
    const user = await validateUser();
    if (user?.error) {
      return { error: user?.error };
    }
    const userDetail = await prisma.about.findFirst({
      where: {
        userId: user?.userId,
      },
    });
    const about = await prisma.about.findUnique({
      where: {
        aboutId: userDetail?.aboutId,
      },
    });

    if (!about) {
      return { error: "about not found" };
    }

    return {
      success: {
        userId: about?.userId,
        firstName: about?.firstName,
        lastName: about?.lastName,
        designation: about?.designation,
        address: about?.address,
        email: about?.email,
        city: about?.city,
        summary: about?.summary,
        phone: about?.phone,
        socialLinks: about?.socialLinks,
      },
    };
  } catch (error) {
    return { error: "Failed to fetch about for this user" };
  }
};
