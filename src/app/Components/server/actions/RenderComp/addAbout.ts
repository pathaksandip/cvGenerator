/** @format */

"use server";

import { getServerSession } from "next-auth";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import DOMPurify from "isomorphic-dompurify";
import { cache } from "react";

import { cookies } from "next/headers";
import { authOptions } from "@/lib/auth/auth.config";
import { addCategorySchema } from "@/app/Components/Interface/addCategory";
import prisma from "@/lib/prisma";
import { Session } from "inspector";
import { validateUser } from "../../Validation/validateUser";
import { error } from "console";

export const createAbout = async (categoryName: FormData) => {
  const user = await validateUser();
  if (user?.error) {
    return { error: user.error };
  }

  try {
    const aboutUsData = categoryName.get("aboutData");
    let aboutObtainedData: any;
    if (aboutUsData) {
      aboutObtainedData = JSON.parse(aboutUsData.toString());
    }
    if (aboutObtainedData) {
      const {
        firstName,
        lastName,
        designation,
        address,
        city,
        email,
        phone,
        summary,
        socialLinks,
      } = aboutObtainedData;
      console.log("links", aboutObtainedData);
      const existingAbout = await prisma.about.findFirst({
        where: { userId: user.userId },
      });

      if (existingAbout) {
        // Update the existing record
        const updatedAboutDetail = await prisma.about.update({
          where: { aboutId: existingAbout.aboutId },
          data: {
            firstName: firstName,
            lastName: lastName,
            designation: designation,
            address: address,
            city: city,
            email: email,
            phone: phone,
            summary: summary,
            socialLinks: socialLinks,
          },
        });
        console.log("updatedAboutDetail:", updatedAboutDetail);
        return { success: "About section updated successfully" };
      } else {
        // Create a new record
        const aboutDetail = await prisma.about.create({
          data: {
            firstName: firstName,
            lastName: lastName,
            designation: designation,
            address: address,
            city: city,
            email: email,
            phone: phone,
            summary: summary,
            socialLinks: socialLinks,
          },
        });
        if (aboutDetail) {
          console.log("ab", aboutDetail);
          return { success: "About section created successfully" };
        } else {
          return { error: "Failed to create about section" };
        }
      }
    }
  } catch (error) {
    console.error(error);
    return { error: "Invalid data" };
  }
};

export const deleteSocialLinks = async (id: string) => {
  const session = await getServerSession(authOptions);
  try {
    // Validate store
    const user = await validateUser();
    if (user?.error) {
      return { error: user.error };
    }

    const existingAbout = await prisma.about.findFirst({
      where: { userId: user.userId },
    });

    // Fetch branch category to check branchType
    const aboutDetail = await prisma.about.findUnique({
      where: { aboutId: existingAbout?.aboutId },
    });

    if (!aboutDetail) {
      return { error: "About Detail not found" };
    }

    const socialLinksArray = JSON.parse(aboutDetail.socialLinks || "[]");

    // Filter out the social link with the provided id
    const updatedSocialLinks = socialLinksArray.filter(
      (link: any) => link.id !== id
    );
    const updatedSocialLinksString = JSON.stringify(updatedSocialLinks);
    // Update the socialLinks field with the filtered array
    const updatedAbout = await prisma.about.update({
      where: { aboutId: existingAbout?.aboutId },
      data: { socialLinks: updatedSocialLinksString },
    });

    return { success: "Social link deleted successfully" };
  } catch (error) {
    return { error: "Error during operation" };
  }
};

// export const getAbout = cache(async () => {
//   const session = await getServerSession(authOptions);
//   console.log(session?.user?.name);
//   try {
//     const existingBranch = await prisma.inProStore.findMany({
//       where: {
//         masterStoreId: store.masterId,
//         visible: true,
//       },
//     });

//     if (!existingBranch || existingBranch.length === 0) {
//       return { error: "No branch categories available for the store" };
//     }

//     const aboutUsDatas = [];
//     for (const branch of existingBranch) {
//       if (branch.storeIdAddress) {
//         const address = await prisma.inProFullAddress.findUnique({
//           where: {
//             fullAddressId: branch.storeIdAddress,
//           },
//           select: {
//             institutionCountry: true, // Add other fields you want to select
//             institutionState: true,
//             institutionDistrict: true,
//             institutionMunicipality: true,
//             institutionWard: true,
//             institutionCity: true,
//           },
//         });

//         const data = {
//           storeId: branch.storeInId,
//           storeName: branch.storeIdName,
//           storePan: branch.storeIdPan,
//           storeAddress: JSON.stringify(address),
//           branchType: branch.branchType,
//           branchEmail: branch.storeIdEmail,
//           branchPhone: branch.storeIdPhone,
//           branchLogo: branch.storeIdLogo,
//         };
//         aboutUsDatas.push(data);
//       } else {
//         const data = {
//           storeId: branch.storeInId,
//           storeName: branch.storeIdName,
//           storePan: branch.storeIdPan,
//           storeAddress: JSON.stringify(""),
//           branchType: branch.branchType,
//           branchEmail: branch.storeIdEmail,
//           branchPhone: branch.storeIdPhone,
//           branchLogo: branch.storeIdLogo,
//         };
//         aboutUsDatas.push(data);
//       }
//     }
//     // console.log(aboutUsDatas);
//     revalidatePath("/");
//     return { success: aboutUsDatas };
//   } catch (error) {
//     return { error: "Invalid Store" };
//   }
// });

// export const updateAbout = cache(
//   action(addCategorySchema, async ({ categoryName }) => {
//     const session = await getServerSession(authOptions);
//     const transactionYear = "2080/81"; // Hardcoded for now, you may adjust it as needed

//     if (!transactionYear) {
//       return { error: "Invalid session" };
//     }

//     try {
//       const categoryObj = JSON.parse(categoryName);

//       const { id: categoryId, branchName, branchPan } = categoryObj;

//       if (!categoryId) {
//         return { error: "Missing required fields in branch category" };
//       }

//       // Sanitize branch category name if necessary
//       // const sanitizedBranchCategoryName = DOMPurify.sanitize(categoryObj.name);

//       await prisma.inProStore.update({
//         where: {
//           storeInId: categoryId,
//         },
//         data: {
//           storeIdName: branchName,
//           storeIdPan: branchPan,
//         },
//       });

//       revalidatePath("/");
//       return { success: "Branch category updated successfully" };
//     } catch (error) {
//       return { error: "Error updating branch category" };
//     }
//   })
// );
